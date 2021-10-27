import React from "react";
import ClassNames from "classnames";
import InterviewerListItem from "./InterviewerlistItem";
import "components/InterviewerList.scss";

const InterviewerList = (props) => {

  const listOfInterviewers = props.interviewers.map(element => {
    return (
      <InterviewerListItem key={element.id} id={element.id} name={element.name} avatar={element.avatar} setInterviewer={props.setInterviewer} selected={element.id === props.interviewer} />
    )}
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">interviewers</h4>
      <ul className="interviewers__list">{listOfInterviewers}</ul>
    </section>
  )
}

export default InterviewerList;