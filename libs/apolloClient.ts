import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  makeVar,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const watchlistVar = makeVar<{ [key: string]: boolean }>({});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    uri: "https://graphqlpokemon.favware.tech/",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getFuzzyPokemon: {
              // Don't cache separate results based on any of this field's arguments.
              keyArgs: false,
              // Concatenate the incoming list items with the existing list items.
              merge(
                existing: any[],
                incoming: any[],
                { readField, mergeObjects }
              ) {
                // Slicing is necessary because the existing data is immutable, and frozen in development.
                const merged: any[] = existing ? existing.slice(0) : [];
                const pokemonKeyToIndex: Record<string, number> =
                  Object.create(null);
                if (existing) {
                  existing.forEach((pokemon, index) => {
                    pokemonKeyToIndex[readField<string>("key", pokemon)!] =
                      index;
                  });
                }
                incoming.forEach((pokemon) => {
                  const key = readField<string>("key", pokemon);
                  const index = pokemonKeyToIndex[key!];
                  if (typeof index === "number") {
                    // Merge the new pokemon data with the existing pokemon data.
                    merged[index] = mergeObjects(merged[index], pokemon);
                  } else {
                    // First time we've seen this pokemon in this array.
                    pokemonKeyToIndex[key!] = merged.length;
                    merged.push(pokemon);
                  }
                });
                return merged;
              },
            },
            watchlist: {
              read() {
                return watchlistVar();
              },
            },
          },
        },
        Pokemon: {
          keyFields: ["key"],
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
