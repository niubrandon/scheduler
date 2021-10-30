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
 
  const filteredInterviewersFromDay = Object.values(state.appointments).filter(element => filteredAppointments[0].appointments.includes(element.id) && element.interview);
  console.log("filtered interview list on that day with interview not null is", filteredInterviewersFromDay);
  let interviewersList = [];
  for (const ele of filteredInterviewersFromDay) {
    if (!interviewersList.includes(ele.interview.interviewer)) {
      interviewersList.push(ele.interview.interviewer)
    }
  }  
  console.log("filtered interview list on that day with interview not null is", filteredInterviewersFromDay);
  console.log("interviewersList is", interviewersList)

  if (interviewersList.length === 0) {
    return [];
  }
  const filteredInterviewers = Object.values(state.interviewers).filter(interviewer => interviewersList.includes(interviewer.id))

  console.log("!!!!!interviewers results", filteredInterviewers);
    return filteredInterviewers;
 
}

