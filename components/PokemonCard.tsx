import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link,
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
  const apolloClient = useApolloClient();

  const toggleWatchlist = () => {};

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
        <NextLink href={`/${pokemon.num}`} passHref>
          <Link>Show Details</Link>
        </NextLink>

        <IconButton aria-label="delete" color="error" onClick={toggleWatchlist}>
          {pokemon.isInWatchlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
