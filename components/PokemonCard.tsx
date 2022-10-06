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
import { useReactiveVar } from "@apollo/client";
import { watchlistVar } from "../libs/apolloClient";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const watchlist = useReactiveVar(watchlistVar);

  const toggleWatchlist = () => {
    const isInWatchlist = watchlist[pokemon.key];
    watchlistVar({ ...watchlistVar(), [pokemon.key]: !isInWatchlist });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={pokemon.sprite}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textTransform={"capitalize"}
        >
          {pokemon.key}
        </Typography>
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
        <NextLink
          href={`/species/${pokemon.species.toLocaleLowerCase()}`}
          passHref
        >
          <Link>Show Details</Link>
        </NextLink>

        <Tooltip
          title={
            watchlist[pokemon.key]
              ? "Remove from watchlist"
              : "Add to watchlist"
          }
        >
          <IconButton
            aria-label="delete"
            color="error"
            onClick={toggleWatchlist}
          >
            {watchlist[pokemon.key] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
