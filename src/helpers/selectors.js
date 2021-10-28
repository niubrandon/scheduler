import React from "react";

export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(appointment => appointment.name === day);

  if (filteredAppointments.length === 0) {
    return [];
  }
  console.log("filteredAppointments", filteredAppointments[0].appointments);
  console.log("object values from appointsment", Object.values(state.appointments))
  
 
  const filteredAppointmentsFromDay = Object.values(state.appointments).filter(element => filteredAppointments[0].appointments.includes(element.id))  

  console.log("filteredAppointments", filteredAppointmentsFromDay);
    return filteredAppointmentsFromDay;

}

