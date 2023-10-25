import { forwardRef, useContext } from "react";
import RESTFormContext from "./RESTFormContext";
import { Button } from "@/components/ui/button";

const RESTSubmit = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(({ children }, forwardedRef) => {
    const { submitForm, pending } = useContext(RESTFormContext);

    return (
        <Button ref={forwardedRef} disabled={pending} onClick={submitForm}>
            {children}
        </Button>
    );
})

export default RESTSubmit;