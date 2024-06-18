import qs from 'query-string'

export const recruiterOnboardFormControls = [
    {
        label:'Name',
        name:"name",
        placeholder:"Enter your name",
        componentType:'input'
    },
    {
        label:'Company Name',
        name:"companyName",
        placeholder:"Enter your Company name",
        componentType:'input'
    },
    {
        label:'Company Role',
        name:"companyRole",
        placeholder:"Enter your Roll in company",
        componentType:'input'
    }
];

export const initialRecruiterFormData = {
    name:'',
    companyName:'',
    companyRole:'',
};

export const candidateOnboardFormControls = [
    {
        label:'Resume',
        name:'resume',
        componentType:'file'
    },
    {
        label:'Name',
        name:'name',
        placeholder:"Enter your name",
        componentType:"input"
    },
    {
        label:'Current Company',
        name:'currentCompany',
        placeholder:"Enter your current Company name",
        componentType:"input"
    },
    {
        label:'Current Job Location',
        name:'currentJobLocation',
        placeholder:"Enter your current Job Location",
        componentType:"input"
    },
    {
        label:'Prefered Job Location',
        name:'preferedJobLocation',
        placeholder:"Enter your Prefered Job Location",
        componentType:"input"
    },
    {
        label:'Current Salary',
        name:'currentSalary',
        placeholder:"Enter your current Salary",
        componentType:"input"
    },
    {
        label:'Notice Period',
        name:'noticePeriod',
        placeholder:"Enter your notice period",
        componentType:"input"
    },
    {
        label:'Skills',
        name:'skills',
        placeholder:"Enter your Skills",
        componentType:"input"
    },
    {
        label:'Previous Companies',
        name:'previousCompanies',
        placeholder:"Enter your Previous Companies name",
        componentType:"input"
    },
    {
        label:'Total Experience',
        name:'totalExperience',
        placeholder:"Enter your Total Experience",
        componentType:"input"
    },
    {
        label:'College',
        name:'college',
        placeholder:"Enter your college name",
        componentType:"input"
    },
    {
        label:'College Location',
        name:'collegeLocation',
        placeholder:"Enter your college Location",
        componentType:"input"
    },
    {
        label:'Graduated Year',
        name:'graduatedYear',
        placeholder:"Enter your Graduated Year",
        componentType:"input"
    },
    {
        label:'Linkedin Profile',
        name:'linkedinProfile',
        placeholder:"Enter your Linkedin Profile",
        componentType:"input"
    },
    {
        label:'Github Profile',
        name:'githubProfile',
        placeholder:"Enter your Github Profile",
        componentType:"input"
    }
];

export const initialCandidateFormData = {
    resume : '',
    name : '',
    currentJobLocation : '',
    preferedJobLocation : '',
    currentSalary : '',
    noticePeriod : '',
    skills : '',
    currentCompany : '',
    previousCompanies : '',
    totalExperience : '',
    college : '',
    collegeLocation : '',
    graduatedYear : '',
    linkedinProfile : '',
    githubProfile : '',
};

export const initialCandidateAccountFormData = {
    name : '',
    currentJobLocation : '',
    preferedJobLocation : '',
    currentSalary : '',
    noticePeriod : '',
    skills : '',
    currentCompany : '',
    previousCompanies : '',
    totalExperience : '',
    college : '',
    collegeLocation : '',
    graduatedYear : '',
    linkedinProfile : '',
    githubProfile : '',
};


export const postNewJobFormControls = [
    {
        label : 'Company Name',
        name : 'companyName',
        placeholder : 'Company Name',
        componentType : 'input',
        disabled : true
    },
    {
        label : 'Job Title',
        name : 'title',
        placeholder : 'Job Title',
        componentType : 'input'
    },
    {
        label : 'Job Type',
        name : 'type',
        placeholder : 'Job Type',
        componentType : 'input'
    },
    {
        label : 'Job Location',
        name : 'location',
        placeholder : 'Job Location',
        componentType : 'input'
    },
    {
        label : 'Experience',
        name : 'experience',
        placeholder : 'Experience',
        componentType : 'input'
    },
    {
        label : 'Job Description',
        name : 'description',
        placeholder : 'Description',
        componentType : 'input'
    },
    {
        label : 'Skills',
        name : 'skills',
        placeholder : 'Skills',
        componentType : 'input'
    }
]

export const initialPostNewFormJobData = {
    companyName : '',
    title : '',
    type : '',
    location :'',
    experience : '',
    description : '',
    skills : '',
}

export const filterMenuDataArray = [
    {
        id : 'companyName',
        label : 'Company Name'
    },
    {
        id : 'title',
        label : 'Title'
    },
    {
        id : 'type',
        label : 'Type'
    },
    {
        id : 'location',
        label : 'Location'
    }
];

export function formUrlQuery({params,dataToAdd}){
    let currentUrl = qs.parse(params);

    if(Object.keys(dataToAdd).length > 0){
        Object.keys(dataToAdd).map((key) => {
            if(dataToAdd[key].length === 0) delete currentUrl[key]
            else currentUrl[key] = dataToAdd[key].join(",");
        });
    }

    return qs.stringifyUrl(
        {
            url:window.location.pathname,
            query:currentUrl,
        },
        {
            skipNull : true,
        }
    )
}

