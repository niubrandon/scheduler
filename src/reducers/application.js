const SET_DAY = "SET_DAY";
const FETCH_DATA = "FETCH_DATA";
const SAVE_APPOINTMENT = "SAVE_APPOINTMENT";
const DELETE_APPOINTMENT = "DELETE_APPOINTMENT";

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
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
    
}

export { SET_DAY, FETCH_DATA, SAVE_APPOINTMENT, DELETE_APPOINTMENT }
