import { createContext } from "react";
import { APIFormContextType } from "./RESTForm";

const APIFormContext = createContext<APIFormContextType>(null);

export default APIFormContext;