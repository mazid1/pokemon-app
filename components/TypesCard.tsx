import { Card, Typography, Divider, Stack, Chip } from "@mui/material";
import React from "react";

interface Props {
  types: string[];
}

const TypesCard = ({ types }: Props) => {
  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h5">Types</Typography>

      <Divider style={{ marginBottom: "1rem" }} />

      <Stack direction="row" spacing={2}>
        {types.map((t) => (
          <Chip key={t} label={t} />
        ))}
      </Stack>
    </Card>
  );
};

export default TypesCard;
