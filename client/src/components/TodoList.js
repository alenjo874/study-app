import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faEllipsisVertical,
  faListCheck,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

function TodoList({ currentUserSession }) {
  const [todoArray, setTodoArray] = useState([]);
  const [showTodos, setShowTodos] = useState(true);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [task, setTask] = useState("");
  const [showTodoEditForm, setShowTodoEditForm] = useState(false);
  const [editTask, setEditTask] = useState("");
  const [editTodoObj, setEditTodoObj] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9292/user_todo_list/${currentUserSession.user_id}`)
      .then((res) => res.json())
      .then(setTodoArray);
  }, []);

  function handleCompleteTask(id) {
    const isCompleteArray = todoArray.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });

    const completeTodo = todoArray.find((todo) => todo.id === id);

    fetch(`http://localhost:9292/todo_lists/${completeTodo.id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: !completeTodo.completed }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setTodoArray(isCompleteArray);
  }

  const displayTodoArray = todoArray.map((todo) => {
    return (
      <span
        className={
          todo.completed
            ? "notesArrayElement todoContainer completedTodoContainer"
            : "notesArrayElement todoContainer"
        }
        key={uuidv4()}
      >
        {/* <div className="redline"></div> */}
        <button
          className={
            todo.completed
              ? "completeBtn btnOverlay editBtn redOverlay"
              : "btnOverlay editBtn "
          }
          onClick={() => handleCompleteTask(todo.id)}
        >
          {todo.completed ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )}
        </button>

        <div className="addContainer">
          <li>{todo.task}</li>
          <div>
            <button
              className="btnOverlay editBtn"
              onClick={() => handleTodoEdit(todo.id)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button
              className="btnOverlay redOverlay deleteBtn"
              onClick={() => handleTodoDelete(todo.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </span>
    );
  });

  function handleTodoDelete(id) {
    const newTodoArray = todoArray.filter((todo) => todo.id !== id);
    setTodoArray(newTodoArray);
    setShowTodos(true);

    fetch(`http://localhost:9292/todo_lists/${id}`, {
      method: "DELETE",
    });
  }
  const addNewTodoForm = (
    <div className="newNoteFormContainer">
      <motion.form
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.26, ease: "easeIn" }}
        className="newNoteForm"
      >
        <motion.textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New Task Todo"
          className="newNoteFormElement"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35, ease: "easeIn" }}
          rows="5"
          cols="30"
        ></motion.textarea>
        <button className="btnOverlay" onClick={handleNewTodo}>
          Add Task
        </button>
        <button className="btnOverlay redOverlay" onClick={handleCancelNewTodo}>
          Cancel
        </button>
      </motion.form>
    </div>
  );

  function handleNewTodo(e) {
    e.preventDefault();

    const newTask = {
      task: task,
      completed: false,
      user_id: currentUserSession.user_id,
    };

    fetch("http://localhost:9292/todo_lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoArray((prev) => [...prev, data]);
      });
    setShowTodoForm(false);
    setShowTodos(true);
    setTask("");
  }

  function handleTodoEdit(id) {
    const editTodoTask = todoArray.find((todo) => todo.id === id);
    setEditTodoObj(editTodoTask);
    setEditTask(editTodoTask.task);
    setShowTodoForm(false);
    setShowTodoEditForm(true);
    setShowTodos(false);
  }

  function handleEditTask(e) {
    e.preventDefault();

    const newTaskEditObj = { task: editTask };
    fetch(`http://localhost:9292/todo_lists/${editTodoObj.id}`, {
      method: "PATCH",
      body: JSON.stringify(newTaskEditObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const newUpdatedTodoArray = todoArray.map((todo) => {
      if (todo.id === editTodoObj.id) {
        return {
          id: editTodoObj.id,
          task: editTask,
          completed: editTodoObj.completed,
          user_id: editTodoObj.user_id,
        };
      } else {
        return todo;
      }
    });
    setTodoArray(newUpdatedTodoArray);
    setShowTodoEditForm(false);
    setShowTodos(true);
    setTask("");
  }

  function handleCancelEditTodo(e) {
    e.preventDefault();
    setShowTodos(true);
    setShowTodoEditForm(false);
    setTask("");
  }

  const editTodoForm = (
    <div className="newNoteFormContainer">
      <form className="newNoteForm">
        <textarea
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
          placeholder="Edit Current Task"
          className="newNoteFormElement"
          rows="10"
          cols="50"
        ></textarea>
        <button className="btnOverlay" onClick={handleEditTask}>
          Add Changes
        </button>
        <button
          className="btnOverlay redOverlay"
          onClick={handleCancelEditTodo}
        >
          Cancel
        </button>
      </form>
    </div>
  );

  function handleCancelNewTodo(e) {
    e.preventDefault();
    setShowTodos(true);
    setShowTodoForm(false);
  }

  const addNewTodoButton = (
    <button className="btnOverlay addNewNoteButton" onClick={handleShowNewTodo}>
      + Add Task
    </button>
  );

  function handleShowNewTodo() {
    setShowTodos(false);
    setShowTodoForm(true);
  }

  const displayCurrentTodo = (
    <>
      <span className="currentNotesHeader">
        <h4>
          Todo <FontAwesomeIcon icon={faListCheck} />
        </h4>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </span>
      <ul className="currentNotesDisplay">{displayTodoArray}</ul>
      <ul className="currentNotesDisplay"></ul>
      <div className="currentBtnsContainer">
        <AnimatePresence>
          {showTodos ? (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.26, ease: "easeIn" }}
              exit={{
                y: -30,
                opacity: 0,
                transition: { duration: 0.26, ease: "easeOut" },
              }}
            >
              {" "}
              {addNewTodoButton}{" "}
            </motion.div>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {showTodoForm ? addNewTodoForm : null}
        </AnimatePresence>
      </div>
      <div>{showTodoEditForm ? editTodoForm : null}</div>
    </>
  );

  return <div className="currentNotesContainer">{displayCurrentTodo}</div>;
}

export default TodoList;
