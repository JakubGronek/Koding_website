import { Button } from "@/components/ui/button";
import { Book, ChevronRight, Goal, History } from "lucide-react";
import { useContext } from "react";
import { TasksContext } from "./TasksContext";
import { Link, useParams } from "react-router-dom";

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
                <Link to={"/editor/" + id}>
                    <Button variant="outline">
                        Przejdź do zadania
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}


function Tasks() {
    let { tasks } = useContext(TasksContext);
    const { view } = useParams();

    const pointsMax = tasks.reduce<number>((p, n) => {
        return p + n.points;
    }, 0);

    const pointsCollected = tasks.reduce<number>((p, n) => {
        return p + (n.completed ? n.points : 0);
    }, 0);

    const countFinished = tasks.filter((t) => t.completed).length;
    const countAll = tasks.length;

    if (view) {
        if (view === "new") {
            tasks = tasks.filter((t) => !t.completed);
        } else if (view === "done") {
            tasks = tasks.filter((t) => t.completed);
        }
    }
    return (
        <div className="p-8 max-w-screen-2xl w-full mx-auto">
            <div className="flex flex-row mb-16">
                <div>
                    <h1 className="text-3xl font-extrabold">Zadania</h1>
                    <span className="text-xl text-muted-foreground">Ukończyłeś {countFinished}/{countAll} zadań.</span>
                    <div className="flex flex-row gap-2 mt-4">
                        <Link to="/tasks/new">
                            <Button variant={view === "new" ? "secondary" : "outline"} size="lg" className="w-fit h-8 px-4 text-sm font-bold flex gap-4">
                                <Goal size={12} />
                                Nowe
                            </Button>
                        </Link>
                        <Link to="/tasks/done">
                            <Button variant={view === "done" ? "secondary" : "outline"} size="lg" className="w-fit h-8 px-4 text-sm font-bold flex gap-4">
                                <History size={12} />
                                Wykonane
                            </Button>
                        </Link>
                        <Link to="/tasks">
                            <Button variant={!view ? "secondary" : "outline"} size="lg" className="w-fit h-8 px-4 text-sm font-bold flex gap-4">
                                <Book size={12} />
                                Wszystkie
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="ml-auto my-auto">
                    <span className="block text-muted-foreground">Zdobyłeś</span>
                    <span className="text-xl font-bold text-amber-500">{pointsCollected}/{pointsMax} </span>
                    <span className="text-muted-foreground">pkt.</span>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {tasks.map((task) => {
                    return <Task key={task.id} id={task.id} name={task.name} desc={task.short} done={task.completed} points={task.points} />
                })}
            </div>
        </div>
    )
}

export default Tasks;