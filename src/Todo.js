import { List, ListItem, ListItemAvatar, ListItemText, Button, Modal, formGroupClasses } from '@mui/material';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useState } from 'react';
import db from './firebase';
import "./Todo.css";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'background.paper',
  bgcolor: '#fff',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};


function Todo(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    }

    const updateTodo = () => {
        // update todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            text: input
        }, { merge: true })

        setOpen(false);
    }

  return (
    <>
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={e => setOpen(true)}
            BackdropComponent={Backdrop}
        >
            <Box sx={style}>
            <div>
                <h1>Modal</h1>
                <input placeholder={props.todo.text} value={input} onChange={event => setInput(event.target.value)} />
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>
            </Box>
        </StyledModal>

        <List className='todo__list'>
            <ListItem>

                <ListItemAvatar>

                </ListItemAvatar>


                <ListItemText 
                    primary={props.todo.text}
                    secondary="Dummy deadline"
                />
            </ListItem>
            <button onClick={e => setOpen(true)}>Edit</button>
            <DeleteForeverIcon onClick={event => {db.collection('todos').doc(props.todo.id).delete()}} />
        </List>
    </>
  )
}

export default Todo