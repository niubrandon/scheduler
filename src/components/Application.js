import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors.js'
import { useApplicationData } from 'hooks/useApplicationDate';

import axios from "axios";



export default function Application(props) {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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

  const renderAppointments = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment key={appointment.id} interview={interview} {...appointment} interviewers={dailyInterviewers} bookInterview={bookInterview} deleteInterview={deleteInterview} state={state} setState={setState}/>
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
          <img
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"
    />
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
      <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
      />


    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />
      </section>
      <section className="schedule">
       {renderAppointments}
      
      </section>
    
    </main>
  );
}
