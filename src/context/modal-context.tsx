import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

interface ContextType {
  isShown: boolean;
  message: string | null;
  handleShowModal: (message: string) => void;
  handleCloseModal: () => void;
}
type StateType = {
  isShown: boolean;
  message: string | null;
};
type ActionType = {
  type: "modal/show" | "modal/close";
  payload: string | null;
};

const initialState: ContextType = {
  isShown: false,
  message: null,
  handleShowModal: () => {},
  handleCloseModal: () => {},
};

const ModalContext = createContext(initialState);

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "modal/show":
      return { isShown: true, message: action.payload };
    case "modal/close":
      return { isShown: false, message: null };
    default:
      return state;
  }
}

function ModalContextProvider({ children }: { children?: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isShown, message } = state;

  const handleShowModal = useCallback(function (message: string) {
    dispatch({ type: "modal/show", payload: message });
  }, []);

  const handleCloseModal = useCallback(function () {
    dispatch({ type: "modal/close", payload: null });
  }, []);

  return (
    <ModalContext.Provider
      value={{ isShown, handleShowModal, handleCloseModal, message }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;

export function useModalContext() {
  const context = useContext(ModalContext);
  return context;
}
