import { createContext, useEffect, useState } from "react";
import { authValid, useAuth } from "./useAuth";
import { API_BASE_URL } from "./globals";
import { useToast } from "@/components/ui/use-toast";

type TaskType = {
    id: number,
    name: string,
    short: string,
    desc: string,
    points: number,
    completed: boolean,
    output: string,
    input: string
};

type TasksContextType = {
    tasks: TaskType[],
    refreshTasks: () => void,
};

const TasksContext = createContext<TasksContextType>({
    tasks: [],
    refreshTasks: () => { }
});

const TasksProvider : React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
    const [ tasks, setTasks ] = useState<TaskType[]>([]);
    const { token } = useAuth();
    const { toast } = useToast();

    const refreshTasks = async () => {
        const res = await fetch(API_BASE_URL + "/api/tasks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token
            },
        });

        if (res.status === 401) {
            toast({
                title: "Wystąpił błąd",
                description: "Spróbuj ponownie",
                variant: "destructive"
            });
        } else if (res.status === 200) {
            const body = await res.json();

            if (body satisfies TaskType[]) {
                setTasks(body);
            }
        }
    }

    useEffect(() => {
        if (authValid(token)) {
            refreshTasks();
        }
    }, [token]);

    return (
        <>
            <TasksContext.Provider value={{tasks, refreshTasks}}>
                {children}
            </TasksContext.Provider>
        </>
    )
}

export { TasksProvider, TasksContext };