
'use client'

import { filterMenuDataArray, formUrlQuery } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function JobListing({
    user,
    profileInfo,
    jobList,
    jobApplication,
    filterCategories
}){

    const searchParams = useSearchParams();
    const [filterParams,setFilterParams] = useState({});
    const router = useRouter();

    function handleFilter(getSectionId,getCurrentOption){
        let cpyFilterParams = {...filterParams};
        const indexOfCurrentSection = Object.keys(cpyFilterParams).indexOf(getSectionId);
        if(indexOfCurrentSection === -1){
            cpyFilterParams = {
                ...cpyFilterParams,
                [getSectionId] : [getCurrentOption],
            };
        }else{
            const indexOfCurrentOption =
                cpyFilterParams[getSectionId].indexOf(getCurrentOption);
            if(indexOfCurrentOption === -1){
                cpyFilterParams[getSectionId].push(getCurrentOption);
            }else{
                cpyFilterParams[getSectionId].splice(indexOfCurrentOption,1);
            }
        }

        setFilterParams(cpyFilterParams);
        sessionStorage.setItem('filterParams',JSON.stringify(cpyFilterParams))
    }

    useEffect(()=>{
        setFilterParams(JSON.parse(sessionStorage.getItem('filterParams')))
    },[])

    useEffect(()=>{
        if(filterParams && Object.keys(filterParams).length > 0){
            let url = "";
            url = formUrlQuery({
                params : searchParams.toString(),
                dataToAdd : filterParams
            })

            router.push(url,{scroll:false});
        }
    },[filterParams,searchParams])

    const filterMenus = filterMenuDataArray.map(item => ({
        id: item.id,
        name : item.label,
        options : [
            ...new Set(filterCategories.map(listItem => listItem[item.id]))
        ]
    }))

    console.log(filterParams,"fiterMenus");

    return(
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    {
                        (profileInfo?.role === 'candidate') ? 
                        "Explore All Jobs" : "Jobs Dashboard"
                    }
                </h1>
                <div className="flex items-center">
                    {
                        profileInfo?.role === 'candidate' ? 
                        <Menubar>
                            {
                                filterMenus.map(filterMenu => 
                                    <MenubarMenu>
                                        <MenubarTrigger>{filterMenu.name}</MenubarTrigger>

                                        <MenubarContent>
                                            {
                                                filterMenu.options.map((option,optionIdx)=>(
                                                    <MenubarItem 
                                                    key={optionIdx}
                                                    onClick={()=>handleFilter(filterMenu.id,option)}
                                                    className="flex items-center"
                                                    > 
                                                        <div 
                                                        className={`h-4 w-4 border rounded border-gray-900 
                                                            ${filterParams && Object.keys(filterParams).length > 0 
                                                                && filterParams[filterMenu.id] && filterParams[filterMenu.id].indexOf(option) > -1 
                                                                ? "bg-black" : '' }`}
                                                        />
                                                        <Label className="ml-3 cursor-pointer text-sm text-gray-600">{option}</Label>
                                                    </MenubarItem>
                                                ))
                                            }
                                        </MenubarContent>

                                    </MenubarMenu>
                                )
                            }
                        </Menubar>
                        : <PostNewJob user={user} profileInfo={profileInfo}/>
                    }
                </div>
            </div>
            <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                    <div className="lg:col-span-4">
                        <div className="container mx-auto p-0 space-y-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    jobList && jobList.length > 0 
                                    ? jobList.map((jobItem) =>
                                        profileInfo?.role === 'candidate'  
                                        ? (
                                            <CandidateJobCard jobApplication={jobApplication} profileInfo={profileInfo} jobItem={jobItem}/>
                                        ) : (
                                            <RecruiterJobCard jobApplication={jobApplication} profileInfo={profileInfo} jobItem={jobItem}/>
                                        )
                                    )
                                    :null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobListing;