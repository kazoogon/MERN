import axios from 'axios';

//headerにtokenの値をもたせましょー　の関数
const setAuthToken = token => {
  if(token){
    //apply to every request
    axios.defaults.headers.common['Authorization'] = token //postmanでやったtokenのvalue収めるkey
  }else{
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;
