

import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';



const initial = {
  Data: [],
  Error: "",
  Loading: false
};

const Reducer = (state = initial, action) => {
  switch(action.type) {
    case "Requesting Data":
      return { ...state, Loading: true };
    case "Data Fetching Success":
      return { Loading: false, Error: "", Data: action.payload };
    case "Data Fetching Failed":
      return { ...state, Loading: false, Error: action.payload };
    default:
      return state;
  }
};

// Async action
export function fetchData() {
  return async function(dispatch) {
    dispatch({ type: "Requesting Data" });

    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      dispatch({ type: "Data Fetching Success", payload: res.data });
    } catch(err) {
      dispatch({ type: "Data Fetching Failed", payload: err.message });
    }
  }
};

const loggerMiddleware=(store)=>(next)=>(action)=>{
  console.log("Dispatch",action);
  const res=next(action);
  console.log("Next state", store.getState());
  return res;
}

const store = configureStore({reducer: Reducer,
                              middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(loggerMiddleware),
                              devTools:true
                            });

export default store;

