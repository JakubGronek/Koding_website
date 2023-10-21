import { ScrollText, HelpCircle, LandPlot, LineChart, LogIn, LogOut } from "lucide-react"
import { useContext } from "react"
import { AuthDialogContext } from "./AuthDialog"
import { useAuth } from "./useAuth";
import { Link, NavLink } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function Header() {
    const authDialog = useContext(AuthDialogContext);
    const { username, setAuth } = useAuth(); 

    const { toast } = useToast();

    const activeLink = ({ isActive }) => {
        return "flex items-center gap-2 transition-colors hover:text-ring" + " " 
            + (isActive ? "text-primary" : "text-muted-foreground" );
    }

    const logout = () => {
        toast({
            title: "Wylogowano z konta",
            description: 
                <>
                    Wylogowano z konta <b>{username}</b>
                </> 
        })

        setAuth("", "");
        
    }

    return (
        <header className="w-full h-14 border-b">
            <div className="flex items-center py-4 gap-16 max-w-screen-2xl h-full p-8 mx-auto">
                <div className="flex items-center text-lg gap-4 font-bold">
                    <LandPlot />
                    koding
                </div>


                <div className="flex items-center font-semibold gap-6 text-sm">
                    <NavLink className={activeLink} to="/tasks">
                        <ScrollText size={16} />
                        Zadania
                    </NavLink>
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
                    {
                        username == "" ? 
                            <a
                                className="hover:text-ring text-muted-foreground flex items-center gap-2 transition-colors" href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    authDialog?.setOpen(!authDialog.open);
                                }}>
                                Zaloguj się lub zarejestruj
                                <LogIn size={16} />
                            </a>
                        :
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <b>{username}</b>
                                <a href="#" onClick={logout} className="hover:text-ring  flex items-center gap-2 transition-colors">
                                    <LogOut size={16} />      
                                </a>
                            </div>
                    }
                    
                </div>
            </div>
        </header>
    )
}