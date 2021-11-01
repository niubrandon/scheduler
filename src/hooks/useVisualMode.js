import { useState, useEffect } from 'react';

export function useVisualMode(inputMode) {

  const [mode, setMode] = useState("");
  const [history, setHistory] = useState([inputMode])

  useEffect(() => {
    setMode(inputMode);
  }, []);

  useEffect(() => {
    console.log("*****the updated mode is", mode);
  },[mode])


  const transition = (newMode, replace = false) => {
    
    console.log("new mode is set to", newMode);
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
