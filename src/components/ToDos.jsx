import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeTodo, editTodo } from "../features/todo/todoSlice";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";

function ToDos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editTodoObject, setEditTodoObject] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemoveToDo = (id) => {
    dispatch(removeTodo(id));

    axios.delete(`http://localhost:8000/deleteToDO/${id}`).then((response) => {
      console.log(response.status, response.data.message);
    }).catch((error) => {
      console.error("There was an error deleting the todo!", error);
    });
  }
  const handleEditToDo = (id, text) => {
    dispatch(editTodo({id,text}));

    axios.post(`http://localhost:8000/editToDO`, {
      id: id,
      todoDB: text
    }).then((response) => {
      console.log(response.status, response.data.message);
    }).catch((error) => {
      console.error("There was an error deleting the todo!", error);
    });
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Todos
        </Typography>
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <>
                    <IconButton
                      style={{ marginRight: "5px" }}
                      edge="end"
                      aria-label="edit"
                      onClick={() => {
                        handleOpen();
                        setEditTodoObject({
                          id: todo.id,
                          text: todo.text,
                        });
                        console.log(todo.text);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveToDo(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={todo.text} secondary={todo.description} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ paddingLeft: "22px" }}
              >
                Edit Your Todo
              </Typography>
              <IconButton edge="end" color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Enter Todo.."
                variant="outlined"
                value={editTodoObject.text}
                onChange={(e) =>
                  setEditTodoObject({
                    id: editTodoObject.id,
                    text: e.target.value,
                  })
                }
                sx={{ marginRight: "40px", marginBottom: "30px" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ padding: "10px 20px", width: "320px" }}
                onClick={() => {
                  handleEditToDo(editTodoObject.id, editTodoObject.text)
                  handleClose();
                }}
              >
                Edit Todo
              </Button>
            </div>
          </Box>
        </Modal>
      </Container>
    </>
  );
}

export default ToDos;
