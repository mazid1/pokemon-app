import { Card, Typography, Divider } from "@mui/material";
import React from "react";
import { Flavor } from "../graphql-pokemon";

interface Props {
  flavorTexts: Flavor[];
}

const FlavorsCard = ({ flavorTexts }: Props) => {
  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h5">Flavors</Typography>

      <Divider style={{ marginBottom: "1rem" }} />

      {flavorTexts.map((ft) => (
        <Typography key={ft.game}>
          <strong>{ft.game}:</strong> {ft.flavor}
        </Typography>
      ))}
    </Card>
  );
};

export default FlavorsCard;
