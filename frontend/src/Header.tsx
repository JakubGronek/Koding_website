import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollText, HelpCircle, LandPlot, LineChart, LogIn } from "lucide-react"
import { useState } from "react"

type LoginRegisterDialogActions = "login" | "register";

function LoginRegisterDialogContent({ action, onActionChange } 
        : { action: LoginRegisterDialogActions, onActionChange : ((desiredAction: LoginRegisterDialogActions) => void | undefined ) }) {
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

function LoginRegisterDialog() {
    const [ action, setAction ] = useState<LoginRegisterDialogActions>("login");

    return (
        <Dialog onOpenChange={(open) => { open ? setAction("login") : null }}>
            <DialogTrigger asChild>
                <a className="hover:text-ring text-muted-foreground flex items-center gap-2 transition-colors" href="#">
                    Zaloguj się lub zarejestruj
                    <LogIn size={16} />
                </a>
            </DialogTrigger>
            <LoginRegisterDialogContent action={action} onActionChange={(desiredAction) => setAction(desiredAction)} />
        </Dialog>
    );
}

export default function Header() {
    return (
        <header className="w-full h-14 border-b">
            <div className="flex items-center py-4 gap-16 max-w-screen-2xl h-full p-8 mx-auto">
                <div className="flex items-center text-lg gap-4 font-bold">
                    <LandPlot />
                    koding
                </div>


                <div className="flex items-center font-semibold gap-6 text-sm">
                    <a className="hover:text-ring text-muted-foreground flex items-center gap-2 transition-colors" href="#">
                        <ScrollText size={16} />
                        Zadania
                    </a>
                    <a className="hover:text-ring text-muted-foreground flex items-center gap-2 transition-colors" href="#">
                        <LineChart size={16} />
                        Statystyki
                    </a>
                    <a className="hover:text-ring text-muted-foreground flex items-center gap-2 transition-colors" href="#">
                        <HelpCircle size={16} />
                        Pomoc
                    </a>
                </div>
                <div className="flex items-center font-semibold gap-6 ml-auto text-sm">
                    <LoginRegisterDialog />
                </div>
            </div>
        </header>
    )
}