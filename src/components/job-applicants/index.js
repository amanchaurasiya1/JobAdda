'use client'

import CandidateList from "../candidate-list";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

function JobApplicants({
    showApplicantsDrawer,
    setShowApplicantsDrawer,
    currentCandidateDetails,
    setCurrentCandidateDetails,
    showcurrentCandidateDetailsModel ,
    setShowcurrentCandidateDetailsModel, 
    jobItem, 
    jobApplication 
}){
    return(
        <Drawer open = {showApplicantsDrawer} onOpenChange = {setShowApplicantsDrawer}>
            <DrawerContent classname="max-h-[50vh]">
                <ScrollArea classname="h-auto overflow-y-auto">
                    <CandidateList 
                    currentCandidateDetails = {currentCandidateDetails}
                    setCurrentCandidateDetails = {setCurrentCandidateDetails}
                    jobApplication = {jobApplication}
                    showcurrentCandidateDetailsModel = {showcurrentCandidateDetailsModel}
                    setShowcurrentCandidateDetailsModel = {setShowcurrentCandidateDetailsModel}
                    />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}

export default JobApplicants;