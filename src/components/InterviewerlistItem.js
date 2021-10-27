import React from 'react';
import ClassNames from 'classnames';
import 'components/InterviewerlistItem.scss'

const InterviewerListItem = (props) => {
  const listStyle = ClassNames("interviewers__item", {"interviewers__item--selected": props.selected});

  return (
    <li id={props.id} className={listStyle} onClick={ e => props.setInterviewer(props.id)} selected={props.selected} action={props.id}>
      <img 
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}

export default InterviewerListItem;