import { createContext } from "react";
import { APIFormContextType } from "./APIForm";

const APIFormContext = createContext<APIFormContextType>(null);

export default APIFormContext;