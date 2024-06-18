'use server'

import connectToDB from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

// create profile action
export async function createProfileAction(formData,pathToRevalidate){
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
}

export async function fetchProfileAction(id){
    await connectToDB();
    const result = await Profile.findOne({userId : id})

    return JSON.parse(JSON.stringify(result))
}

export async function postNewJobAction(formData,pathToRevalidate){
    await connectToDB();

    await Job.create(formData);
    revalidatePath(pathToRevalidate);
}

// fetch Jobs
// for recruiters

export async function fetchJobForRecruiterAction(id){
    await connectToDB();
    const result = await Job.find({recruiterId : id})
    return JSON.parse(JSON.stringify(result));
}

// for candidates
export async function fetchJobForCandidateAction(filterParams = {}){
    await connectToDB();

    let updatedParams = {};
    Object.keys(filterParams).forEach(filterKey => {
        updatedParams[filterKey] = {$in :filterParams[filterKey].split(',')}
    })

    const result = await Job.find(updatedParams);
    return JSON.parse(JSON.stringify(result));
}

// create job application
export async function createJobApplicationAction(data,pathToRevalidate){
    await connectToDB();

    await Application.create(data);
    revalidatePath(pathToRevalidate);
}


// fetch job applications - candidate side
export async function fetchJobApplicationForCandidate(candidateUserID){
    await connectToDB();
    const result = await Application.find({candidateUserID : candidateUserID});
    
    return JSON.parse(JSON.stringify(result));
}

// fetch job application - recruiter side
export async function fetchJobApplicationForRecruiter(recruiterID){
    await connectToDB();
    const result = await Application.find({recruiterID : recruiterID});
    
    return JSON.parse(JSON.stringify(result));
}

// update job application
export async function updateJobApplicationAction(data,pathToRevalidate){
    await connectToDB();
    const {recruiterID,name,email,candidateUserID,status,jobID,_id,jobAppliedDate} = data;
    await Application.findByIdAndUpdate(
        {
            _id:_id,
        },
        {
            recruiterID,   
            name,
            email,
            candidateUserID,
            status,
            jobID,
            jobAppliedDate,
        },
        {new : true}
    );
    revalidatePath(pathToRevalidate)
}

// get candidate details by candidate id
export async function getCandidateDetailsByIdAction(currCandidateId){
    await connectToDB();
    const result = await Profile.findOne({userId : currCandidateId})
    return JSON.parse(JSON.stringify(result));
}

// create filter catagories
export async function createFilterCategoryAction(){
    await connectToDB();
    const result = await Job.find({});
    return JSON.parse(JSON.stringify(result));
}

// update profile Action
export async function updateProfileAction(data,pathToRevalidate){
    await connectToDB();
    const {
        userId,
        role,
        email,
        isPremiumUser,
        memberShipType,
        memberShipStartDate,
        memberShipTypendDate,
        recruiterInfo,
        candidateInfo
    } = data;

    await Profile.findOneAndUpdate({
        _id : data?._id,
    },{
        userId,
        role,
        email,
        isPremiumUser,
        memberShipType,
        memberShipStartDate,
        memberShipTypendDate,
        recruiterInfo,
        candidateInfo
    },{
        new:true
    })
    
    revalidatePath(pathToRevalidate);
}