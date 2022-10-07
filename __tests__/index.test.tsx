import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import {
  getFuzzyPokemonQueryVars,
  GET_FUZZY_POKEMON,
} from "../gql/getFuzzyPokemon";

const pokemons: any = [
  {
    num: 184,
    key: "azumarill",
    species: "azumarill",
    types: ["Water", "Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/azumarill.gif",
    levellingRate: "Fast",
    bulbapediaPage:
      "https://bulbapedia.bulbagarden.net/wiki/azumarill_(Pokémon)",
    flavorTexts: [
      {
        game: "Shining Pearl",
        flavor:
          "Its long ears are superb sensors. It can distinguish the movements of living things on riverbeds.",
      },
    ],
    gender: {
      male: "50%",
      female: "50%",
    },
    baseStats: {
      hp: 100,
      attack: 50,
      defense: 80,
      specialattack: 60,
      specialdefense: 80,
      speed: 50,
    },
  },
];

const mocks = [
  {
    request: {
      query: GET_FUZZY_POKEMON,
      variables: getFuzzyPokemonQueryVars,
    },
    result: {
      data: {
        getFuzzyPokemon: pokemons,
      },
    },
  },
];

describe("Home", () => {
  it("renders without error", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home pokemons={pokemons} />
      </MockedProvider>
    );
    expect(await screen.findByText("Pokemon List")).toBeInTheDocument();
    expect(await screen.findByText("azumarill")).toBeInTheDocument();
  });

  it("renders 'Show More' button", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home pokemons={pokemons} />
      </MockedProvider>
    );
    expect(await screen.findByText("Show More")).toBeInTheDocument();
  });
});
