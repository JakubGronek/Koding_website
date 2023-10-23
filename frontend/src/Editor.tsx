import { Button } from "@/components/ui/button";


import { Textarea } from "@/components/ui/textarea"
import { TasksContext } from "./TasksContext";
import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Play } from "lucide-react";


function EditorButtons() {
    return (
        <>
            <Button>
                <Play size={16} className="mr-2" />
                Run
            </Button>
        </>
    )
}


function Editor() {
    const { tasks } = useContext(TasksContext);
    const { toast } = useToast();
    const { id } = useParams();

    const task = tasks.find((t) => t.id.toString() === id);

    if (!task) {
        toast({
            title: "Zadanie nie istnieje",
            description: "Przekierowano na liste zadan.",
            variant: "destructive"
        });
        return <Navigate to="/tasks" />
    }

    return (
        <div className="grid gap-4 flex-1 p-8 max-w-screen-2xl w-full mx-auto editor-grid">
            <div className="row-span-1 col-span-3">
                <div className="flex ml-auto w-fit gap-2">
                    <EditorButtons />
                </div>
            </div>
            <div className="flex flex-col row-span-2">
                <span className="text-sm text-muted-foreground">OPIS ZADANIA</span>
                <div className="flex-1 border p-4 rounded-md">
                    <div className="mb-4">
                        <span className="text-lg font-extrabold mr-2 text-muted-foreground">#{id}</span>
                        <h1 className="text-lg font-extrabold inline">
                            {task.name}
                        </h1>
                    </div>
                    <div>
                        <p className="mb-4">{task.desc}</p>
                        <b>Przykladowe dane wejsciowe:</b>
                        <div className="py-1 px-3 bg-zinc-900 rounded-md border mt-2 mb-4">
                            <code className="text-sm">3 7 2 8 5</code>
                        </div>
                        <b>Oczekiwane dane wyjsciowe:</b>
                        <div className="py-1 px-3 bg-zinc-900 rounded-md border mt-2 mb-4">
                            <code className="text-sm">3 7 2 8 5</code>
                        </div>
                        <b>Powodzenia!</b>
                    </div>
                </div>
            </div>
            <div className="flex flex-col col-span-2">
                <span className="text-sm text-muted-foreground">KOD</span>
                <Textarea className="flex-1" />
            </div>
            <div className="flex flex-col col-span-2">
                <span className="text-sm text-muted-foreground">KONSOLA</span>
                <code className="flex-1 border p-4 rounded-md">
                    <br />
                </code>
            </div>
        </div>
    )
}

export default Editor;