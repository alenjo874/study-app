import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPause,
  faArrowRotateLeft,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

function Timer({ seconds, setSeconds, minutes, setMinutes, hours, setHours }) {
  const [timerDone, setTimerDone] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [timerInput, setTimerInput] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [hideTimer, setHideTimer] = useState(false);

  function handleTimer(e) {
    e.preventDefault();
    if (seconds > 0 || minutes > 0 || hours > 0) {
      setStartTimer(true);
      setTimerInput(false);
      setResetTimer(false);
    } else if (seconds < 1 && minutes < 1 && hours < 1) {
      alert("please add more time!");
    }
  }

  function CountDown() {
    const timerDropDownEffect = {
      initial: { y: 0 },
      animate: { y: 10, opacity: 0 },
      transition: { delay: 0.5, duration: 0.5, ease: "easeIn" },
    };

    useEffect(() => {
      if (seconds > 59) {
        setSeconds(59);
      }
      if (minutes > 59) {
        setMinutes(59);
      }
      if (hours > 23) {
        setHours(23);
      }

      const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
      if (seconds >= 0) {
        // setTimeout(() => setSeconds((prev) => prev - 1), 1000);
      } else if (minutes >= 1) {
        setSeconds(59);
        setMinutes((prevMinute) => --prevMinute);
      } else if (hours > 0) {
        setSeconds(59);
        setMinutes(59);
        setHours((prevHour) => --prevHour);
      } else if (hours == 0 && minutes == 0) {
        setSeconds("0");
        setTimerDone(true);
        setStartTimer(false);
        setHideTimer(false);
      }

      return () => {
        clearTimeout(timer);
      };
    });

    const motionMinute = (
      <motion.li {...timerDropDownEffect}>
        {minutes > 9 ? minutes : "0" + minutes}m:
      </motion.li>
    );

    const stationaryMinute = <li>{minutes > 9 ? minutes : "0" + minutes}m:</li>;

    const motionHour = (
      <motion.li {...timerDropDownEffect}>
        {hours > 9 ? hours : "0" + hours}h:
      </motion.li>
    );

    const stationaryhour = <li>{hours > 9 ? hours : "0" + hours}h:</li>;

    return (
      <div className="countDownContainer">
        <h3 className="timeDisplay">
          {minutes === 0 && seconds === 0 ? motionHour : stationaryhour}
          {seconds === 0 ? motionMinute : stationaryMinute}
          <motion.li {...timerDropDownEffect}>
            {seconds > 9 ? seconds : "0" + seconds}s
          </motion.li>
        </h3>
      </div>
    );
  }

  const countDownForm = (
    <motion.form
      className="countDownForm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeIn" }}
    >
      <label>Set Time</label>
      <div>
        <input
          className="timeFormElement"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min="0"
          max="23"
        ></input>
        <label>hr</label>
        <input
          className="timeFormElement"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          min="0"
          max="59"
        ></input>
        <label>min</label>
        <input
          className="timeFormElement"
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          min="1"
          max="59"
        ></input>
        <label>sec</label>
      </div>
      <div>
        <button className="btnOverlay countDownBtns" onClick={handleTimer}>
          {"Start "}
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          className="btnOverlay redOverlay countDownBtns"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );

  const setTimerButton = (
    <button className="btnOverlay" onClick={handleTimerButton}>
      Set Timer <FontAwesomeIcon icon={faClock} />
    </button>
  );

  function handleTimerButton() {
    setTimerInput(true);
    setHideTimer(true);
  }

  function handleCancel(e) {
    e.preventDefault();
    setTimerInput(false);
    setHideTimer(false);
  }

  const pauseTimerButton = (
    <button
      className="btnOverlay countDownBtns"
      onClick={() => setPauseTimer((prev) => !prev)}
    >
      {pauseTimer ? (
        <>
          Restart <FontAwesomeIcon icon={faPlay} />
        </>
      ) : (
        <>
          Pause <FontAwesomeIcon icon={faPause} />
        </>
      )}
    </button>
  );

  const resetTimerbutton = (
    <button className="btnOverlay countDownBtns" onClick={handleReset}>
      Reset <FontAwesomeIcon icon={faArrowRotateLeft} />
    </button>
  );

  function handleReset() {
    setResetTimer(true);
    setPauseTimer(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  const displayPauseTime = (
    <h3 className="timeDisplay">
      {hours > 9 ? hours : "0" + hours}h:
      {minutes > 9 ? minutes : "0" + minutes}m:
      {seconds > 9 ? seconds : "0" + seconds}s
    </h3>
  );

  return (
    <motion.div
      className="timerContainer"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeIn" }}
      exit={{
        y: -30,
        opacity: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      {pauseTimer ? (
        displayPauseTime
      ) : startTimer ? (
        <CountDown />
      ) : (
        <h3 className="timeDisplay">00h:00m:00s</h3>
      )}
      {/* {timerDone ? <p>Timer Done!</p> : null} */}
      <AnimatePresence>
        {timerInput ? (
          <motion.div
            exit={{
              y: -30,
              opacity: 0,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            {countDownForm}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div>
        {hideTimer ? null : (
          <motion.div
            className="setTimerBtnContainer"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.45, ease: "easeIn" }}
            exit={{
              y: -30,
              opacity: 0,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            {setTimerButton}
          </motion.div>
        )}
      </div>
      <div className="timerActionButtonsContainer">
        <AnimatePresence>
          {startTimer ? (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.45, ease: "easeIn" }}
              exit={{
                y: -30,
                opacity: 0,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            >
              {pauseTimerButton} {resetTimerbutton}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Timer;
