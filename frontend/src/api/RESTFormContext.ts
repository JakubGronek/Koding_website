import { createContext } from "react";
import { RESTFormContextType } from "./RESTForm";

const APIFormContext = createContext<RESTFormContextType>(null);

export default APIFormContext;