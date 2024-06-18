import { fetchProfileAction } from "@/actions";
import OnBoard from "@/components/on-board";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function OnBoardPage(){
    const user = await currentUser();
    // fetch the profile info : either user is candidate or recruiter
    const profileInfo = await fetchProfileAction(user?.id);

    // console.log("profi : ",profileInfo);
    if(profileInfo?._id){
        if(profileInfo?.role === 'recruiter' && (!profileInfo.isPremiumUser)){
            redirect('/membership')
        }else{
            redirect('/')
        }
    }else{
        return(
            <OnBoard/>
        )
    }
}

export default OnBoardPage;