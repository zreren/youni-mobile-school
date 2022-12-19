import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    error: null,
  };
  
export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.token,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          token: null,
          error: action.error,
        };
      default:
        return state;
    }
  };