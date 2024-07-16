import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { addTodo, updateList } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { selectId } from "../features/todo/todoSlice";
import { v4 as uuid } from "uuid";

function Addtodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    const userData = {
      title: title,
      description: description,
    };
    axios
    .post("http://localhost:8080/api/todos/create", userData)
    .then((response) => {
        dispatch(updateList(true));
        dispatch(addTodo({id: response.data.id, text: response.data.title, description: response.data.description}));
        console.log(response.status, response.data.token);
      });
    setTitle('');
    setDescription('');
  };
  

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add a New Todo
        </Typography>
        <Box
          component="form"
          onSubmit={addTodoHandler}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter Todo Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginRight: "10px" }}
          />
          <TextField
            id="outlined-basic"
            label="Enter Todo Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginRight: "10px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px" }}
            // onClick={getToDoHandler}
          >
            Add Todo
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Addtodo;
