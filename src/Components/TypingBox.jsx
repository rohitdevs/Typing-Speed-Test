import React, { createRef, useEffect, useMemo, useRef, useState } from "react";

import { generate, count } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/testModeContext";

const TypingBox = () => {
  const inputRef = useRef(null);

  const {testTime}=useTestMode();
  const [countDown, setCountDown] = useState(testTime);
  const[intervalId,setintervalId]=useState(null);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);

  const [wordsArray, setWordsArray] = useState(() => {
    return generate(50);
  });

  const [currWordIndex, setcurWordIndex] = useState(0);
  const [currCharIndex, setcurCharIndex] = useState(0);

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
        if (latest === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }

        return latest - 1;
      });
    }
  };


   const resetTest=()=>{
    clearInterval(intervalId);
    setCountDown(testTime);
    setcurWordIndex(0);
    setcurCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50));
    resetwordsSpanRef();
    focusInput();
   }

   const resetwordsSpanRef=()=>{
    wordsSpanRef.map(i=>{
      Array.from(i.current.childNodes).map(j=>{
           j.className='';
      })
    });
    wordsSpanRef[0].current.childNodes[0].className='current';
   }

  const handleUserInput = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    if (e.keyCode === 32) {
      if (allCurrChars.length <= currCharIndex) {
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      } else {
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
            allCurrChars[currCharIndex - 2].className+= " current-right";
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
      return;
    }

    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = "correct";
    } else {
      allCurrChars[currCharIndex].className = "incorrect";
    }

    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += " current-right";
    } else allCurrChars[currCharIndex + 1].className = "current";

    setcurCharIndex(currCharIndex + 1);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

useEffect(()=>{
resetTest();
},[testTime])

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  return (
    <div>
      <UpperMenu countDown={countDown} />
      {testEnd ? (
        <h1>Test Over</h1>
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
