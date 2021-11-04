import { useState, useEffect } from 'react';

export function useVisualMode(inputMode) {

  const [mode, setMode] = useState([]);
  const [history, setHistory] = useState([inputMode])

  useEffect(() => {
    setMode(inputMode);
  }, []);

  useEffect(() => {
   console.log("history log", history)
  },[history])


  

  const back = () => {
    if (history.length >= 2) {
      history.pop();
      setHistory(history)
      setMode(history[history.length - 1]);
      return;
    } 
  }
  
  const transition = (newMode, replace = false) => {

    if(replace) {
      back();
    }
    setMode(newMode);
    history.push(newMode);
    setHistory(history);
   
  };

  return {mode, transition, back};

}
