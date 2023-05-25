import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Paper, Typography } from "@mui/material";
import LoginTab from "../components/LoginTab";


function Homepage() {
  return (
    <>
      <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
        <Container>
          <Typography variant="h2" color="#323232">
              Messaging App
          </Typography>
          
          {/* <LoginForm /> */}
          <LoginTab />
        </Container>
      </Paper>
    </>
  );
}

export default Homepage