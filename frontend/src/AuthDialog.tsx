import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ReactNode, createContext, useState } from "react"
import { API_BASE_URL } from "./globals";

type LoginRegisterDialogActions = "login" | "register";
type LoginRegisterActionChangeFunction = ((desiredAction: LoginRegisterDialogActions) => void);

type AuthDialogForm = Record<string, string>;

function AuthDialogLogin({ onActionChange } : { onActionChange: LoginRegisterActionChangeFunction }) {
    return (
        <DialogContent className="max-w-[420px]">
            <DialogHeader>
                <DialogTitle>
                    Logowanie
                </DialogTitle>
                <DialogDescription>
                    Zaloguj się uzywając swojej nazwy uzytkownika i hasła.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 my-4">
                <div>
                    <span className="text-sm text-muted-foreground">Nazwa uzytkownika</span>
                    <Input type="text" />
                </div>
                <div>
                    <span className="text-sm text-muted-foreground">Hasło</span>
                    <Input type="text" />
                </div>
            </div>
            <DialogFooter>
                <Button variant="link" className="mr-auto px-0"
                    onClick={() => onActionChange("register")}>Nie masz konta? Zarejestruj się</Button>
                <Button>Wyślij</Button>
            </DialogFooter>
        </DialogContent>
    )
}


function AuthDialogRegister({ onActionChange } : { onActionChange: LoginRegisterActionChangeFunction }) {
    const [form, setForm] = useState<AuthDialogForm>({
        username: "",
        password: "",
        repeatPassword: "",
    });

    const [pending, setPending] = useState<boolean>(true);

    const onInputChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const formCopy = Object.assign({}, form);
        formCopy[e.target.name] = e.target.value;
        setForm(formCopy);
    }

    const onSubmit = async () => {
        if (pending) return;
        setPending(true);
        
        fetch("/auth/register", {

        })
    }

    return (
        <DialogContent className="max-w-[420px]">
            <DialogHeader>
                <DialogTitle>
                    Rejestracja
                </DialogTitle>
                <DialogDescription>
                    Witaj na koding'u! Zarejestruj się uzywając ponizszego formularza.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 my-4">
                <div>
                    <span className="text-sm text-muted-foreground">Nazwa uzytkownika</span>
                    <Input onChange={onInputChange} name="username" type="text" />
                </div>
                <div>
                    <span className="text-sm text-muted-foreground">Hasło</span>
                    <Input onChange={onInputChange} name="password" type="password" />
                </div>
                <div>
                    <span className="text-sm text-muted-foreground">Powtórz hasło</span>
                    <Input onChange={onInputChange} name="repeatPassword" type="password" />
                </div>
            </div>
            <DialogFooter>
                <Button variant="link" className="mr-auto px-0"
                    onClick={() => onActionChange("login")}>Masz juz konto? Zaloguj się</Button>

                <Button disabled={pending}>Wyślij</Button>
            </DialogFooter>
        </DialogContent>
    )
}


function AuthDialog({ open, onOpenChange } : { open: boolean, onOpenChange?: (open: boolean) => void }) {
    const [action, setAction] = useState<LoginRegisterDialogActions>("login");

    const onDialogOpenChange = (dialogOpen: boolean) => {
        if (dialogOpen) setAction("login");
        if (onOpenChange) onOpenChange(dialogOpen);
    }

    let content : ReactNode;
    if (action === "login") {
        content = <AuthDialogLogin onActionChange={setAction} />;
    }
    else if (action === "register") {
        content = <AuthDialogRegister onActionChange={setAction} />;
    }

    return (
        <Dialog open={open} onOpenChange={onDialogOpenChange}>
            {content}
        </Dialog>
    );
}

type AuthDialogContextType = {
    open: boolean,
    setOpen: (b: boolean) => void
} | null;

const AuthDialogContext = createContext<AuthDialogContextType>(null);

export { AuthDialog, AuthDialogContext };