import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
 
  const reset = () => {
    setStudent("");
    setInterviewer("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

 /*  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(student, interviewer);
  } */

  const onClickButton = (e) => {
    e.preventDefault();
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Must select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
   

  };

  const onClickButtonEdit = (e) => {
    e.preventDefault();
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } 

    if (!interviewer) {
      setError("Must select an interviewer");
      return;
    }
    setError("");
    props.onEdit(student, interviewer, true);
  }



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            data-testid="student-name-input"          
            placeholder={props.mode === "EDIT" ? props.student : "Enter Student Name"}
            onChange={(e) => {
              setError("")
              setStudent(e.target.value)} }
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers} setInterviewer={setInterviewer} value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.mode === "EDIT" ? onClickButtonEdit : onClickButton}>Save</Button>
        </section>
      </section>
    </main>
  )
}