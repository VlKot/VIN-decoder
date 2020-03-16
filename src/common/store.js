import React from "react";
import { getAttributeAsArray, setAttribute } from "./localStorageFunc";

export const initialState = { previous: getAttributeAsArray("previous") };

export const reducer = (state, action) => {
  switch (action.type) {
   
    case "add":
      setAttribute("previous", action.value);
      return {
        previous: getAttributeAsArray("previous")
      };
   
    case "get":
      return {
        previous: getAttributeAsArray("previous")
      };

    default:
      return state;
  }
};

export const Context = React.createContext();
