import React from 'react';
import "components/Appointment/style.scss";
import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from './Empty';
import Form from './Form';
import { useVisualMode } from 'hooks/useVisualMode';



export default function Appointment (props) {
  console.log("this is appointment component", props.interview)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  console.log("currently mode is:", mode);
  return (
    <>
      <Header time={props.time} />
      {mode === CREATE && <Form onCancel={() => back()} interviewers={props.interviewers}/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={back()}
        />
      )}
      
      <article className="appointment">{props.time ? `Appointment at ${props.time}` : "No Appointments"}</article>

    </>
   
  )
}