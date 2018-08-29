import { TEST_DISPATCH } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
}

export default function(state = initialState, action) {
  switch(action.type){
    case TEST_DISPATCH:
      return {  //どのようにstoreの値(initialState)が変化するのかを記入
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}
