import { forwardRef, useContext, useEffect } from "react"
import RESTFormContext from "./RESTFormContext";
import { Input } from "@/components/ui/input";

interface RESTInputProps extends React.ComponentPropsWithoutRef<"input"> {
    name: string,
    type: string,
    include?: boolean
}

const RESTInput = forwardRef<HTMLInputElement, RESTInputProps>((props, forwardedRef) => {
    const { name, type, include, ...rest } = props;
    const { setFormValue, pending, form } = useContext(RESTFormContext);

    const val = form[name] ? form[name] : "";

    useEffect(() => {
        setFormValue(name, val);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (include !== false) {
            setFormValue(name, e.target.value);
        }
    }

    return <Input ref={forwardedRef} disabled={pending} value={val} type={type} name={name} {...rest} onChange={changeHandler} />
})

export default RESTInput;