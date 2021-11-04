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
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);


  const save = (name, interviewer, onEditMode = false) => {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    console.log("onSave function is called", interview)
    console.log("modifying appointment", props.id);
    transition(SAVING);


    const appointment = {
      ...props.state.appointments[props.id],
      interview: { ...interview }
    };
    const appointments = {
      ...props.state.appointments,
      [props.id]: appointment
    };

    const dayIndex = props.state.days.findIndex(element => element.name === props.state.day);

    const daySpots = {
     ...props.state.days[dayIndex],
     spots: props.state.days[dayIndex].spots - (!onEditMode && 1)
   }

   const daysSpots = {
     ...props.state.days,
     [dayIndex] : daySpots
   }

   const days = Object.values(daysSpots)

    props.bookInterview(props.id, interview).then((res) => {
      console.log("geting response from server", res);
     
      props.setState({...props.state, appointments, days})
    
      transition(SHOW);
     
    }
    ).catch(err => {
    
      transition(ERROR_SAVE, true);
    });

  }

  const deleteInterview = (e) => {
 
    e.preventDefault();
    
    transition(CONFIRMING, true);
  }

  const confirmDeleteInterview = () => {
    transition(DELETING, true);
    const appointment = {
      ...props.state.appointments[props.id],
      interview: null
    }
    const appointments = {
      ...props.state.appointments,
      [props.id]: appointment
    }

    const dayIndex = props.state.days.findIndex(element => element.name === props.state.day);
    
    const daySpots = {
     ...props.state.days[dayIndex],
     spots: props.state.days[dayIndex].spots + 1
   }

   const daysSpots = {
     ...props.state.days,
     [dayIndex] : daySpots
   }

   const days = Object.values(daysSpots)


    props.deleteInterview(props.id).then(res => {

      transition(EMPTY);
      props.setState({...props.state, appointments, days});
      
     
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
          interviewer={props.interviewer}
          onCancel={back}
          onDelete={deleteInterview}
          onEdit={() => transition(EDIT)}
        />
      )}
         {mode === CREATE && <Form onCancel={() => back()}  onSave={save} interviewers={props.interviewers}  />}

         {mode === SAVING && <Status message="Saving"/>}
         {mode === DELETING && <Status message="Deleting"/>}
         {mode === CONFIRMING && <Confirm onCancel={() => back()} onConfirm={() => confirmDeleteInterview()} />}
         {mode === EDIT && <Form  onCancel={() => back()} student={props.interview.student} interviewer={props.interview.interviewer} mode={mode} onEdit={save} interviewers={props.interviewers}/>}

         {mode === ERROR_DELETE && <Error onClose={() => back()} />}
         {mode === ERROR_SAVE && <Error onClose={() => back()} />}
      <article className="appointment">{props.time ? `Appointment at ${props.time}` : "No Appointments"}</article>

    </>
   
  )
}