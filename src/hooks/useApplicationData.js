import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";


//ongoing inplementation of useReducer


export function useApplicationData() {
  
  const SET_DAY = "SET_DAY";
  const FETCH_DATA = "FETCH_DATA";
  const SAVE_APPOINTMENT = "SAVE_APPOINTMENT";
  const DELETE_APPOINTMENT = "DELETE_APPOINTMENT";

  function reducer(state, action) {

    // eslint-disable-next-line default-case
    switch (action.type) {
      case SET_DAY:
        return ({...state, day: action.value});
      case FETCH_DATA:
        return {...state, days: action.value[0].data, appointments: action.value[1].data, interviewers: action.value[2].data};
      case SAVE_APPOINTMENT:
        return {...state, appointments: action.appointments, days: action.days};
      case DELETE_APPOINTMENT:
        return {...state, appointments: action.appointments, days: action.days};
      default:
        return state;   
    }
      
  }

   /*  if (action.type === "FETCH_DATA") {
      return {...state, days: action.value[0].data, appointments: action.value[1].data, interviewers: action.value[2].data}
    } 
    if (action.type === "SET_DAY") {
      return ({...state, day: action.value});
    }
    if (action.type === "DELETE_APPOINTMENT") {
     
      return {...state, appointments: action.appointments, days: action.days};
    }

    if (action.type === "SAVE_APPOINTMENT") {
      return {...state, appointments: action.appointments, days: action.days}
    }

  
    return state; */
  

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

      dispatch({type: "FETCH_DATA", value: [first, second, third]})
    });


  }, []);



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