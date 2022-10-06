import { Card, Typography, Divider } from "@mui/material";
import Link from "next/link";
import React from "react";

interface Props {
  bulbapediaPage: string;
}

const BulbapediaCard = ({ bulbapediaPage }: Props) => {
  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h5">Bulbapedia Page</Typography>

      <Divider style={{ marginBottom: "1rem" }} />

      <Link href={bulbapediaPage} target="_blank">
        {bulbapediaPage}
      </Link>
    </Card>
  );
};

export default BulbapediaCard;
