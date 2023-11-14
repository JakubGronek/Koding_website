import { Button } from "@/components/ui/button";
import { TasksContext } from "./TasksContext";
import { useContext, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ArrowBigLeftDash, ArrowBigRightDash, Play, ScrollText } from "lucide-react";
import CodeEditor from "@uiw/react-textarea-code-editor"
import { API_BASE_URL } from "./globals";
import { useAuth } from "./useAuth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EditorDialogProps {
    onOpenChange: (open) => void,
    open: boolean,
    nextTaskId: number,
    points: number
}


function EditorTaskCompletedDialog({ onOpenChange, open, nextTaskId, points }: EditorDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-max">
                <DialogHeader>
                    <DialogTitle className="text-center">Swietnie!</DialogTitle>
                    <DialogDescription className="text-center">Zadanie wykonane poprawnie!</DialogDescription>
                </DialogHeader>
                <div className="my-4 h-8 text-center text-green-400">
                    +{points} punktow
                </div>
                <DialogFooter className="flex flex-row">
                    <Button className="flex-1" variant="outline"><ArrowBigLeftDash className="h-4 w-4 mr-2" /> Powrot</Button>
                    <Link to="/tasks" className="flex-1">
                        <Button className="w-full" variant="secondary"><ScrollText className="h-4 w-4 mr-2" /> Lista zadan</Button>
                    </Link>
                    {
                        typeof nextTaskId !== "undefined" ? <Link className="flex-1" to={"/tasks/"+nextTaskId}>
                            <Button className="w-full" variant="default">Nastepne <ArrowBigRightDash className="h-4 w-4 ml-2" /></Button>
                        </Link> : ""
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function Editor() {
    const { tasks, refreshTasks } = useContext(TasksContext);
    const { token } = useAuth();
    const { toast } = useToast();
    const { id } = useParams();

    const task = tasks.find((t) => t.id.toString() === id);
    const nextTask = tasks.find((t) => t.id === parseInt(id) + 1)?.id;

    const [ code, setCode ] = useState('print("hello!")');
    const [ output, setOutput ] = useState("Gotowy.");
    const [ pending, setPending ] = useState(false);
    const [ dialogOpen, setDialogOpen ] = useState(false);

    const consoleRef = useRef(null);

    if (!task) {
        return <Navigate to="/tasks" />
    }

    const submitCode = async () => {
        setPending(true);

        const res = await fetch(API_BASE_URL + "/api/tasks/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token
            },
            body: JSON.stringify({ code })
        });

        if (!res.ok) {
            toast({
                title: "Wystapil blad",
                description: res.statusText,
                variant: "destructive"
            })
        } else {
            const json = await res.json();
            
            if (json.success) {
                setDialogOpen(true);
            } else {
                toast({
                    title: "Zadanie wykonane niepoprawnie!",
                    description: "Sprawdz logi z wykonania w konsoli i popraw program"
                });
            }

            setOutput(json.output);

            setTimeout(() => {
                consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
            }, 30);
        }

        refreshTasks();
        setPending(false);
    }

    return (
        <>
            <EditorTaskCompletedDialog onOpenChange={setDialogOpen} open={dialogOpen} nextTaskId={nextTask} points={task.points} />
            <div className="grid gap-4 flex-1 p-8 max-w-screen-2xl w-full mx-auto editor-grid">
                <div className="row-span-1 col-span-3">
                    <div className="flex ml-auto w-fit gap-2">
                        <Button disabled={pending} onClick={submitCode}>
                            <Play size={16} className="mr-2" />
                            Run
                        </Button>
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
                                <code className="text-sm">{task.input}</code>
                            </div>
                            <b>Oczekiwane dane wyjsciowe:</b>
                            <div className="py-1 px-3 bg-zinc-900 rounded-md border mt-2 mb-4">
                                <code className="text-sm">{task.output}</code>
                            </div>
                            <b>Powodzenia!</b>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col row-span-1 col-span-2">
                    <span className="text-sm text-muted-foreground">KOD</span>
                    <CodeEditor
                        value={code}
                        disabled={pending}
                        language="python"
                        placeholder="Python code"
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-1 rounded-md border bg-background"
                        style={{
                            background: "hsl(var(--background)",
                            fontSize: 15
                        }} />
                </div>
                <div className="relative flex flex-col col-span-2 row-span-1">
                    <span className="text-sm text-muted-foreground">KONSOLA</span>
                    <code ref={consoleRef} className="absolute w-full top-6 bottom-0 max-h-full overflow-y-scroll border p-4 rounded-md whitespace-pre-line">
                        {output}
                    </code>
                </div>
            </div>
        </>
    )
}

export default Editor;