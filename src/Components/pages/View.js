import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
    const {id} = useParams()
    const[studentData, setStudentData] = useState('')
    useEffect(()=>{
        getStudentData()
    },)
    async function getStudentData(){
        try{
            const student = await axios.get(`http://localhost:3333/Student/${id}`)
            setStudentData(student.data)
        }
        catch(error){
            console.log("something wromg")
        }
    }
  return (
    <>
      <Card sx={{bgcolor: "violet" }}>
      <CardContent>
        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
          Name: {studentData.name}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Email:{studentData.email}
        </Typography>
        <Typography variant="body2">
          Program: {studentData.program}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={'/'}><Button size="small">Back Home</Button></Link>
      </CardActions>
      </Card>
    </>
  );
};

export default View;
