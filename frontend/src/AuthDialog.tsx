import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { createContext, useState } from "react"

type LoginRegisterDialogActions = "login" | "register";

function AuthDialogContent({ action, onActionChange }
    : { action: LoginRegisterDialogActions, onActionChange: ((desiredAction: LoginRegisterDialogActions) => void | undefined) }) {
    if (action === "login") {
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
    else if (action === "register") {
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
                        <Input type="text" />
                    </div>
                    <div>
                        <span className="text-sm text-muted-foreground">Hasło</span>
                        <Input type="password" />
                    </div>
                    <div>
                        <span className="text-sm text-muted-foreground">Powtórz hasło</span>
                        <Input type="password" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="link" className="mr-auto px-0"
                        onClick={() => onActionChange("login")}>Masz juz konto? Zaloguj się</Button>

                    <Button>Wyślij</Button>
                </DialogFooter>
            </DialogContent>
        )
    }
}

function AuthDialog({ open, onOpenChange } : { open: boolean, onOpenChange?: (open: boolean) => void }) {
    const [action, setAction] = useState<LoginRegisterDialogActions>("login");

    const onDialogOpenChange = (dialogOpen: boolean) => {
        if (dialogOpen) setAction("login");
        if (onOpenChange) onOpenChange(dialogOpen);
    }

    return (
        <Dialog open={open} onOpenChange={onDialogOpenChange}>
            <AuthDialogContent action={action} onActionChange={(desiredAction) => setAction(desiredAction)} />
        </Dialog>
    );
}

type AuthDialogContextType = {
    open: boolean,
    setOpen: (b: boolean) => void
} | null;

const AuthDialogContext = createContext<AuthDialogContextType>(null);

export { AuthDialog, AuthDialogContext };