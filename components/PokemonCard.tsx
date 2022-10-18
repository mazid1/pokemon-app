import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import NextLink from "next/link";
import { Pokemon } from "../graphql-pokemon";
import { useApolloClient } from "@apollo/client";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const client = useApolloClient();

  const toggleWatchlist = () => {
    const watchlistItems = localStorage.getItem("WATCHLIST");
    if (watchlistItems) {
      if (watchlistItems.includes(pokemon.key)) {
        const updatedWatchlistItems = watchlistItems
          .split(",")
          .filter((s) => s !== pokemon.key)
          .join(",");
        localStorage.setItem("WATCHLIST", updatedWatchlistItems);
      } else {
        localStorage.setItem("WATCHLIST", `${watchlistItems},${pokemon.key}`);
      }
    } else {
      localStorage.setItem("WATCHLIST", pokemon.key);
    }
    client.cache.evict({
      id: `Pokemon:{"key":"${pokemon.key}"}`,
      fieldName: "isInWatchlist",
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={pokemon.sprite}
      />

      <CardContent>
        <NextLink href={`/species/${pokemon.key}`} passHref>
          <Typography
            gutterBottom
            variant="h5"
            component="a"
            textTransform={"capitalize"}
          >
            {pokemon.species}
          </Typography>
        </NextLink>

        <Typography
          variant="body2"
          color="text.secondary"
          height={100}
          textOverflow={"ellipsis"}
        >
          {pokemon.flavorTexts?.at(0)?.flavor || "---"}
        </Typography>
      </CardContent>

      <CardActions
        sx={{ p: "1rem", display: "flex", justifyContent: "space-between" }}
      >
        <NextLink href={`/species/${pokemon.key}`} passHref>
          <Link>Show Details</Link>
        </NextLink>

        <Tooltip
          title={
            pokemon.isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
          }
        >
          <IconButton
            aria-label="delete"
            color="error"
            onClick={toggleWatchlist}
          >
            {pokemon.isInWatchlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
