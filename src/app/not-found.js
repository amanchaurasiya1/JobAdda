import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound(){
    return(
        <>
            <div className="bg-gray-200 w-full h-[80vh] flex flex-col justify-center items-center  text-black font-bold font-sans text-xl">
                <div> 
                    Error 404 : Page Not Found 
                </div>
                <div>
                    <Button className="flex h-11 items-center justify-center px-5 mt-3 mr-5">
                       <Link href={'/'}> Go to Home Page </Link>
                    </Button>
                </div>
            </div>
        </>
    )
}