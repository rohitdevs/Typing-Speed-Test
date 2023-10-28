import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'

import { generate, count } from "random-words";


const TypingBox = () => {


  const inputRef=useRef(null);
 
 const [wordsArray, setWordsArray]=useState(()=>{
  return generate(50);
 });
 
 const [currWordIndex, setcurWordIndex]=useState(0);
 const [currCharIndex, setcurCharIndex]=useState(0);

 const wordsSpanRef = useMemo(()=>{
  return Array(wordsArray.length).fill(0).map(i=>createRef(null));
  }, [wordsArray]);
 
 const handleUserInput=(e)=>{
console.log(e);
const allCurrChars=wordsSpanRef[currWordIndex].current.childNodes;
 if(e.key===allCurrChars[currCharIndex].innerText)
 {
  allCurrChars[currCharIndex].className='correct';
 }
 else
 {
  allCurrChars[currCharIndex].className='incorrect';
 }

 allCurrChars[currCharIndex+1].className='current';
setcurCharIndex(currCharIndex+1);

}


 const focusInput=()=>{
  inputRef.current.focus();
 }

useEffect(()=>{
focusInput();
wordsSpanRef[0].current.childNodes [0].className='current';
},[])

 
  return (
    <div>
      <div className="type-box" onClick={focusInput}>
        <div className="words">
          {
           wordsArray.map((word,index)=>(
            <span className='word'ref={wordsSpanRef[index]}>
                {
                  word.split('').map(char=>(
                    <span>{char}</span>

                  ))
                }
            </span>
           ))
          }
        </div>
      </div>
      <input type="text"
      className='hidden-input'
      onKeyDown={handleUserInput}
      ref={inputRef} />
    </div>
  )
}

export default TypingBox
