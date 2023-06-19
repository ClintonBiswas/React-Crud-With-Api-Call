import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    getAllstudent();
  }, []);

  async function getAllstudent() {
    try {
      const students = await axios.get("http://localhost:3333/Student");
      //console.log(student.data)
      setStudents(students.data);
    } catch (err) {
      console.log("something wrong");
    }
  }
  const handleClicked = async (id) =>{
    await axios.delete(`http://localhost:3333/Student/${id}`)
    var newStudents = students.filter((item)=>{
      return item.id !==id
    })
    setStudents(newStudents)
  }
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "#7e57c2",
          color: "white",
          p: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4" fontSize={"1.5rem"}>
          Student List
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Program</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, i) => {
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="right">{student.name}</TableCell>
                  <TableCell align="right">{student.program}</TableCell>
                  <TableCell align="right">{student.email}</TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        "& svg": {
                          fontSize: 25,
                          cursor: "pointer",
                          mr: 2,
                          color: "#7e57c2",
                        },
                        "@media (max-width:600px)":{
                          "& svg":{
                            fontSize: 20,
                            mr:1
                          }
                        }
                      }}
                    >
                      <IconButton aria-label="delete">
                        <Link to={`/view/${student.id}`}>
                          <VisibilityIcon />
                        </Link>
                      </IconButton>
                      <IconButton aria-label="delete">
                        <Link to={`/edit/${student.id}`}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          handleClicked(student.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
