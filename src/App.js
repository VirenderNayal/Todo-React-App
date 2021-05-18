import { useEffect, useState } from 'react';
import { Button, FormControl, FormHelperText, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase';
import { db } from './firebase';
import './App.css';
import Todo from './Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState();

  // Connecting to databse and fetch todos
  useEffect(() => {
    // Fires when app loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, timestamp: doc.data().timestamp})));
    })
  }, [])

  const addTodo = (e) => {
    e.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');
  }

  return (
    <div className="App">
      <h1> React-Todo-App </h1>
      <br />
      <form>
        <FormControl style = {{ width : '100%' }}>
          <TextField
            id=""
            label="Write a Todo"
            value={input}
            onChange={event => setInput(event.target.value)}
            variant='outlined'
            style ={{ width : '50%', margin: 'auto' }}
          />
          <FormHelperText style ={{ width : '50%', margin: 'auto' }}>Anything you want to rembember</FormHelperText>
        </FormControl>
        <br/>
        <br/>
        <Button type='submit' onClick={ addTodo } variant="contained" color="primary" disabled={!input} endIcon ={<SendIcon />} >
          Add Todo
        </Button>
      </form>

      <ul>
        {
          todos.map(todo => (
            <Todo todo={todo} />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
