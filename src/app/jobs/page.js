import { createFilterCategoryAction, fetchJobApplicationForCandidate, fetchJobApplicationForRecruiter, fetchJobForCandidateAction, fetchJobForRecruiterAction, fetchProfileAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

async function JobsPage({searchParams}){
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

    const jobList = 
        profileInfo.role === 'candidate' 
            ? await fetchJobForCandidateAction(searchParams) 
            : await fetchJobForRecruiterAction(user?.id);

    const getJobApplicationList = 
        profileInfo.role === 'candidate' 
        ? await fetchJobApplicationForCandidate(user?.id) 
        : await fetchJobApplicationForRecruiter(user?.id)

    const fetchFilterCategories = await createFilterCategoryAction()

    return(
        <JobListing
        user = {JSON.parse(JSON.stringify(user))}
        profileInfo = {profileInfo}
        jobList = {jobList}
        jobApplication = {getJobApplicationList}
        filterCategories = {fetchFilterCategories}
        />
    )
}

export default JobsPage;