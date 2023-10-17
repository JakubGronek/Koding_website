import { Button } from "@/components/ui/button";
import { Download, FileTerminal, History, MoreHorizontal, PencilLine, Play, Save, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { Textarea } from "@/components/ui/textarea"


function EditorButtons() {
    return (
        <>
            <Button variant="secondary">
                <Save size={16} className="mr-2" />
                Save
            </Button>
            <Button>
                <Play size={16} className="mr-2" />
                Run
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <MoreHorizontal size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>test.py</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FileTerminal size={16} className="mr-2" />
                            Execution settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <History size={16} className="mr-2" />
                            Edit history
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download size={16} className="mr-2" />
                            Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <PencilLine size={16} className="mr-2" />
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            <Trash2 size={16} className="mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}


function Editor() {
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
                        <span className="text-lg font-extrabold mr-4 text-muted-foreground">#1</span>
                        <h1 className="text-lg font-extrabold inline">
                            Sortowanie
                        </h1>
                    </div>
                    <div>
                        <p className="mb-4">Celem zadania jest...</p>
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
                    Running script...
                    <br />
                </code>
            </div>
        </div>
    )
}

export default Editor;