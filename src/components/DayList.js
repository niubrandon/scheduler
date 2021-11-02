
import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  //const setDay = props.setDay;
  // eslint-disable-next-line no-unused-expressions
  const renderDayListItem = props.days.map((element) => { return <DayListItem id={`dayspots${element.id}`} key={element.id} name={element.name} spots={element.spots} selected={element.name === props.value} setDay={props.onChange} />})

  return (
    <ul>
      {renderDayListItem}
    </ul>
  )
}