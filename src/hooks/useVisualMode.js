import { useState, useEffect } from 'react';

export function useVisualMode(inputMode) {

  const [mode, setMode] = useState([]);
  const [history, setHistory] = useState([])

  useEffect(() => {
    setMode(inputMode);
    setHistory([inputMode])
  }, []);

  useEffect(() => {
   //console.log("history log", history)
   setMode(history[history.length - 1]);
  },[history])

  const back = () => {
    if (history.length >= 2) {
      let copyHistory = [...history];
      copyHistory.pop();
      setHistory(prevState => ([...copyHistory]));
      return;
    } 
  }
  
  const transition = (newMode, replace = false) => {

    if(replace) {
      back();
    }
    setMode(newMode);
    setHistory(prevState => ([...prevState, newMode]));
   
  };

  return {mode, transition, back};

}
