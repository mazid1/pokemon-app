import { gql } from "@apollo/client";

export const GET_WATCHLIST = gql`
  query GetWatchlist {
    watchlist @client
  }
`;
