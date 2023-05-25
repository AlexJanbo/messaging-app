import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Paper, Typography, useTheme } from "@mui/material";
import LoginTab from "../components/LoginTab";



function Homepage() {

  const theme = useTheme()

  return (
    <>
      <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
        <Container>
          <Typography variant="h2" color="#323232" fontFamily="cavolini">
              Messaging App
          </Typography>
          <LoginTab />
        </Container>
      </Paper>
    </>
  );
}

export default Homepage