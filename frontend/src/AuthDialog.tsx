import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ReactNode, createContext, useContext, useState } from "react"
import { API_BASE_URL } from "./globals";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./useAuth";

type LoginRegisterDialogActions = "login" | "register";
type LoginRegisterActionChangeFunction = ((desiredAction: LoginRegisterDialogActions) => void);

type AuthDialogForm = Record<string, string>;

function AuthDialogLogin({ onActionChange } : { onActionChange: LoginRegisterActionChangeFunction }) {
    const [form, setForm] = useState<AuthDialogForm>({
        username: "",
        password: "",
        repeatPassword: "",
    });

    const [pending, setPending] = useState<boolean>(false);

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const formCopy = Object.assign({}, form);
        formCopy[e.target.name] = e.target.value;
        setForm(formCopy);
    }

    const { toast } = useToast();
    const { setAuth } = useAuth();
    const authDialog = useContext(AuthDialogContext);

    const onSubmit = async () => {
        if (import.meta.env.DEV) setAuth("asd","def");
        if (pending) return;
        setPending(true);

        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password
            })
        });

        if (response.status === 400) { // BAD_REQUEST
            toast({
                title: "Wystąpił bląd!",
                description: "Prosze sprawdzic poprawnosc formularza i sprobowac ponownie.",
                variant: "destructive"
            })
        } else if (response.status === 401) { // IM_USED
            toast({
                title: "Wystąpił bląd!",
                description: "Wprowadzono nieprawidłowe dane.",
                variant: "destructive"
            })
        } else if (response.status === 200) { // OK
            toast({
                title: "Zalogowano!",
                description: "Witaj ponownie na Koding'u :)",
            })

            authDialog?.setOpen(false);
            const body = await response.json();
            setAuth(body.token, form.username);
        }

        setPending(false);
    }

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
                    <Input onChange={onInputChange} name="username" type="text" />
                </div>
                <div>
                    <span className="text-sm text-muted-foreground">Hasło</span>
                    <Input onChange={onInputChange} name="password" type="password" />
                </div>
            </div>
            <DialogFooter>
                <Button variant="link" className="mr-auto px-0"
                    onClick={() => onActionChange("register")}>Nie masz konta? Zarejestruj się</Button>
                <Button onClick={onSubmit} disabled={pending} >Wyślij</Button>
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

    const [pending, setPending] = useState<boolean>(false);

    const onInputChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const formCopy = Object.assign({}, form);
        formCopy[e.target.name] = e.target.value;
        setForm(formCopy);
    }

    const { toast } = useToast();
    const authDialog = useContext(AuthDialogContext);
    
    const onSubmit = async () => {
        if (pending) return;
        setPending(true);
        
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password
            })
        });

        if (response.status === 400) { // BAD_REQUEST
            toast({
                title: "Wystąpił bląd!",
                description: "Prosze sprawdzic poprawnosc formularza i sprobowac ponownie.",
                variant: "destructive"
            })
        } else if (response.status === 226) { // IM_USED
            toast({
                title: "Wystąpił bląd!",
                description: "Uzytkownik z taką nazwą juz istnieje.",
                variant: "destructive"
            })
        } else if (response.status === 201) { // OK
            toast({
                title: "Stworzono twoje konto",
                description: "Mozesz sie teraz zalogowac.",
            })

            authDialog?.setOpen(false);
        }

        setPending(false);
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

                <Button onClick={onSubmit} disabled={pending}>Wyślij</Button>
            </DialogFooter>
        </DialogContent>
    )
}


function AuthDialog({ open, onOpenChange } : { open: boolean, onOpenChange?: (open: boolean) => void }) {
    const [action, setAction] = useState<LoginRegisterDialogActions>("login");

    const onDialogOpenChange = (dialogOpen: boolean) => {;
        if (dialogOpen) {
            //console.log("login");
            setAction("login");
        }
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