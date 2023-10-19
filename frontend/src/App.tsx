import { useState } from "react"

import Header from "./Header"
import Tasks from "./Tasks"
import Editor from "./Editor"
import Landing from "./Landing"
import { AuthDialog, AuthDialogContext } from "./AuthDialog"

function App() {
    const [ authDialogOpen, setAuthDialogOpen ] = useState(false);

    return (
        <AuthDialogContext.Provider value={{ open: authDialogOpen, setOpen: setAuthDialogOpen }}>
            <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
            <Header />
            <Landing />
        </AuthDialogContext.Provider>
    )
}

export default App
