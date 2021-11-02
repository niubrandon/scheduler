import React, { useState, useEffect } from 'react';
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors.js'


export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState(prev => ({ ...prev, day}));

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers')),
    ]).then((all) => {
      const [first, second, third] = all;  
      setState(prev => ({ ...prev, days: first.data, appointments: second.data, interviewers: third.data }))
    });


  }, []);

  const updateSpots = () => {
  /*  
    const availableSpots = getAppointmentsForDay(state, state.day).filter(element => !element.interview).length;
    const dayIndex = state.days.findIndex(element => element.name === state.day);
     console.log("get dayIndex and available spots", dayIndex, availableSpots );
    console.log("get state days on that day with spots", state.days[dayIndex].spots );
     const daySpots = {
      ...state.days[dayIndex],
      spots: availableSpots
    }

    const daysSpots = {
      ...state.days,
      [dayIndex] : daySpots
    }
    
    setState({...state, daysSpots})   
    console.log("show the elemtn value", document.getElementById(`dayspots${dayIndex}`).value); */
;

  }


  const bookInterview = (id, interview) => {
    console.log("bookInterview invoked");
    console.log("reading the input params from bookinterview", id, interview);

    return axios.put(`/api/appointments/${id}`, { interview: interview });
    
  }


  const deleteInterview = (id) => {
    console.log("deleteInterview triggered for appointment", id);
    return axios.delete(`/api/appointments/${id}`);
  };

  

  useEffect(() => {
    console.log("state changed to", state);
  
   
  },[state])

  return {state, setState, setDay, bookInterview, deleteInterview, updateSpots}
};