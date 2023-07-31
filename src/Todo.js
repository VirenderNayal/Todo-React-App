import React, { useState } from 'react';
import firebase from 'firebase/app';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Button, IconButton, Modal, makeStyles, TextField } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { db } from './firebase';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Todo = (props) => {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleClose = (e) => {
        e.preventDefault();

        db.collection('todos').doc(props.todo.id).set({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        setOpen(false);
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <LabelIcon color='secondary' />
                </Avatar>
            </ListItemAvatar>
            <IconButton arial-label='edit' color='primary' type="button" onClick={() => setOpen(true)}>
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <form>
                        <h2 id="simple-modal-title">Edit:</h2>
                        <TextField style={{ width: '100%' }} variant='outlined' onChange={event => setInput(event.target.value)} value={input} placeholder={props.todo.todo} id="simple-modal-description" />
                        <br />
                        <IconButton type='submit' onClick={handleClose} color='primary'>
                            <SaveIcon />
                        </IconButton>
                    </form>
                </div>
            </Modal>
            <ListItemText primary={props.todo.todo} secondary="Important" />
            <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                Delete
                </Button>
        </ListItem>
    )
}

export default Todo
