import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import List from "./List";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [student, setStudent] = useState({
    name: "",
    program: "",
    email: "",
  });
  const [status, setStatus] = useState()

  function OntextFieldChange(e) {
    //e.preventDefault()
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3333/Student`, student);
      setStatus(true)
    } catch (err) {
      console.log("something wrong");
    }
  }
  if(status){
    return <Home />
  }
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "#5e35b1",
          color: "white",
          p: 2,
          mb: 3,
        }}
      >
        <Typography variant="h2" fontSize={"1.9rem"}>
          React Crud With Api Call
        </Typography>
      </Box>
      <Grid container>
        <Grid item md={4} xs={12}>
          <Box
            sx={{
              textAlign: "center",
              bgcolor: "#7e57c2",
              color: "white",
              p: 2,
            }}
          >
            <Typography variant="h4" fontSize={"1.5rem"}>
              Add A Student
            </Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="stuname"
                  label="Name"
                  variant="outlined"
                  autoComplete="stuname"
                  name="name"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e) => OntextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="program"
                  label="Program"
                  variant="outlined"
                  autoComplete="program"
                  name="program"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e) => OntextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e) => OntextFieldChange(e)}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, mb: 3 }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                onClick={(e) => onSubmitForm(e)}
              >
                Add Student
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid
          item
          md={7}
          xs={12}
          sx={{
            ml: 5,
            "@media (max-width:600px)": { ml: 0 },
            "@media (max-width:900px)": { ml: 0 },
          }}
        >
          <List />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
