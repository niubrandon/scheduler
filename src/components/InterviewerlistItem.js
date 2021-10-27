import React from 'react';
import ClassNames from 'classnames';
import 'components/InterviewerlistItem.scss'

const InterviewerListItem = (props) => {
  
  const itemClass = ClassNames("interviewers__item", {"interviewers__item--selected": props.selected});


  return (
    <li className={itemClass} selected={props.selected} onClick={props.setInterviewer} >
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