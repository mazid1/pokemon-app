import { Pokemon } from "@favware/graphql-pokemon";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

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
        <Typography variant="body2" color="text.secondary">
          {pokemon.flavorTexts?.at(0)?.flavor || "---"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Show Details</Button>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
