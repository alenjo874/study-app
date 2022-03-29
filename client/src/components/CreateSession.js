import React, { useState } from "react";
import Timer from "./Timer";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faEllipsisVertical,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import TodoList from "./TodoList";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

function CreateSession() {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [date, setDate] = useState("");
  const [startSession, setStartSession] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [currentUserSession, setCurrentUserSession] = useState("");
  const [subject, setSubject] = useState("");
  const [studyNote, setStudyNote] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [sessionStart, setSessionStart] = useState(false);
  const [showUserNotes, setUserNotes] = useState(false);
  const [notesArray, setNotesArray] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [editNoteObj, setEditNoteObj] = useState([]);
  const [editSubject, setEditSubject] = useState("");
  const [editStudyNote, setEditStudyNote] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  // create new study session and associated user session  ===============

  function handleCreateSession(e) {
    e.preventDefault();
    const newSession = {
      title: title,
      session_overview: overview,
      session_date: date,
    };
    fetch("/study_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSession),
    })
      .then((response) => response.json())
      .then((newSessionData) => {
        fetch("/user_sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            study_session_id: newSessionData.id,
          }),
        })
          .then((res) => res.json())
          .then(setCurrentUserSession);
      });
    setTitle("");
    setOverview("");
    setDate("");
    setStartSession(false);
    setShowTimer(true);
    setShowNotes(true);
    setSessionStart(true);
    setUserNotes(true);
  }
  // ================================================================
  // create new study session and associated user session  ===============

  function handleNewNote(e) {
    e.preventDefault();

    fetch(`/user_sessions_notes/${currentUserSession.id}`)
      .then((r) => r.json())
      .then(setNotesArray);

    const newNote = {
      subject: subject,
      study_note: studyNote,
      user_id: currentUserSession.user_id,
      study_session_id: currentUserSession.study_session_id,
    };

    fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotesArray((prev) => [...prev, data]);
      });
    setShowNoteForm(false);
    setShowNotes(true);
    setStudyNote("");
    setSubject("");
  }

  // ================================================================

  const fadeDown = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const newSessionForm = (
    <motion.form
      className="newSessionForm"
      onSubmit={handleCreateSession}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeIn" }}
    >
      {/* <label>Title</label> */}
      <motion.input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="newSessionFormElement"
        placeholder="Study Session Title"
        required
        {...fadeDown}
        transition={{ delay: 0.05, duration: 0.26, ease: "easeIn" }}
      ></motion.input>
      {/* <label>Session Overview</label> */}
      <motion.input
        className="newSessionFormElement"
        value={overview}
        onChange={(e) => setOverview(e.target.value)}
        placeholder="Study Session Overview"
        required
        {...fadeDown}
        transition={{ delay: 0.15, duration: 0.26, ease: "easeIn" }}
      ></motion.input>
      {/* <label>Date</label> */}
      <motion.input
        className="newSessionFormElement"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="MM/DD/YYYY"
        required
        {...fadeDown}
        transition={{ delay: 0.25, duration: 0.26, ease: "easeIn" }}
      ></motion.input>
      <motion.div
        className="newSessionBtnsContainer"
        {...fadeDown}
        transition={{ delay: 0.35, duration: 0.26, ease: "easeIn" }}
      >
        <button className="btnOverlay newSessionFormBtns">
          Create Session
        </button>
        <button
          className="btnOverlay redOverlay newSessionFormBtns"
          onClick={handleCancelForm}
        >
          Cancel
        </button>
      </motion.div>
    </motion.form>
  );

  function handleCancelForm(e) {
    e.preventDefault();
    setStartSession(false);
    setTitle("");
    setOverview("");
    setDate("");
  }

  const startSessionBtn = (
    <motion.button
      {...fadeDown}
      transition={{ delay: 0.15, duration: 0.25, ease: "easeIn" }}
      exit={{
        y: -30,
        opacity: 0,
        transition: { duration: 0.15, ease: "easeOut" },
      }}
      className="sessionButton"
      onClick={() => setStartSession(true)}
    >
      Start Session
    </motion.button>
  );

  const finishSessionBtn = (
    <motion.button
      {...fadeDown}
      transition={{ delay: 0.15, duration: 0.25, ease: "easeIn" }}
      exit={{
        y: -30,
        opacity: 0,
        transition: { duration: 0.15, ease: "easeOut" },
      }}
      className="sessionButton endBtn"
      onClick={handleFinishSession}
    >
      End Session
    </motion.button>
  );

  const addNewNoteForm = (
    <motion.div
      {...fadeDown}
      transition={{ delay: 0.2, duration: 0.26, ease: "easeIn" }}
      className="newNoteFormContainer"
    >
      <form className="newNoteForm">
        <motion.input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Note subject"
          className="newNoteFormElement"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35, ease: "easeIn" }}
        ></motion.input>

        <motion.textarea
          value={studyNote}
          onChange={(e) => setStudyNote(e.target.value)}
          placeholder="Note details"
          className="newNoteFormElement"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.35, ease: "easeIn" }}
          rows="10"
          cols="50"
        ></motion.textarea>

        <button className="btnOverlay" onClick={handleNewNote}>
          Add Note
        </button>
        <button className="btnOverlay redOverlay" onClick={handleCancelNewNote}>
          Cancel
        </button>
      </form>
    </motion.div>
  );

  const addNewNoteButton = (
    <motion.div
      {...fadeDown}
      transition={{ delay: 0.2, duration: 0.26, ease: "easeIn" }}
      exit={{
        y: -30,
        opacity: 0,
        transition: { duration: 0.26, ease: "easeOut" },
      }}
    >
      <button
        className="btnOverlay addNewNoteButton"
        onClick={handleShowNewNote}
      >
        + Add Note
      </button>
    </motion.div>
  );

  function handleCancelNewNote(e) {
    e.preventDefault();
    setShowNotes(true);
    setShowNoteForm(false);
    setSubject("");
    setStudyNote("");
  }

  function handleShowNewNote() {
    setShowNotes(false);
    setShowNoteForm(true);
  }

  function handleFinishSession() {
    setSessionStart(false);
    setShowNotes(false);
    setUserNotes(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  const displayNotesArray = notesArray.map((note) => {
    return (
      <span className="notesArrayElement" key={uuidv4()}>
        <div className="redline"></div>

        <div className="addContainer">
          <div className="insideAddContainer">
            <h5>{note.subject}</h5>
            <li>{note.study_note}</li>
          </div>
          <div>
            <button
              className="btnOverlay editBtn"
              onClick={() => handleNoteEdit(note.id)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button
              className="btnOverlay redOverlay deleteBtn"
              onClick={() => handleNoteDelete(note.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </span>
    );
  });

  function handleNoteDelete(id) {
    const newNotesArray = notesArray.filter((note) => note.id !== id);
    setNotesArray(newNotesArray);

    fetch(`/notes/${id}`, {
      method: "DELETE",
    });
  }

  function handleNoteEdit(id) {
    const editNote = notesArray.find((note) => note.id === id);
    setEditNoteObj(editNote);
    setEditSubject(editNote.subject);
    setEditStudyNote(editNote.study_note);
    setShowEditForm(true);
    setShowNotes(false);
  }

  const editNoteForm = (
    <div className="newNoteFormContainer">
      <motion.form
        {...fadeDown}
        transition={{ duration: 0.35, ease: "easeIn" }}
        className="newNoteForm"
      >
        <input
          value={editSubject}
          onChange={(e) => setEditSubject(e.target.value)}
          placeholder="Subject"
          className="newNoteFormElement"
        ></input>
        <textarea
          value={editStudyNote}
          onChange={(e) => setEditStudyNote(e.target.value)}
          placeholder="Note"
          className="newNoteFormElement"
          rows="10"
          cols="50"
        ></textarea>
        <button className="btnOverlay" onClick={handleEditNote}>
          Add Changes
        </button>
        <button
          className="btnOverlay redOverlay"
          onClick={handleCancelEditNote}
        >
          Cancel
        </button>
      </motion.form>
    </div>
  );

  function handleEditNote(e) {
    e.preventDefault();

    const newEditObj = { subject: editSubject, study_note: editStudyNote };
    fetch(`/notes/${editNoteObj.id}`, {
      method: "PATCH",
      body: JSON.stringify(newEditObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const newUpdatedNotesArr = notesArray.map((note) => {
      if (note.id === editNoteObj.id) {
        return {
          id: editNoteObj.id,
          subject: editSubject,
          study_note: editStudyNote,
          user_id: editNoteObj.user_id,
          study_session_id: editNoteObj.study_session_id,
        };
      } else {
        return note;
      }
    });

    setNotesArray(newUpdatedNotesArr);
    setShowEditForm(false);
    setShowNotes(true);
  }

  function handleCancelEditNote(e) {
    e.preventDefault();
    setShowEditForm(false);
    setEditSubject("");
    setEditStudyNote("");
    setShowNotes(true);
  }

  const displayCurrentNotes = (
    <div className="currentNotesContainer">
      <span className="currentNotesHeader">
        <h4>
          Notes <FontAwesomeIcon icon={faStickyNote} />
        </h4>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </span>
      <ul className="currentNotesDisplay">{displayNotesArray}</ul>
      <ul className="currentNotesDisplay"></ul>
      <div className="currentBtnsContainer">
        <AnimatePresence>{showNotes ? addNewNoteButton : null}</AnimatePresence>
        <AnimatePresence>
          {showNoteForm ? addNewNoteForm : null}
        </AnimatePresence>
      </div>
      <div>
        <AnimatePresence>{showEditForm ? editNoteForm : null} </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="createSessionContainer">
      <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        hours={hours}
        setHours={setHours}
      />

      <div className="sessionFormButton">
        <AnimatePresence>
          {startSession ? (
            <motion.div
              {...fadeDown}
              transition={{ duration: 0.35, ease: "easeIn" }}
              exit={{
                y: 30,
                opacity: 0,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="sessionsContainer"
            >
              {newSessionForm}
            </motion.div>
          ) : null}
        </AnimatePresence>
        {sessionStart ? (
          finishSessionBtn
        ) : (
          <div>{startSession ? null : <div> {startSessionBtn} </div>}</div>
        )}
      </div>

      <AnimatePresence>
        {showUserNotes ? (
          <motion.div
            {...fadeDown}
            transition={{ duration: 0.26, ease: "easeIn" }}
            exit={{
              y: -30,
              opacity: 0,
              transition: { duration: 0.26, ease: "easeOut" },
            }}
            className="notesTodoContainer"
          >
            {displayCurrentNotes}
            <TodoList currentUserSession={currentUserSession} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default CreateSession;
