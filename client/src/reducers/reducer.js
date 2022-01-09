// const reducer = (state = 0, action) => {
//     if (action.type === 'INCREMENT') {
//       return state + 1;
//     } else if (action.type === 'DECREMENT') {
//       return state - 1;
//     }
  
//     return state;
// };
// const INITIAL_STATE = {
// 	counter: 0
// }

// export default (state = INITIAL_STATE, action={}) => {
// 	switch(action.type) {
// 		case "INCREMENT":
// 			return {
// 				...state.counter + 1,
// 			};
//         case "DECREMENT":
//             return {
//                 ...state.counter - 1,
//             };
// 		default:
// 			return state;
// 	}
// };

const listReducer = (state = {}, action) => {
    // Clone state object
    const newState = Object.assign({}, state);
    // Look for type set in the actions file
    // these types should be as unique as possible
    switch (action.type) {
      case "USER_LIST":
        console.log(action.payload)
        // Generate random key and populate with default object.
        // Payload is set in the actions file
        // newState[
        //   Math.random()
        //     .toString(36)
        //     .replace(/[^a-z]+/g, "")
        // ] = {
        //   complete: false,
        //   label: action.payload
        // };
        state = {
          ...state,
          ...action.payload
        }
        break;
      default:
        break;
    }
  
    // return the modified state
    return state;
  };
  
  export default listReducer;