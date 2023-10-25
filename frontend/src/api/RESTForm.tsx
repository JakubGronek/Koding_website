import { useState } from "react";
import { useAuth } from "../useAuth";
import RESTFormContext from "./RESTFormContext";
import { callRemoteREST } from "./RESTCallRemote";



export interface RESTFormCallResult {
    success: boolean,
    status: number,
    outData: unknown
}

export interface RESTFormProps {
    action: string,
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    credentials?: "include",

    onComplete?: (callResult: RESTFormCallResult) => void,

    delayTolerance?: number
    onDelayed?: () => void
}



export interface RESTFormContextType {
    form: Map<string, unknown>,
    pending: boolean,
    setFormValue: (key: string, value: string) => void,
    submitForm: () => void,
}


function RESTForm({ action, method = "GET", credentials, onComplete, onDelayed, children }: React.PropsWithChildren<RESTFormProps>) {
    const [ form, setForm ] = useState<Map<string, unknown>>(new Map<string, unknown>());
    const [ pending, setPending ] = useState<boolean>(false);

    const { token } = useAuth();

    const setFormValue = (key: string, value: string) => {
        setForm({
            [key]: value,
            ...form
        })
    }

    const submitForm = () => {
        setPending(true);
        callRemoteREST({ action, method, credentials, token, data: form, onComplete: (callResult) => {
            setPending(false);
            onComplete(callResult);
        }, onDelayed });
    }

    return (
        <>
            <RESTFormContext.Provider value={{
                form,
                pending,
                setFormValue,
                submitForm
            }}>
                {children}
            </RESTFormContext.Provider>
        </>
    );
}

export default RESTForm;