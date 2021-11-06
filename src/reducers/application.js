const SET_DAY = "SET_DAY";
const FETCH_DATA = "FETCH_DATA";
const SAVE_APPOINTMENT = "SAVE_APPOINTMENT";
const DELETE_APPOINTMENT = "DELETE_APPOINTMENT";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {

  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_DAY:
      return ({...state, day: action.value});
    case FETCH_DATA:
      return {...state, days: action.value[0], appointments: action.value[1], interviewers: action.value[2]};
    case SAVE_APPOINTMENT:
      return {...state, appointments: action.appointments, days: action.days};
    case DELETE_APPOINTMENT:
      return {...state, appointments: action.appointments, days: action.days};
    case SET_INTERVIEW:
  
      const findDaysFromInterviewId = state.days.filter(element => {
        return element.appointments.includes(action.id)
      })[0];

      const changeSpot = (state, action) => {
        if (action.interview && state.appointments[action.id].interview) {
          return 0;
        } else if (!action.interview && state.appointments[action.id].interview) {
          return -1;
        } else if (action.interview && !state.appointments[action.id].interview) {
          return 1
        }
        return 0;
      }
 
      const arrIndex = findDaysFromInterviewId.id - 1;
  
      const daySpots = {
        ...state.days[arrIndex], spots: state.days[arrIndex].spots + changeSpot(state, action)
      }
    
      const daysSpots = {
        ...state.days, [arrIndex]: daySpots
      }
      
      const days = Object.values(daysSpots)

      const appointment = {
        ...state.appointments[action.id], interview: action.interview
      }
      
      const appointments = {
        ...state.appointments, [action.id]: appointment
      }
      return {...state, appointments: appointments, days: days};
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
    
}

export { SET_DAY, FETCH_DATA, SAVE_APPOINTMENT, DELETE_APPOINTMENT, SET_INTERVIEW }
