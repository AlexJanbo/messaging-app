import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Paper } from "@mui/material";


function Homepage() {
  return (
    <>
      <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
        <Container>
          <LoginForm />
        </Container>
      </Paper>
    </>
  )
}

export default Homepage