import React,{useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


import TodoForm from './TodoForm'
import { v4 as uuidv4 } from "uuid";
import Todo from './Todo';
import EditTodoForm from './EditTodoForm';


const TodoWrapper = () => {

const [todos, setTodos] = useState([])

const addTodo = (todo) =>{

    setTodos([...todos, {id: uuidv4() ,task: todo, completed: false, isEditing: false}])
    console.log(todos)
}


const toggleComplete = id => {
  setTodos(todos.map(todo => todo.id === id ? {...
  todo , completed: !todo.completed} : todo));
} 

const deleteTodo = id =>{

  setTodos(todos.filter(todo => todo.id !== id ))
}

const editTodo = id => {
 setTodos(todos.map(todo => todo.id === id ? {...
todo, isEditing: !todo.isEditing} : todo ))
}

const editTask = (task, id) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    )
  );
};

const [currentPage, setCurrentPage] = useState(1); // Current page
const [tasksPerPage, setTasksPerPage] = useState(5); // Tasks per page

const paginate = (todos, currentPage, tasksPerPage) => {
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  return todos.slice(startIndex, endIndex);
};


const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};

const paginatedTasks = paginate(todos, currentPage, tasksPerPage);

return (
    
    <div className='TodoWrapper'>
    <h1>Todo Things!</h1>
    <TodoForm  addTodo={addTodo}/>
    {paginatedTasks.map((todo ,index) => (
      todo.isEditing ? (<EditTodoForm editTodo={editTask} task={todo}/>) :
    (
      <Todo  task={todo}  key={index}
    toggleComplete={toggleComplete} 
    deleteTodo={deleteTodo}
    editTodo={editTodo}/>

    )
    )
    )
  }

  <div className="pagination">
      <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button className="pagination-button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(todos.length / tasksPerPage)}>
        Next
      </button>
    </div>
    </div>
    
  )
}

export default TodoWrapper