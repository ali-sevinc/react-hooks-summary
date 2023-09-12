import { ReactNode, createContext, useReducer, useContext } from "react";

interface ReducerType {
  isAuth: boolean;
  handleLogin?: () => void;
  handleLogout?: () => void;
}
interface ActionType {
  type: "auth/login" | "auth/logout";
}

const initialState: ReducerType = {
  isAuth: false,
};

const AuthContext = createContext(initialState);

function reducer(_: ReducerType, action: ActionType) {
  switch (action.type) {
    case "auth/login":
      return { isAuth: true };
    case "auth/logout":
      return { isAuth: false };
    default:
      throw new Error("unknown action!");
  }
}

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuth } = state;

  function handleLogin() {
    dispatch({ type: "auth/login" });
  }
  function handleLogout() {
    dispatch({ type: "auth/logout" });
  }

  return (
    <AuthContext.Provider value={{ isAuth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
