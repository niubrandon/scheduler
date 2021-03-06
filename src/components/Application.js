import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors.js'
import { useApplicationData } from 'hooks/useApplicationData';
import Header from "./Appointment/Header";


export default function Application(props) {

  const {state, dispatch, setDay, bookInterview, deleteInterview, saveAppointment, deleteAppointment} = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const renderAppointments = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment key={appointment.id} interview={interview} interviewer={interview && interview.interviewer.name} {...appointment} interviewers={dailyInterviewers} bookInterview={bookInterview} deleteInterview={deleteInterview} state={state} dispatch={dispatch} saveAppointment={saveAppointment} deleteAppointment={deleteAppointment} />
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
       <Header time="5pm" />
      </section>
    
    </main>
  );
}
