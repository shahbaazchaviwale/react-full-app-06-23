import { useCallback, useReducer } from "react";
import { status } from "../constants";

const  httpReducer = (state: any, action: any) => {

  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: status.pending,
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: status.completed,
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: status.error,
    };
  }

  return state;
};


const useHttp = (requestFunction: any, startWithPending = false) =>{

  const initState = {
    data: null,
    status: startWithPending ? status.pending : null,
    error: null,
  };

  const [httpState, dispatch] = useReducer(httpReducer, initState);

  const sendRequest = useCallback(
    async function (requestData: any) {

        dispatch({type: "SEND"});
        
        try{
          const responseData = await requestFunction(requestData);
          dispatch({type: "SUCCESS", responseData});

        }catch(error: any){
          dispatch({type: "ERROR", errorMessage: error.message || "something went wrong!" });
        }

    }, [requestFunction]
  );

  return {
    sendRequest,
    ...httpState
  }
};


export default useHttp;