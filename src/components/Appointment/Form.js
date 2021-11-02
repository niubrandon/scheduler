import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
 
  const reset = () => {
    setStudent("");
    setInterviewer("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const onClickButton = (e) => {
    e.preventDefault();
    props.onSave(student, interviewer);

  };

  const onClickButtonEdit = (e) => {
    e.preventDefault();
    props.onEdit(student, interviewer);
  }
  //placeholder={props.mode === "EDIT" ? props.student : "Enter your name"}
  //value={props.mode === "EDIT" && props.student}
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"          
            placeholder={props.mode === "EDIT" ? props.student : "Enter your name"}
            onChange={(e) => setStudent(e.target.value) }
          />
        </form>
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