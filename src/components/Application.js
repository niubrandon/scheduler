import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors.js'

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
  /* const setDays = days => {
    setState(prev => ({ ...prev, days }));
  } */

 /*  useEffect(() => {
    axios.get('/api/days').then((response) => {
      console.log("response from server for get url", response.data);
      //setDays(response.data)
    } )
  }, []); */

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers')),
    ]).then((all) => {
      //console.log(all[0]); // first
      //console.log(all[1]); // second
      //console.log("interviewers", all[2]); // third
      const [first, second, third] = all;  
      //console.log(first, second, third);
      setState(prev => ({ ...prev, days: first.data, appointments: second.data, interviewers: third.data }))
    });


  }, []);


  const renderAppointments = dailyAppointments.map(appointment => {
    //console.log("print the appointments from render appointsment", appointment)
    
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment key={appointment.id} interview={interview} {...appointment} interviewers={dailyInterviewers}/>
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
       <Appointment key="last" time="5pm" />
      </section>
    
    </main>
  );
}
