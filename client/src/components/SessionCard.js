import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faX,
  faPencil,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

function SessionCard({
  session,
  notes,
  deleteSession,
  deleteNote,
  editSessionCard,
}) {
  const { title, session_overview, session_date } = session;
  const [editSession, setEditSession] = useState(false);
  const [sessionTitle, setSessionTitle] = useState(title);
  const [sessionDate, setSessionDate] = useState(session_date);
  const [sessionOverview, setSessionOverview] = useState(session_overview);
  const [sessionId, setSessionId] = useState("");

  const sessionNoteCards = notes.map((note) => {
    return <NoteCard key={uuidv4()} note={note} deleteNote={deleteNote} />;
  });

  function handleDeleteSession(id) {
    deleteSession(id);
  }

  function handleEditSession(id) {
    setSessionId(id);
    setEditSession(true);
  }

  const displayCurrentSesssion = (
    <div className="study-full-container">
      <div>
        <span className="studyElementContainer studyCardHead">
          <div>
            <em className="studyCardElementHead">Session Title:</em>
            <h2 className="studysessioncardElement"> {title}</h2>
          </div>
          <div className="sessionCardIcons">
            <button
              className="btnOverlay"
              onClick={() => handleEditSession(session.id)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button
              className="btnOverlay redOverlay"
              onClick={() => handleDeleteSession(session.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </span>
        <span className="studyElementContainer sessionDetail">
          <em className="studyCardElementHead">Session Date:</em>
          <p className="studysessioncardElement"> {session_date}</p>
        </span>
        <span className="studyElementContainer sessionDetail">
          <em className="studyCardElementHead">Session Overview:</em>
          <p className="studysessioncardElement">{session_overview}</p>
        </span>
      </div>
      <div className="studyNotesContainer">
        <h3>Notes</h3>
        <div className="cardcontainer">{sessionNoteCards}</div>
      </div>
    </div>
  );

  function handleCancelEditSession(e) {
    e.preventDefault();

    setEditSession(false);
  }

  function handleSubmitEditSession(e) {
    e.preventDefault();
    const newEditSessionObj = {
      title: sessionTitle,
      session_overview: sessionOverview,
      session_date: sessionDate,
    };

    editSessionCard(sessionId, newEditSessionObj);
    setEditSession(false);
  }

  const framerFadeDown = {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.26, ease: "easeIn" },
  };

  const displayEditForm = (
    <form>
      <span className="studyCardHead ">
        <motion.div
          {...framerFadeDown}
          className="studyElementContainer studyEditCard"
        >
          <em className="studyCardElementHead">Session Title:</em>
          <input
            className="newNoteFormElement"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
          ></input>
        </motion.div>
        <motion.div {...framerFadeDown} className="sessionCardIcons">
          <button className="btnOverlay" onClick={handleSubmitEditSession}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            className="btnOverlay redOverlay"
            onClick={handleCancelEditSession}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </motion.div>
      </span>
      <motion.span
        {...framerFadeDown}
        transition={{ delay: 0.1, duration: 0.26, ease: "easeIn" }}
        className="studyElementContainer studyEditCard"
      >
        <em className="studyCardElementHead">Session Date:</em>
        <input
          className="newNoteFormElement"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
        ></input>
      </motion.span>
      <motion.span
        {...framerFadeDown}
        transition={{ delay: 0.2, duration: 0.26, ease: "easeIn" }}
        className="studyElementContainer studyEditCard"
      >
        <em className="studyCardElementHead">Session Overview:</em>
        <textarea
          className="newNoteFormElement textAreaInput"
          value={sessionOverview}
          onChange={(e) => setSessionOverview(e.target.value)}
          rows="3"
          cols="30"
        ></textarea>
      </motion.span>
      <div className="studyNotesContainer">
        <h3>Notes</h3>
        <div className="cardcontainer">{sessionNoteCards}</div>
      </div>
    </form>
  );

  return (
    <div className="studysessioncard">
      <AnimatePresence>
        {editSession ? displayEditForm : displayCurrentSesssion}
      </AnimatePresence>
    </div>
  );
}

export default SessionCard;
