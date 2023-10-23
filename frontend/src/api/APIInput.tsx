import { forwardRef, useContext } from "react"
import APIFormContext from "./APIFormContext";

interface APIInputProps {
    name: string,
    type: string,
}


const APIInput = forwardRef<HTMLElement, APIInputProps>((props, forwardedRef) => {
    const {name, type, ...rest} = props;
    const { setFormValue, pending, form } = useContext(APIFormContext);

    const val = form[name] ? form[name] : "";

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormValue(name, e.target.value);
    }


    return <input value={val} type={type} name={name} {...rest} onChange={changeHandler} />
})