import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";

function NoteCard({ note, deleteNote }) {
  const { subject, study_note } = note;
  const [showText, setShowText] = useState(false);

  function toggleShown() {
    setShowText((showText) => !showText);
  }

  function handleDeleteNote(id) {}

  return (
    <div>
      <div className="notecard notesArrayElement">
        {/* <h4 onClick={toggleShown}>{subject}</h4> */}
        <p>{study_note}</p>
        {/* <div className="sessionCardIcons">
          <button className="btnOverlay" onClick={toggleShown}>
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button className="redOverlay btnOverlay" onClick={toggleShown}>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => handleDeleteNote(note.id)}
            />
          </button>
        </div> */}
      </div>
      <div>
        {/* <AnimatePresence>
          <motion.div
            className="notecontainer notesArrayElement"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,

              transition: {
                duration: 0.35,
                type: "show",
                ease: "easeIn",
              },
            }}
            exit={{
              y: "50%",
              opacity: 0,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <h2>{subject}</h2>
            <p>{study_note}</p>
            <div className="sessionCardIcons">
              <button className="btnOverlay" onClick={toggleShown}>
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button className="redOverlay btnOverlay" onClick={toggleShown}>
                <FontAwesomeIcon
                  icon={faX}
                  onClick={() => handleDeleteNote(note.id)}
                />
              </button>
            </div>
          </motion.div>
        </AnimatePresence> */}
      </div>
    </div>
  );
}

export default NoteCard;
