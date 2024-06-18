'use client'

import { useState } from "react";
import CommonCard from "../common-card";
import JObIcon from "../job-icon";
import { Button } from "../ui/button";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { createJobApplicationAction } from "@/actions";
  

function CandidateJobCard({jobItem,profileInfo,jobApplication}) {
    const [showJobDetailsDrawer,setShowJobDetailsDrawer] = useState(false);

    // console.log(jobApplication,"ji");

    async function handleJobApply(){
        await createJobApplicationAction({
            recruiterID : jobItem?.recruiterId,
            name : profileInfo?.candidateInfo?.name,
            email : profileInfo?.email,
            candidateUserID : profileInfo?.userId,
            status : ["Applied"],
            jobID : jobItem?._id,
            jobAppliedDate : new Date().toLocaleDateString(),
        },'/jobs');
        setShowJobDetailsDrawer(false);
    }
    console.log(jobItem,"jobItem");

    return (
        <div>
            <Drawer 
            open={showJobDetailsDrawer}
            onOpenChange = {setShowJobDetailsDrawer}
            >
                <CommonCard
                    icon={<JObIcon />}
                    title={jobItem?.title}
                    description={jobItem?.description}
                    companyName = {jobItem?.companyName}
                    footerContent={
                        <Button
                        onClick = {()=> setShowJobDetailsDrawer(true)}
                        className="flex h-11 items-center justify-center px-5 mt-3"
                       >View Details</Button>
                    }
                />

                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between">
                            <DrawerTitle className="text-4xl font-extrabold text-gray-800">
                                {jobItem?.title}
                            </DrawerTitle>
                            <div className="flex">
                                <Button 
                                onClick={handleJobApply} 
                                className="disabled:opacity-65 flex h-11 items-center justify-center px-5 mt-3 mr-5"
                                disabled = {
                                    jobApplication.findIndex(item => item.jobID === jobItem?._id) > -1 ? true : false
                                }
                                >
                                {
                                    jobApplication.findIndex(item => item.jobID === jobItem?._id) > -1 ? 'Applied' : 'Apply'
                                }    
                                </Button>
                                <Button onClick={() => setShowJobDetailsDrawer(false)} className="flex h-11 items-center justify-center px-5 mt-3">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-2xl font-medium text-gray-600">
                        {jobItem?.description}
                        <span className="text-xl ml-4 font-normal text-gray-500"> 
                            {jobItem?.location}
                        </span>
                    </DrawerDescription>
                    <div className="w-[150px] flex justify-center items-center h-[40px] mt-6 bg-black rounded-[4px]">
                        <h2 className="text-xl font-bold text-white">{jobItem?.type}</h2>
                    </div>
                    <h3 className="text-2xl font-medium text-black mt-3">
                        Experience : {jobItem?.experience}
                    </h3>
                    <div className="flex gap-4 mt-6">
                        {
                            jobItem?.skills.split(",").map((skillItem) => (
                                <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                    <h2 className="text-[13px] font-medium text-white">
                                        {skillItem}
                                    </h2>
                                </div>
                            ))
                        }
                    </div>
                </DrawerContent>

            </Drawer>
        </div>
    )
}

export default CandidateJobCard;