import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import SessionCard from "./SessionCard";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion/dist/framer-motion";

function StudySessions() {
  const [sessionWithNotes, setSessionWithNotes] = useState([]);

  function deleteSession(id) {
    const newDeletedSessionArray = sessionWithNotes.filter(
      (session) => session.id !== id
    );
    setSessionWithNotes(newDeletedSessionArray);

    fetch(`/study_sessions/${id}`, {
      method: "DELETE",
    });
  }

  function deleteNote() {}

  function editSessionCard(sessionId, newSessionObj) {
    const newEditSessionArray = sessionWithNotes.map((session) => {
      if (session.id === sessionId) {
        return {
          ...session,
          title: newSessionObj.title,
          session_overview: newSessionObj.session_overview,
          session_date: newSessionObj.session_date,
        };
      } else {
        return session;
      }
    });

    fetch(`/study_sessions/${sessionId}`, {
      method: "PATCH",
      body: JSON.stringify(newSessionObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setSessionWithNotes(newEditSessionArray);
  }

  useEffect(() => {
    fetch("/study_sessions")
      .then((r) => r.json())
      .then(setSessionWithNotes);
  }, []);

  if (!sessionWithNotes) return <p>loading study sessions...</p>;

  const studySessionCards = sessionWithNotes.map((session) => {
    return (
      <SessionCard
        key={uuidv4()}
        session={session}
        notes={session.notes}
        deleteSession={deleteSession}
        deleteNote={deleteNote}
        editSessionCard={editSessionCard}
      />
    );
  });

  return (
    <div className="studySessionContainer">

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className="container"
      >
        {studySessionCards}
      </motion.div>
   
    </div>
  );
}

export default StudySessions;
