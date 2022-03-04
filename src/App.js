import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
function App() {
  const [todos, setTodos] = useState([]); // state (short-term memory -> deleted when refreshed)
  const [input, setInput] = useState('');

  // when the app loads, listen to the database and fetch todos as the get added/removed
  useEffect(() => {
    // this code fires when the app.js loads
    db
      .collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setTodos(snapshot.docs.map( doc => ({ id: doc.id, text: doc.data().text}))) // doc is the todo in the database
      }) // everytime it changes, snaps it and gives you the snapshot

  } , [] );  // if [], run once, if put [input], everytime input changes, it loads


  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // avoid refreshing when submit

    db.collection('todos').add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    // setTodos([...todos, input]); ... get the current value of this array todos and add the new input
    setInput(''); // after clicking, make its empty
  } 

  return (
    <div className="App">
      <h1>Hello world</h1>


      <form>
        <FormControl>
          <InputLabel>Write a todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>

        {/* Disabled makes the button unclickable when the input is '' or empty */}
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo 
        </Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
    
    </div>
  );
}

export default App;
