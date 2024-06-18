import { fetchJobApplicationForCandidate, fetchJobForCandidateAction } from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server"

export default async function Activity() {
    const user = await currentUser();
    const jobList = await fetchJobForCandidateAction();
    const jobApplicants = await fetchJobApplicationForCandidate(user?.id);

    return (
        <CandidateActivity jobApplicants={jobApplicants} jobList = {jobList} />
    )
}