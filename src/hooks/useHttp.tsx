/*Single big hook for all requests, personally I don't like this  */
import { useCallback, useReducer } from "react";
import { https } from "../helpers/apis";

interface ValueType {
  method: "GET" | "POST" | "DELETE";
  formData?: { title: string; amount: number };
  id?: string;
  searchValue?: string;
}
interface ReducerType {
  error: string | null;
  isLoading: boolean;
  sendRequest?: ({ method, formData, id, searchValue }: ValueType) => void;
}
interface StateType {
  error: string | null;
  isLoading: boolean;
}
interface ActionType {
  type: "http/send" | "http/error" | "http/response" | "http/clear";
  payload: string | null;
}

const initialState: ReducerType = {
  error: null,
  isLoading: false,
  sendRequest: () => {},
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "http/send":
      return { ...state, isLoading: true };
    case "http/response":
      return { ...state, isLoading: false };
    case "http/error":
      return { ...state, error: action.payload, isLoading: false };
    case "http/clear":
      return { ...state, error: null };
    default:
      throw new Error("Unknow Action");
  }
}

export default function useHttp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { error, isLoading } = state;

  const sendRequest = useCallback(async function ({
    method,
    formData,
    id,
    searchValue,
  }: ValueType) {
    dispatch({ type: "http/send", payload: null });
    if (method === "GET") {
      const { data, error } = await https({ method, searchValue });
      if (error) {
        dispatch({ type: "http/error", payload: "Fetching data failed!" });
      } else {
        dispatch({ type: "http/response", payload: null });
        return data;
      }
    }
    if (method === "POST") {
      const { error, data } = await https({ method: "POST", body: formData });
      if (error) {
        dispatch({
          type: "http/error",
          payload: "Creating new ingredient failed!",
        });
      } else {
        dispatch({ type: "http/response", payload: null });
      }
      return data;
    }
    if (method === "DELETE") {
      const { error, data } = await https({ method: "DELETE", id });
      if (error) {
        dispatch({
          type: "http/error",
          payload: "Deleting ingredient failed!",
        });
      } else {
        dispatch({ type: "http/response", payload: null });
      }
      return data;
    }
  },
  []);

  function handleClear() {
    dispatch({ type: "http/clear", payload: null });
  }

  return {
    error,
    isLoading,
    sendRequest,
    handleClear,
  };
}
