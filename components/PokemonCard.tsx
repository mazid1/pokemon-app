import { Pokemon } from "@favware/graphql-pokemon";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
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
      <CardActions sx={{ p: "1rem" }}>
        <NextLink href={`/${pokemon.num}`} passHref>
          <Link>Show Details</Link>
        </NextLink>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
