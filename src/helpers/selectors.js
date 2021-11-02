import React from "react";

export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(appointment => appointment.name === day);

  if (filteredAppointments.length === 0) {
    return [];
  }
  //console.log("filteredAppointments", filteredAppointments[0].appointments);
  //console.log("object values from appointsment", Object.values(state.appointments))
  
 
  const filteredAppointmentsFromDay = Object.values(state.appointments).filter(element => filteredAppointments[0].appointments.includes(element.id))  

  //console.log("filteredAppointments", filteredAppointmentsFromDay);
    return filteredAppointmentsFromDay;

}

export function getInterview(state, interview) {

  if (!interview) {
    //console.log("result from getInterviewe function when no interview", {});
    return null;
  }

  let resultObj = {};
 
    resultObj.student = interview.student;

    resultObj.interviewer = state.interviewers[interview.interviewer];
  
  
  //console.log("result from getInterviewe function is", resultObj);
  return resultObj ;
}

export function getInterviewersForDay(state, day) {
  const filteredAppointments = state.days.filter(appointment => appointment.name === day);
  
  if (filteredAppointments.length === 0) {
    return [];
  }

  const interviewersFromThatDay = filteredAppointments[0].interviewers;
 

  if (interviewersFromThatDay.length === 0) {
    return [];
  }
  const filteredInterviewers = Object.values(state.interviewers).filter(interviewer => interviewersFromThatDay.includes(interviewer.id))

  
    return filteredInterviewers;
 
}

