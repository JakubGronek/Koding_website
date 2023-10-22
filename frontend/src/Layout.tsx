import { Outlet } from "react-router-dom";
import { AuthProvider } from "./Auth";
import { AuthDialog, AuthDialogContext } from "./AuthDialog";
import Header from "./Header";
import { Toaster } from "@/components/ui/toaster"
import { useState } from "react";

function Layout() {
    const [authDialogOpen, setAuthDialogOpen] = useState(false);

    
    return (
        <AuthProvider>
            <AuthDialogContext.Provider value={{ open: authDialogOpen, setOpen: setAuthDialogOpen }}>
                <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
                <Header />
                <Outlet />
                <Toaster />
            </AuthDialogContext.Provider>
        </AuthProvider>
    )
}

export default Layout;