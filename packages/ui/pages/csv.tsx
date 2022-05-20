import * as React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Typography, Box } from "@mui/material";

const CSVPage: NextPage = () => {
  const router = useRouter();

  console.log(router.query);
  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 2,
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Legends of Runeterra Analytics
        </Typography>
      </Box>
    </Container>
  );
};

export default CSVPage;
