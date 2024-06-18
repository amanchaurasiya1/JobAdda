import { fetchProfileAction } from '@/actions';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function Home() {

  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);

  if(user && !profileInfo?._id){
    redirect('/onboard');
  }

  return (
      <div className='bg-white'>
          <div className='relative w-full'>
            <div className='min-h-screen flex'>
              <div className='container m-auto p-0'>
                <div className='flex flex-wrap items-center gap-12 lg:gap-0'>
                  <div className='lg:w-5/12 space-y-8'>
                      <span className='flex space-x-2'>
                        <span className='block w-14 mb-2 border-b-2 border-gray-700'></span>
                        <span className='font-medium text-gray-600'>
                          One Step Solution to Find Jobs
                        </span>
                      </span>  
                      <h1 className='text-4xl font-bold md:text-6xl'>
                        The Best <br/> Job Portal App
                      </h1>
                      <p className='text-xl text-gray-700'>
                        Find Best Job From Top Product Based Companies and Build your Career
                      </p>
                      <div className='flex space-x-4'>
                        {
                          (!user || profileInfo?.role === 'candidate') ? 
                            <div className='flex space-x-4'>
                              <Button className="flex h-11 items-center justify-center px-5 mt-3 mr-5">
                                <Link href={'/jobs'}>
                                Browse Jobs 
                                </Link>
                              </Button>
                              {
                                (user) ? 
                                <Button className="flex h-11 items-center justify-center px-5 mt-3 mr-5">
                                <Link href={'/activity'}>
                                Your Activity 
                                </Link>
                                </Button> 
                                : null
                              }
                            </div>
                            : null
                        }

                        {
                          (!user || profileInfo?.role === 'recruiter') ? 

                            <Button className="flex h-11 items-center justify-center px-5 mt-3 mr-5">
                              <Link href={'/jobs'} >
                                Post New Job
                              </Link>
                            </Button>
                          : null
                        }
                      </div>
                  </div>
                  <div className='hidden relative md:block lg:w-7/12'>
                    <img 
                      src="https://shorturl.at/msw07" 
                      alt="Imgae Not Loaded"
                      className='relative ml-auto'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  );
}

export default Home;
