'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    'https://pyrhxcmsjnqqnzzcnqia.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cmh4Y21zam5xcW56emNucWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MjkyNzUsImV4cCI6MjAzNDAwNTI3NX0.fW45yHFua2G10tvmhlkhsosqYbiuIQT1XvDy2-AzjOY'
)

function OnBoard(){

    const [currentTab,setCurrentTab] = useState('candidate');
    const [recruiterFormData,setRecruiterFormData] = useState(initialRecruiterFormData)
    const [candidateFormData,setCandidateFormData] = useState(initialCandidateFormData)

    const [file,setFile] = useState(null);

    const currentAuthUser = useUser();
    const {user} = currentAuthUser;

    function handleFileChange(event){
        event.preventDefault();
        // console.log(event.target.files);
        setFile(event.target.files[0]);
    }

    async function handleUploadPdfToSupabase(){
        const {data,err} = await supabaseClient.storage.from('job-board-public').upload(`/public/${file.name}`,file,{
            cacheControl : '3600',
            upsert : false,
        })
        // console.log(data,err);
        if(data){
            setCandidateFormData({
                ...candidateFormData,
                resume : data.path,
            })
        }
    }

    useEffect(()=>{
        if(file) handleUploadPdfToSupabase()
    },[file])

    function handleTabChange(value){
        setCurrentTab(value);
    }

    function handleRecruiterFormValid(){
        return recruiterFormData && recruiterFormData.name.trim() !== '' && recruiterFormData.companyName.trim() !== '' && recruiterFormData.companyRole.trim() !== '';
    }
    function handleCandidateFormValid(){
        return Object.keys(candidateFormData).every(key=> candidateFormData[key].trim() !== '');
    }


    async function createProfile(){
        const data = currentTab == 'candidate' ? {
            candidateInfo : candidateFormData,
            role : 'candidate',
            isPremiumUser : false,
            userId : user?.id,
            email : user?.primaryEmailAddress?.emailAddress
        } :{
            recruiterInfo : recruiterFormData,
            role : 'recruiter',
            isPremiumUser : false,
            userId : user?.id,
            email : user?.primaryEmailAddress?.emailAddress
        }
        await createProfileAction(data,"/onboard")
    }

    // console.log(candidateFormData);
    
    return(
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Welcome to onboard
                        </h1>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value="candidate">
                    <CommonForm
                       formControls={candidateOnboardFormControls}
                       buttonText = {'Onboard as Candidate'}
                       formData = {candidateFormData}
                       setFormData = {setCandidateFormData}
                       handleFileChange={handleFileChange}
                       isButtonDisabled={!handleCandidateFormValid()}
                       action={createProfile}
                    />
                </TabsContent>
                <TabsContent value="recruiter">
                    <CommonForm
                    formControls = {recruiterOnboardFormControls}
                    buttonText = {"Onboard as recruiter"}
                    formData={recruiterFormData}
                    setFormData={setRecruiterFormData}
                    isButtonDisabled={!handleRecruiterFormValid()}
                    action = {createProfile}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default OnBoard;