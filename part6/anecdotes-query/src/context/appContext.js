import { createContext, useReducer } from "react";

const appReducer = (state, action) => {
  console.log("reaches reducer", action);
  switch (action.type) {
    case "ADD":
      state = `Successfuly added: '${action.payload}'`;
      return state;
    case "VOTE":
      state = `You voted for: '${action.payload}'`;
      return state;

    default:
      return state;
  }
};

const AppContext = createContext();
export const AppContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(
    appReducer,
    "Hello from appReducer"
  );
  return (
    <AppContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
