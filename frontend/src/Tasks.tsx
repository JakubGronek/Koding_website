import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface TaskProps {
    id: number
    name: string,
    desc: string,
    done: boolean,
    points: number,
}

function Task({ id, name, desc, done, points } : TaskProps) {
    const dotClass = done ? "bg-green-600" : "bg-destructive";

    return (
        <div className="flex flex-row p-4 rounded-md border">
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold text-muted-foreground">
                    #{id}
                    <span className="text-primary"> {name}</span>
                </h1>
                <p>{desc}</p>
                <div className="flex flex-row gap-2 items-center">
                    <span className={"inline-block w-2 h-2 rounded-full " + dotClass}></span>
                    <span className="text-muted-foreground text-sm">
                        {
                            done ?
                                "Wykonane (zdobyto " + points + " pkt.)"
                                : "Niewykonane (" + points + " pkt. do zdobycia)"
                        }
                    </span>
                </div>
            </div>
            <div className="flex flex-row ml-auto justify-end w-64">
                <Button variant="outline">
                    Przejdź do zadania
                    <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}

function Tasks() {
    return (
        <div className="p-8 max-w-screen-2xl w-full mx-auto">
            <div className="flex flex-row mb-16">
                <div>
                    <h1 className="text-3xl font-extrabold">Zadania</h1>
                    <span className="text-xl text-muted-foreground">Ukończyłeś 1/15 zadań.</span>
                </div>
                <div className="ml-auto my-auto">
                    <span className="block text-muted-foreground">Zdobyłeś</span>
                    <span className="text-xl font-bold text-amber-500">30/230 </span>
                    <span className="text-muted-foreground">pkt.</span>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <Task id={1} name="Sortowanie" desc={"Napisz algorytm sortujący"} done={false} points={20} />
                <Task id={1} name="Ciąg Fibonacciego" desc={"Napisz algorytm, który wygeneruje i-ty wyraz ciągu Fibonacciego"} done={true} points={30} />
            </div>
        </div>
    )
}

export default Tasks;