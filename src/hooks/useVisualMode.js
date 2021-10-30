import { useState, useEffect } from 'react';

export function useVisualMode(inputMode) {

  const [mode, setMode] = useState("");
  const [history, setHistory] = useState([inputMode])

  useEffect(() => {
    setMode(inputMode);
  }, []);

  const transition = (newMode, replace = false) => {
    setMode(newMode);  
    if(replace) {
      history.pop(); 
    }
    setHistory(prev => [...prev, newMode])
  };

  const back = () => {
    if (history.length >= 2) {
      history.pop();
      setHistory(history)
      setMode(history[history.length - 1]);
      return;
    } 
  } 

  return {mode, transition, back};

}
