'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewFormJobData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";

function PostNewJob({profileInfo,user}){
    const [showJobDialog,setShowJobDialog] = useState(false);
    const [jobFromData,setJobFormData] = useState({
        ...initialPostNewFormJobData,
        companyName : profileInfo?.recruiterInfo?.companyName
    });

    function handlePostNewBtnValid(){
        return Object.keys(jobFromData).every(control => jobFromData[control]?.trim() !== '')
    }

    async function createNewJob(){
        await postNewJobAction({
            ...jobFromData,
            recruiterId : user?.id,
            applicants : []
        },'/jobs')

        setJobFormData({
            ...initialPostNewFormJobData,
            companyName : profileInfo?.recruiterInfo?.companyName
        })

        setShowJobDialog(false);
    }

    return(
        <div>
            <Button
            onClick = {() => setShowJobDialog(true)}
            className = "disabled:opacity-60 flex h-11 items-center justify-center px-5 mt-3"
            >Post New Job</Button>
            <Dialog open={showJobDialog} onOpenChange={()=> {
                setShowJobDialog(false);
                setJobFormData({
                    ...initialPostNewFormJobData,
                    companyName : profileInfo?.recruiterInfo?.companyName
                })
            }}>
                <DialogContent className="sm:max-w-screen-md h-[500px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Post New Job</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <CommonForm
                            buttonText={'Post Job'}
                            formData={jobFromData}
                            setFormData={setJobFormData}
                            formControls={postNewJobFormControls}
                            isButtonDisabled = {!handlePostNewBtnValid()}
                            action={createNewJob}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PostNewJob;