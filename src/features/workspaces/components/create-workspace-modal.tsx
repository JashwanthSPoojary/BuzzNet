"use client"
import{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"


export const CreateWorkspaceModal = () =>{
    const router = useRouter();
    const [open,setOpen] = useCreateWorkspaceModal();
    const { mutate,isPending } = useCreateWorkspace();
    const [name,setName] = useState("");

    const handleClose = () =>{
        setOpen(false);
        setName("");
    };

    const handleSubmit = (e:React.FocusEvent<HTMLFormElement>) =>{
        e.preventDefault();
        mutate({
            name
        },{
            onSuccess(id) {
                router.push(`/workspace/${id}`)   
                handleClose();   
                toast.success("Workspace  created")          
            },
        })
    }
    return(
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    disabled={false}
                    required
                    autoFocus
                    minLength={3}
                    placeholder="Workspace name e.g. 'work', 'Personnel', 'Home'"
                    />
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}