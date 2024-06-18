'use client'

import { fetchJobApplicationForRecruiter } from "@/actions"
import CommonCard from "../common-card"
import JObIcon from "../job-icon"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import JobApplicants from "../job-applicants"

export default async function RecruiterJobCard({jobItem,profileInfo,jobApplication}){

    const jobId = jobItem?._id;
    
    const [showApplicantsDrawer,setShowApplicantsDrawer] = useState(false);
    const [currentCandidateDetails,setCurrentCandidateDetails] = useState(null);
    const [showcurrentCandidateDetailsModel,setShowcurrentCandidateDetailsModel] = useState(false);
    
    const numberofUsersApplied = jobApplication.filter(item => item?.jobID === jobId).length;

    console.log(jobItem,"jobItem");
    return(
        <div>
            <CommonCard
            icon = {<JObIcon/>}
            title = {jobItem?.title}
            description={jobItem?.description}
            companyName={jobItem.companyName}
            footerContent={
                <Button
                disabled = {jobApplication.filter(item => item?.jobID === jobId).length === 0}
                onClick= {() => setShowApplicantsDrawer(true)}
                className = "disabled:opacity-55 flex h-11 items-center justify-center px-5 mt-3"
                >{numberofUsersApplied} Applied</Button>
            }
            />
            <JobApplicants
            showApplicantsDrawer = {showApplicantsDrawer}
            setShowApplicantsDrawer = {setShowApplicantsDrawer}
            currentCandidateDetails = {currentCandidateDetails}
            setCurrentCandidateDetails = {setCurrentCandidateDetails}
            showcurrentCandidateDetailsModel = {showcurrentCandidateDetailsModel}
            setShowcurrentCandidateDetailsModel = {setShowcurrentCandidateDetailsModel}
            jobItem = {jobItem}
            jobApplication = {jobApplication.filter(jobApplicationItem => jobApplicationItem.jobID === jobItem?._id)}
            />
        </div>
    )
}