import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

const TopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokemon
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
