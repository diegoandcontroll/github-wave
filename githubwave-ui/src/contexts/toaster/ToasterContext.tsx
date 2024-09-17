'use client'
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { FaGithub, FaTimes } from "react-icons/fa";
import styles from "./toaster.module.css";

type ToasterState = {
  messages: Array<{ id: number; text: string }>;
};

type ToasterAction =
  | { type: "ADD_MESSAGE"; text: string }
  | { type: "REMOVE_MESSAGE"; id: number };

type ToasterContextType = {
  dispatch: React.Dispatch<ToasterAction>;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

const toasterReducer = (
  state: ToasterState,
  action: ToasterAction
): ToasterState => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        messages: [...state.messages, { id: Date.now(), text: action.text }],
      };
    case "REMOVE_MESSAGE":
      return {
        messages: state.messages.filter((message) => message.id !== action.id),
      };
    default:
      return state;
  }
};

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(toasterReducer, { messages: [] });

  return (
    <ToasterContext.Provider value={{ dispatch }}>
      {children}
      <div className={styles.toasterContainer}>
        {state.messages.map((message) => (
          <div key={message.id} className={`${styles.toasterMessage}`}>
            <FaGithub className={styles.toasterMessageIcon} />
            {message.text}
            <FaTimes
              className={styles.toasterMessageClose}
              onClick={() =>
                dispatch({ type: "REMOVE_MESSAGE", id: message.id })
              }
            />
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (context === undefined) {
    throw new Error("Hook bad used");
  }
  return context;
};
