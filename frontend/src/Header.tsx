import { ScrollText, HelpCircle, LandPlot, LineChart, LogIn } from "lucide-react"
import { useContext } from "react"
import { AuthDialogContext } from "./AuthDialog"

export default function Header() {
    const authDialog = useContext(AuthDialogContext);

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
                    <a 
                        className="hover:text-ring text-muted-foreground flex items-center gap-2 transition-colors" href="#"
                        onClick={(e) => { 
                            e.preventDefault();
                            authDialog?.setOpen(!authDialog.open);
                        }}>
                        Zaloguj się lub zarejestruj
                        <LogIn size={16} />
                    </a>
                </div>
            </div>
        </header>
    )
}