import React, { createRef, useEffect, useMemo, useRef, useState } from "react";

import { generate, count } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/testModeContext";
import Stats from "./Stats";

const TypingBox = () => {
  const inputRef = useRef(null);

  const { testTime } = useTestMode();
  const [countDown, setCountDown] = useState(testTime);
  const [intervalId, setintervalId] = useState(null);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setinCorrectChars] = useState(0);
  const [missedChars, setmissedChars] = useState(0);
  const [extraChars, setextraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  const [wordsArray, setWordsArray] = useState(() => {
    return generate(50);
  });

  const [currWordIndex, setcurWordIndex] = useState(0);
  const [currCharIndex, setcurCharIndex] = useState(0);
  const [graphData, setgraphData] = useState([]);


  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setintervalId(intervalId);
    function timer() {
      setCountDown((latest) => {
        setCorrectChars((correctChars)=>{
          setgraphData((graphData)=>{
            return [...graphData,[
              testTime-latest+1,
              (correctChars/5)/((testTime-latest+1)/60)
            ]];
          })
          return correctChars;
        })
        if (latest === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }

        return latest - 1;
      });
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setcurWordIndex(0);
    setcurCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50));
    resetwordsSpanRef();
    focusInput();
  };

  const resetwordsSpanRef = () => {
    wordsSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });
    wordsSpanRef[0].current.childNodes[0].className = "current";
  };

  const handleUserInput = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    if (e.keyCode === 32) {
      //logic for space
      let correctcharsinword =
        wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");
      if (correctcharsinword.length === allCurrChars.length)
        setCorrectWords(correctWords + 1);
      if (allCurrChars.length <= currCharIndex) {
        //remove cursor from last place in a word
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      } else {
        setmissedChars(missedChars + (allCurrChars.length - currCharIndex));
        allCurrChars[currCharIndex].classList.remove("current");
      }

      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "current";
      setcurWordIndex(currWordIndex + 1);
      setcurCharIndex(0);
      return;
    }

    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (allCurrChars.length === currCharIndex) {
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " current-right";
          } else {
            allCurrChars[currCharIndex - 1].className = "current";
          }

          setcurCharIndex(currCharIndex - 1);
          return;
        }
        allCurrChars[currCharIndex].className = "";
        allCurrChars[currCharIndex - 1].className = "current";
        setcurCharIndex(currCharIndex - 1);
      }

      return;
    }

    if (currCharIndex === allCurrChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right";
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setcurCharIndex(currCharIndex + 1);
      setextraChars(extraChars + 1);
      return;
    }

    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      allCurrChars[currCharIndex].className = "incorrect";
      setinCorrectChars(incorrectChars + 1);
    }

    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += " current-right";
    } else allCurrChars[currCharIndex + 1].className = "current";

    setcurCharIndex(currCharIndex + 1);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  const calculateAcc = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  return (
    <div>
      <UpperMenu countDown={countDown} />
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAcc()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
        />
       
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => (
              <span className="word" ref={wordsSpanRef[index]}>
                {word.split("").map((char) => (
                  <span>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
      <input
        type="text"
        className="hidden-input"
        onKeyDown={handleUserInput}
        ref={inputRef}
      />
    </div>
  );
};

export default TypingBox;
