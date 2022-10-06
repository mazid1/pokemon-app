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
import { Gender } from "../graphql-pokemon";

interface Props {
  gender: Gender;
}

const GenderCard = ({ gender: { male, female } }: Props) => {
  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h5">Gender</Typography>

      <Divider style={{ marginBottom: "1rem" }} />

      <TableContainer
        component={Paper}
        sx={{ maxWidth: 400 }}
        variant="outlined"
      >
        <Table aria-label="gender table">
          <TableHead>
            <TableRow>
              <TableCell>Male</TableCell>
              <TableCell>Female</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {male}
              </TableCell>
              <TableCell>{female}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default GenderCard;
