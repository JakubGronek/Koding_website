import { useState } from "react";
import { useAuth } from "../useAuth";
import APIFormContext from "./APIFormContext";

export interface APIFormCallResult {
    success: boolean,
    status: number,
    outData: unknown
}

export interface APIFormProps {
    action: string,
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    credentials?: "include",
    onCallComplete?: (callResult: APIFormCallResult) => void
}

export interface APICallProps extends APIFormProps {
    data: Map<string, unknown>,
    token: string
}

export interface APIFormContextType {
    form: Map<string, unknown>,
    pending: boolean,
    setFormValue: (key: string, value: string) => void,
    submitForm: () => void,
}



async function callRemoteAPI({ action, method = "GET", credentials, token, data, onCallComplete }: APICallProps) {
    const body = Object.assign({}, data);

    if (credentials === "include")
        body["token"] = token;

    const res = await fetch(action, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const resOut = await res.json();
    const callResult: APIFormCallResult = {
        success: res.ok,
        status: res.status,
        outData: resOut
    }

    onCallComplete(callResult);
}

function APIForm({ action, method = "GET" , credentials, onCallComplete, children }: React.PropsWithChildren<APIFormProps>) {
    const [ form, setForm ] = useState<Map<string, unknown>>();
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
        callRemoteAPI({ action, method, credentials, token, data: form, onCallComplete: (callResult) => {
            setPending(false);
            onCallComplete(callResult);
        }, });
    }

    return (
        <>
            <APIFormContext.Provider value={{
                form,
                pending,
                setFormValue,
                submitForm
            }}>
                {children}
            </APIFormContext.Provider>
        </>
    );
}

export default APIForm;