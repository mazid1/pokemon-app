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
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { Pokemon } from "../graphql-pokemon";
import { useApolloClient } from "@apollo/client";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const client = useApolloClient();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const watchlist = localStorage.getItem("WATCHLIST");
    if (watchlist && watchlist.includes(pokemon.key)) {
      setIsInWatchlist(true);
    }
  }, [pokemon.key]);

  const toggleWatchlist = () => {
    const watchlistItems = localStorage.getItem("WATCHLIST");
    if (pokemon.isInWatchlist) {
      const updatedWatchlistItems = watchlistItems
        ?.split(",")
        .filter((key) => key !== pokemon.key)
        .join(",")!;
      localStorage.setItem("WATCHLIST", updatedWatchlistItems);
      setIsInWatchlist(false);
    } else if (watchlistItems) {
      localStorage.setItem("WATCHLIST", `${watchlistItems},${pokemon.key}`);
      setIsInWatchlist(true);
    } else {
      localStorage.setItem("WATCHLIST", pokemon.key);
      setIsInWatchlist(true);
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
          title={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
          <IconButton
            aria-label="delete"
            color="error"
            onClick={toggleWatchlist}
          >
            {isInWatchlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
