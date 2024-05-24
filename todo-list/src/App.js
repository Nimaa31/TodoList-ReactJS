import React, { useState } from 'react';
import Particles from '@tsparticles/react';
import ParticlesComponent  from './ParticlesComponent';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]); // État pour gérer les todos, chaque todo ayant un texte et un état de case à cocher

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { text: todo, checked: false }]); // Ajoute un nouveau todo avec la case à cocher non cochée par défaut
  };

  const deleteTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index)); // Supprime le todo à l'index spécifié
  };

  const toggleCheckbox = (index) => {
    setTodos((prev) =>
      prev.map((todo, i) => i === index ? { ...todo, checked: !todo.checked } : todo) // Bascule l'état de la case à cocher pour le todo à l'index spécifié
    );
  };

  return (
    <div className="app-container">
      <ParticlesComponent />
      <div className="app-wrapper">
        <h1>Todo list</h1>
        <Form addTodo={addTodo} /> {/* Formulaire pour ajouter un nouveau todo */}
        <div className="todo-list">
          {todos.map((todo, i) => (
            <Todo
              key={i}
              todo={todo}
              onDelete={() => deleteTodo(i)} // Passe la fonction de suppression au composant Todo
              onToggle={() => toggleCheckbox(i)} // Passe la fonction de bascule de la case à cocher au composant Todo
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const Form = ({ addTodo }) => {
  const onSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page à la soumission du formulaire
    const todoText = event.currentTarget.elements.todo.value; // Récupère le texte du nouveau todo
    addTodo(todoText); // Appelle la fonction addTodo passée en props
    event.currentTarget.reset(); // Réinitialise le formulaire
  };

  return (
    <form className="form-wrapper" onSubmit={onSubmit}>
      <input className="input" id="todo" type="text" placeholder="Ajouter une task" />
      <Button type="submit">Ajouter</Button>
    </form>
  );
};

const Button = ({ children, ...props }) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

const Todo = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="todo-wrapper">
      <Checkbox checked={todo.checked} onToggle={onToggle} /> {/* Checkbox reçoit son état et la fonction de bascule */}
      <span className="todo-text">{todo.text}</span>
      <button onClick={onDelete} className="todo-delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
      </button>
    </div>
  );
};

const Checkbox = ({ checked, onToggle }) => {
  return (
    <div className="checkbox">
      <input type="checkbox" checked={checked} onChange={onToggle} /> {/* L'état de la case à cocher et la fonction de bascule */}
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
        </svg>
      )}
    </div>
  );
};

export default App;
