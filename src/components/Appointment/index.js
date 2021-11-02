import React, { useEffect } from 'react';
import "components/Appointment/style.scss";
import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from './Empty';
import Form from './Form';
import { useVisualMode } from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';



export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);


  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    console.log("onSave function is called", interview)
    console.log("modifying appointment", props.id);
    transition(SAVING);


    //passing these infor from application 
    const appointment = {
      ...props.state.appointments[props.id],
      interview: { ...interview }
    };
    const appointments = {
      ...props.state.appointments,
      [props.id]: appointment
    };
    
    props.bookInterview(props.id, interview).then((res) => {
      console.log("geting response from server", res);
      props.setState({...props.state, appointments})
      transition(SHOW);
      //props.updateSpots();
    }
    ).catch(err => {
      console.log(err);
      transition(ERROR_SAVE, true);
    });
  
    
    //change to saving first
  }

  const deleteInterview = (e) => {
    console.log("delete button clicked", props.id);

    e.preventDefault();
    

    transition(CONFIRMING, true);

    
    //transition(EMPTY)

    
  }

  const confirmDeleteInterview = () => {
    transition(SAVING, true);
    const appointment = {
      ...props.state.appointments[props.id],
      interview: null
    }
    const appointments = {
      ...props.state.appointments,
      [props.id]: appointment
    }
    props.deleteInterview(props.id).then(res => {
      //set interview to null
      console.log("deleted got server response")
      transition(EMPTY);
      props.setState({...props.state, appointments});
      
     
    }).catch(err => {
      console.log(err);
      transition(ERROR_DELETE, true);
    });

  }

  

  return (
    <>
      <Header time={props.time} />
   
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={back}
          onDelete={deleteInterview}
          onEdit={() => transition(EDIT)}
        />
      )}
         {mode === CREATE && <Form onCancel={() => back()}  onSave={save} interviewers={props.interviewers}  />}

         {mode === SAVING && <Status />}
         {mode === CONFIRMING && <Confirm onCancel={() => back()} onConfirm={() => confirmDeleteInterview()} />}
         {mode === EDIT && <Form  onCancel={() => back()} student={props.interview.student} interviewer={props.interview.interviewer} mode={mode} onEdit={save} interviewers={props.interviewers}/>}

         {mode === ERROR_DELETE && <Error onClose={() => back()} />}
         {mode === ERROR_SAVE && <Error onClose={() => back()} />}
      <article className="appointment">{props.time ? `Appointment at ${props.time}` : "No Appointments"}</article>

    </>
   
  )
}