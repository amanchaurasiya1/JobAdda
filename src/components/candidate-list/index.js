'use client'

import { getCandidateDetailsByIdAction, updateJobApplicationAction } from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    'https://pyrhxcmsjnqqnzzcnqia.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cmh4Y21zam5xcW56emNucWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MjkyNzUsImV4cCI6MjAzNDAwNTI3NX0.fW45yHFua2G10tvmhlkhsosqYbiuIQT1XvDy2-AzjOY'
)


function CandidateList({
    jobApplication,
    currentCandidateDetails,
    setCurrentCandidateDetails,
    showcurrentCandidateDetailsModel,
    setShowcurrentCandidateDetailsModel
}) {

    async function handlefetchCandidateDetails(getCurrentCandidateId) {
        const data = await getCandidateDetailsByIdAction(getCurrentCandidateId);
        // console.log(data, "data");
        if (data) {
            setCurrentCandidateDetails(data);
            setShowcurrentCandidateDetailsModel(true);
        }
    }

    function handlePreviewResume(){
        const {data} = supabaseClient.storage
        .from('job-board-public')
        .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

        // console.log(data, "data resume")
        const a = document.createElement('a');
        a.href = data?.publicUrl;
        a.setAttribute("download","Resume.pdf");
        a.setAttribute("target","_blank");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    async function handleUpdateJobStatus(jobStatus){
        let cpyJobApplicants = [...jobApplication];
        const indexOfCurrentJobApplicant = cpyJobApplicants
                                        .findIndex(item => item.candidateUserID === currentCandidateDetails.userId);

        const jobApplicantsToUpdate = {
            ...cpyJobApplicants[indexOfCurrentJobApplicant],
            status : cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(jobStatus)
        }

        // console.log(jobApplicantsToUpdate,"chcekc");

        await updateJobApplicationAction(jobApplicantsToUpdate,'/jobs')
    }

    return (
        <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
            {
                jobApplication && jobApplication.length > 0 ?
                    jobApplication.map(jobApplicationItem =>
                        <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                            <div className="px-4 my-6 flex justify-between items-center">
                                <h3 className="text-lg font-bold">{jobApplicationItem?.name}</h3>
                                <Button
                                    onClick={() => handlefetchCandidateDetails(jobApplicationItem?.candidateUserID)}
                                    className="flex h-11 items-center justify-center px-5 mt-3"
                                >
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    )
                    : null
            }
            <Dialog
                open={showcurrentCandidateDetailsModel}
                onOpenChange={() => {
                    setCurrentCandidateDetails(null);
                    setShowcurrentCandidateDetailsModel(false);
                }}>
                <DialogContent className="max-h-[70vh] overflow-auto">
                <DialogTitle className="text-center text-xl font-bold italic">Candidate Details</DialogTitle>
                    {currentCandidateDetails ? (
                        <div>
                            <span><strong> Name:</strong>{currentCandidateDetails.candidateInfo.name}</span><span className="ml-16 font-bold  text-lg"> {currentCandidateDetails.email}</span>
                            <p><strong>Current Job Location:</strong> {currentCandidateDetails.candidateInfo.currentJobLocation}</p>
                            <p><strong>Preferred Job Location:</strong> {currentCandidateDetails.candidateInfo.preferedJobLocation}</p>
                            <p><strong>Current Salary:</strong> {currentCandidateDetails.candidateInfo.currentSalary}</p>
                            <p><strong>Notice Period:</strong> {currentCandidateDetails.candidateInfo.noticePeriod} months</p>
                            <p><strong>College:</strong> {currentCandidateDetails.candidateInfo.college}</p>
                            <p><strong>College Location:</strong> {currentCandidateDetails.candidateInfo.collegeLocation}</p>
                            <p><strong>Current Company:</strong> {currentCandidateDetails.candidateInfo.currentCompany}</p>
                            <p><strong>Previous Companies:</strong> {currentCandidateDetails.candidateInfo.previousCompanies}</p>
                            <p><strong>Total Experience:</strong> {currentCandidateDetails.candidateInfo.totalExperience} years</p>
                            <p><strong>Graduated Year:</strong> {currentCandidateDetails.candidateInfo.graduatedYear}</p>
                            <p><strong>Skills:</strong> {currentCandidateDetails.candidateInfo.skills}</p>
                            <p><strong>GitHub Profile:</strong> <a href={currentCandidateDetails.candidateInfo.githubProfile} target="_blank" rel="noopener noreferrer">GitHub</a></p>
                            <p><strong>LinkedIn Profile:</strong> <a href={currentCandidateDetails.candidateInfo.linkedinProfile} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <DialogFooter>
                        <div className="flex gap-3">
                            <Button 
                            onClick = {()=>handlePreviewResume()}
                            className="flex h-11 items-center justify-center px-5 mt-3"
                            >
                                Resume
                            </Button>
                            <Button 
                            onClick={()=>handleUpdateJobStatus('selected')}
                            className="flex h-11 items-center justify-center px-5 mt-3"
                            disabled = {
                                jobApplication
                                .find(
                                    (item) => 
                                        item.candidateUserID === currentCandidateDetails?.userId
                                )
                                ?.status.includes('selected') || jobApplication
                                .find(
                                    (item) => 
                                        item.candidateUserID === currentCandidateDetails?.userId
                                )
                                ?.status.includes('rejected') ?  true : false
                            }
                            >
                                { jobApplication
                                    .find(
                                        (item) => 
                                            item.candidateUserID === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes('selected')
                                    ? "selected" : "select"
                                }
                            </Button>
                            <Button 
                            onClick={()=>handleUpdateJobStatus('rejected')}
                            className="flex h-11 items-center justify-center px-5 mt-3"
                            disabled = {
                                jobApplication
                                .find(
                                    (item) => 
                                        item.candidateUserID === currentCandidateDetails?.userId
                                )
                                ?.status.includes('selected') || jobApplication
                                .find(
                                    (item) => 
                                        item.candidateUserID === currentCandidateDetails?.userId
                                )
                                ?.status.includes('rejected') ?  true : false
                            }
                            >
                                { jobApplication
                                    .find(
                                        (item) => 
                                            item.candidateUserID === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes('rejected')
                                    ? "rejected" : "reject"
                                }
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CandidateList;