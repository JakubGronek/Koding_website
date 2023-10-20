import { Button } from "@/components/ui/button";
import { GraduationCap, ListChecks, Swords } from "lucide-react";
import { useContext } from "react";
import { AuthDialogContext } from "./AuthDialog";

function Landing() {
    const authDialog = useContext(AuthDialogContext);

    return (
        <div className="flex flex-col py-48 px-8 gap-64 max-w-screen-xl w-full mx-auto">
            <div className="flex flex-row">
                <div>
                    <h1 className="text-[64px] font-extrabold">
                        Koding
                    </h1>
                    <span className="text-lg">Zadania łatwe, proste i przyjemne.</span>
                </div>
                <div className="flex flex-col w-[260px] ml-auto justify-center gap-2">
                    <span className="text-muted-foreground text-center">Aby zacząć zaloguj się: </span>
                    <Button 
                        variant="outline" className="h-fit text-md font-bold"
                        onClick={(e) => {
                            e.preventDefault();
                            authDialog?.setOpen(!authDialog.open);
                        }}>Zaloguj się lub zarejestruj</Button>
                </div>
            </div>
            <div className="flex flex-row gap-32">
                <div className="flex-1 flex flex-col items-center gap-8 w-64">
                    <div className="flex justify-center items-center w-32 h-32 rounded-full border">
                        <GraduationCap className="w-12 h-12" /> 
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl font-bold block">Zdobywaj wiedzę</h1>
                        <span>Tutaj nauczysz się zaawansowanych algorytmów i zgłębisz tajemnice programowania.</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-8 w-64">
                    <div className="flex justify-center items-center w-32 h-32 rounded-full border">
                        <ListChecks className="w-12 h-12" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl font-bold block">Wykonuj zadania</h1>
                        <span>Sprawdź swoją wiedzę poprzez zastosowanie jej w praktyce.</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-8 w-64">
                    <div className="flex justify-center items-center w-32 h-32 rounded-full border">
                        <Swords className="w-12 h-12" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl font-bold block">Rywalizuj</h1>
                        <span>Zdobywaj punkty i rywalizuj w rankingu z innymi uzytkownikami.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;