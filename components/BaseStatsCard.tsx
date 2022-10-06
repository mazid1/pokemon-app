import {
  Card,
  Typography,
  Divider,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { Stats } from "../graphql-pokemon";

interface Props {
  baseStats: Stats;
}

const BaseStatsCard = ({
  baseStats: { hp, attack, defense, specialattack, specialdefense, speed },
}: Props) => {
  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h5">Base Stats</Typography>

      <Divider style={{ marginBottom: "1rem" }} />

      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="base stats table">
          <TableHead>
            <TableRow>
              <TableCell>HP</TableCell>
              <TableCell>Attack</TableCell>
              <TableCell>Defense</TableCell>
              <TableCell>Special Attack</TableCell>
              <TableCell>Special Defense</TableCell>
              <TableCell>Speed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {hp}
              </TableCell>
              <TableCell>{attack}</TableCell>
              <TableCell>{defense}</TableCell>
              <TableCell>{specialattack}</TableCell>
              <TableCell>{specialdefense}</TableCell>
              <TableCell>{speed}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default BaseStatsCard;
