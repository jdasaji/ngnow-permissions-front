import logo from "./logo.svg";
import "./App.css";

import React from "react";
import { Container, Typography } from "@mui/material";
import PermissionsContainer from "./Containers/PermissionsContainer";

function App() {
  const permissionsId = 0;
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Aplicación de Permisos
      </Typography>
      <br></br>
      <PermissionsContainer permissionsId={permissionsId} />
    </Container>
  );
}

export default App;
