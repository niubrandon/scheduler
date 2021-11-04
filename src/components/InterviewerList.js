import React from "react";
import ClassNames from "classnames";
import InterviewerListItem from "./InterviewerlistItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

const InterviewerList = (props) => {

  const listOfInterviewers = props.interviewers.map(element => {
   
    return (
      <InterviewerListItem key={element.id} name={element.name} avatar={element.avatar} setInterviewer={ e => props.setInterviewer(element.id)} selected={element.id === props.value} />
    )}
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">interviewers</h4>
      <ul className="interviewers__list">{listOfInterviewers}</ul>
    </section>
  )
}
InterviewerList.propsTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;