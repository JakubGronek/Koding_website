import { API_BASE_URL } from "../globals";
import { RESTFormCallResult, RESTFormProps } from "./RESTForm";

const DEFAULT_DELAY_TOLERANCE = 3000;

export interface RESTCallProps extends RESTFormProps {
    data: Map<string, unknown>,
    token: string
}

export async function callRemoteREST({ action, method = "GET", credentials = "include", token, data, delayTolerance = DEFAULT_DELAY_TOLERANCE, onComplete, onDelayed }: RESTCallProps) {
    const body = Object.assign({}, data);

    const tID = setTimeout(() => {
        if (onDelayed) onDelayed();
    }, delayTolerance)

    const res = await fetch(API_BASE_URL + action, {
        method,
        headers: {
            "Content-Type": "application/json",
            "token": credentials === "include" ? token : null
        },
        body: JSON.stringify(body)
    });

    clearTimeout(tID);

    let resOut = {};

    try {
        resOut = await res.json();
    } catch(e) {
        resOut;
    }

    const callResult: RESTFormCallResult = {
        success: res.ok,
        status: res.status,
        outData: resOut
    }
    
    if (onComplete) onComplete(callResult);
}