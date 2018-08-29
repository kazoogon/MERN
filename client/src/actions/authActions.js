import { GET_ERRORS,SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>  //reactだけだったらsetStatesでerrorに値入れ取ったとこ
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login get user token
export const loginUser = userData => dispatch =>{
  axios.post('/api/users/login', userData)
    .then(res =>{
      // save to loaclstorage
      const { token } = res.data;
      // set token to local loaclstorage
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);

      //decode token to get user user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//set logged in user
export const setCurrentUser = (decode) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
