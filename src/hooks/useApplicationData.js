import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, {
  SET_DAY, FETCH_DATA, SAVE_APPOINTMENT, DELETE_APPOINTMENT, SET_INTERVIEW
} from "reducers/application"


export function useApplicationData() {
  

  const [state, dispatch] = useReducer(
    reducer, 
     {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });

  const setDay = (day) => {
    console.log("swtich to day", day)
    dispatch({type: "SET_DAY", value: day 
  })
}
  const saveAppointment = (appointments, days) => {
    console.log("saving appointments", appointments, days);
    dispatch({type: "SAVE_APPOINTMENT", appointments: appointments, days: days })
  }

  const deleteAppointment = (appointments, days) => {
    console.log("deleting appointments", appointments, days);
    dispatch({type: "DELETE_APPOINTMENT", appointments: appointments, days: days })
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers')),
    ]).then((all) => {
      const [first, second, third] = all;  

      dispatch({type: "FETCH_DATA", value: [first.data, second.data, third.data]})
    });


  }, []);


  
  useEffect(() => {
    if (process.env.REACT_APP_WEBSOCKET_URL) {
      const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

       webSocket.onmessage = function(event) {
         const data = JSON.parse(event.data);
         if (data.type === "SET_INTERVIEW") {
          dispatch(data)
         }
       }
       return (() => webSocket.close())  
    }
 
  },[dispatch])

  const bookInterview = (id, interview) => {
   
    return axios.put(`/api/appointments/${id}`, { interview: interview });
    
  }


  const deleteInterview = (id) => {

    return axios.delete(`/api/appointments/${id}`);
  };

  

  useEffect(() => {
    console.log("*****state changed to*****", state); 
   
  },[state])

  return {state, dispatch, saveAppointment, deleteAppointment, setDay, bookInterview, deleteInterview}
};