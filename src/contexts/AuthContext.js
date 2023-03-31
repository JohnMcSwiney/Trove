import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // console.log(action.payload.id);
      // if(!id){
      //   setId(action.payload.id);
      // }
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const updateId = (idIn) => {
    setId(idIn);
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user }); 
    }
  }, []);
    if(state.user && !id){
      updateId(state.user.id);
    }

  return (
    <AuthContext.Provider value={{ ...state, dispatch,id }}>
      {children}
    </AuthContext.Provider>
  );
};
