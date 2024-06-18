'use client'

import CommonCard from "../common-card";
import JObIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({jobApplicants,jobList}){

    const uniqueStatusArray = [...new Set(jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1))];
    return(
        <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex items-baseline border-b  justify-between pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-950">Your Activity</h1>
                <TabsList>
                    {
                        uniqueStatusArray.map((status) => (
                            <TabsTrigger value={status}>{status}</TabsTrigger>
                        ))
                    }
                </TabsList>
                </div>
                <div className="pb-24 pt-6">
                    <div className="container mx-auto p-0 space-y-8">
                        <div className="flex flex-col gap-4">
                            {/* {console.log(jobList,"jobList")} */}
                            {
                                uniqueStatusArray.map((status) => 
                                    <TabsContent value={status}>
                                        {
                                            jobList.filter(jobItem => 
                                                jobApplicants.filter(jobApplication => jobApplication.status.indexOf(status) > -1
                                            ).findIndex(filteredItemByStatus => jobItem._id === filteredItemByStatus.jobID) > -1
                                        ).map(finalFilteredItem => <CommonCard
                                            icon={<JObIcon/>}
                                            title = {finalFilteredItem?.title}
                                            description={finalFilteredItem?.companyName}
                                            >
                                            </CommonCard>
                                        )}
                                    </TabsContent>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    )
}

export default CandidateActivity;