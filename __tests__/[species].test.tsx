import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonDetails from "../pages/species/[species]";

const pokemon: any = {
  num: 184,
  key: "azumarill",
  species: "azumarill",
  types: ["Water", "Fairy"],
  sprite: "https://play.pokemonshowdown.com/sprites/ani/azumarill.gif",
  levellingRate: "Fast",
  bulbapediaPage: "https://bulbapedia.bulbagarden.net/wiki/azumarill_(Pokémon)",
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
};

describe("PokemonDetails", () => {
  it("renders pokemon species", async () => {
    render(<PokemonDetails pokemon={pokemon} />);
    expect((await screen.findAllByText("azumarill")).length).toBeGreaterThan(0);
  });
});
