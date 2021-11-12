
export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(appointment => appointment.name === day);

  if (filteredAppointments.length === 0) {
    return [];
  }

  
 
  const filteredAppointmentsFromDay = Object.values(state.appointments).filter(element => filteredAppointments[0].appointments.includes(element.id))  

    return filteredAppointmentsFromDay;

}

export function getInterview(state, interview) {

  if (!interview) {

    return null;
  }

  let resultObj = {};
 
    resultObj.student = interview.student;

    resultObj.interviewer = state.interviewers[interview.interviewer];

  return resultObj ;
}

export function getInterviewersForDay(state, day) {
  const filteredAppointments = state.days.filter(appointment => appointment.name === day);
  
  if (filteredAppointments.length === 0) {
    return [];
  }

  const interviewersFromThatDay = filteredAppointments[0].interviewers;
 
  const filteredInterviewers = Object.values(state.interviewers).filter(interviewer => interviewersFromThatDay.includes(interviewer.id))
  
    return filteredInterviewers;
 
}

