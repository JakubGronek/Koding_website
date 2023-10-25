import { Outlet } from "react-router-dom";
import { AuthProvider } from "./Auth";
import { AuthDialog, AuthDialogContext } from "./AuthDialog";
import Header from "./Header";
import { Toaster } from "@/components/ui/toaster"
import { useState } from "react";
import { TasksProvider } from "./TasksContext";
import APIForm from "./api/RESTForm";

function Layout() {
    const [authDialogOpen, setAuthDialogOpen] = useState(false);

    
    return (
        <AuthProvider>
            <AuthDialogContext.Provider value={{ open: authDialogOpen, setOpen: setAuthDialogOpen }}>
                <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
                <Header />
                
                <TasksProvider>
                    <Outlet />
                </TasksProvider>

                <APIForm action="/api/test" credentials="include" onCallComplete={() => console.log}>

                </APIForm>

                <Toaster />
            </AuthDialogContext.Provider>
        </AuthProvider>
    )
}

export default Layout;