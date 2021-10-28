import React from 'react';
import "components/Appointment/style.scss";
import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from './Empty';


export default function Appointment (props) {
  
  return (
    <>
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
      <article className="appointment">{props.time ? `Appointment at ${props.time}` : "No Appointments"}</article>

    </>
   
  )
}