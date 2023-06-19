import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Edit = () => {
  const { id } = useParams();
  const[status, setStatus] = useState()
  const [student, setStudent] = useState({
    name: "",
    program: "",
    email: "",
  });
  useEffect(() => {
    async function getStudentdata() {
      try {
        const student = await axios.get(`http://localhost:3333/Student/${id}`);
        setStudent(student.data);
      } catch (error) {
        console.log("something wromg");
      }
    }
    getStudentdata();
  }, [id]);

  //onchange handle 

  function OntextFieldChange(e) {
    //e.preventDefault()
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  //button submit
  async function onSubmitForm(e) {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:3333/Student/${id}`, student);
        setStatus(true)
    } catch (err) {
      console.log("something wrong");
    }
  }
  let  messages;
  if(status){
    messages = <h3>Update Successfully</h3>
  }
  return (
    <>
    
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "#7e57c2",
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h4" fontSize={"1.5rem"}>
          Edit Student Information
        </Typography>
      </Box>
      {/* if update student information */}
      {messages ? <Alert severity="success">{messages}</Alert>: <p></p>}
      <Grid container justifyContent={"center"}>
        <Grid item md={4} xs={12}>
          <form noValidate>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="stuname"
                  label="Name"
                  variant="outlined"
                  autoComplete="stuname"
                  name="name"
                  value={student.name}
                  required
                  fullWidth
                  autoFocus
                  onChange={(e)=>{OntextFieldChange(e)}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="program"
                  label="Program"
                  variant="outlined"
                  autoComplete="program"
                  name="program"
                  value={student.program}
                  required
                  fullWidth
                  autoFocus
                  onChange={(e)=>{OntextFieldChange(e)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  autoComplete="email"
                  name="email"
                  value={student.email}
                  required
                  fullWidth
                  autoFocus
                  onChange={(e)=>{OntextFieldChange(e)}}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, mb: 3 }}>
              <Button variant="contained" type="submit" fullWidth onClick={(e)=>{onSubmitForm(e)}}>
                Update
              </Button>
            </Box>
            <Box sx={{ mt: 3, mb: 3 }}>
              <Link to={"/"}>
                <Button variant="contained" type="submit" fullWidth>
                  Back Home
                </Button>
              </Link>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Edit;
