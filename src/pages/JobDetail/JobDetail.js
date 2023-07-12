import axios from 'axios';
import Icon from '@mdi/react';
import { mdiClockOutline, mdiEarth } from '@mdi/js';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { randomize } from '../../Helper/Helper';
import { ScaleLoader } from 'react-spinners';
import Error from '../Error/Error';


export default function JobDetail() {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState([]);
    const [apply, setApply] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setisError] = useState(false);

    const { state } = useLocation();
    const { id } = useParams();

    const idArr = id.split('-');
    const [location] = idArr.slice(-2,-1);
    // const [key] = idArr.slice(-1);
    const query = idArr.slice(0,-2).join(' ');


    useEffect(() => {
        setLoading(true);
        axios({
            method: 'get',
            url: 'google-jobs-react.onrender.com/api',
            params: {
                'query': query,
                'location': location
            }
        })
        .then(response => {response.data.error ? setisError(true) : setJobs(response.data.jobs_results);})
        .catch(err => setisError(true))
        .finally(() => setLoading(false))

    }, []);


    useEffect(() => {   
        if(jobs.length!==0) {
            if(state) setJob([state.job]);
            else {
                const matchedJob = jobs[0];
                setJob([matchedJob]);              
            }
        }
        
    }, [jobs])


    useEffect(() => {
        if(job.length) {
            axios({
                method: 'get',
                url: 'google-jobs-react.onrender.com/apply',
                params: {
                    'query': job[0].job_id,
                }
            })
            .then(response => {setApply(response.data.apply_options)})
        }

    }, [job]);


    const renderedApply = apply.map(option => {
        return <a href={option.link} key={option.title} className='font-Roboto border block w-max mb-2 bg-skyblue rounded-[4px] px-3 py-2 text-white text-xs cursor-pointer'>{option.title}</a>
    })

    return (

        <>
            {isError && <Error />} 
            {loading ? <div className='flex min-h-[80vh] flex-col justify-center items-center gap-1'><ScaleLoader color="#334680" /> <div className='font-Roboto text-primary text-sm'>Fetching Data</div></div> : (<div>
                {job.map(job => (
                    <div className='flex flex-col md:flex-row gap-6' key={job.job_id}>
                        <section className="font-Poppins whitespace-nowrap md:basis-64">
                            <a href="/" className="text-skyblue font-medium text-sm">Back to Search</a>
                            <p className="mt-8 mb-5 text-sm text-light uppercase font-bold">How to apply</p>
                            {renderedApply}
                            {/* <p className="mt-4 text-sm font-medium text-primary">Please email a copy of your resume and online portfolio to <span className="text-skyblue">wes@kasisto.com</span> & CC <span className="text-skyblue">eric@kasisto.com</span></p> */}
                        </section>
                        <section className="font-Roboto pb-8 w-full">
                            <div className='md:flex items-center gap-4'>
                                <h2 className="text-primary text-2xl font-bold">{job.title}</h2>
                                {job.extensions.includes("Full-time") ? <p className="border inline-block border-primary rounded-[4px] px-2 py-1.5 mt-1 md:mt-0 text-primary text-xs font-bold">Full time</p> : ""}
                            </div>
                            <div className="mt-2.5 flex items-center gap-2">
                                    <Icon path={mdiClockOutline} size={'18px'} color={"#B9BDCF"} />
                                    <p className="text-light text-xs font-medium">{job.extensions[0]}</p>
                            </div>
                            <div className='mt-9 flex gap-3'>
                                {job.thumbnail ? <img src={job.thumbnail} className="h-11 w-11 rounded" /> :
                                <div className="h-11 w-11 rounded border flex justify-center items-center text-xl font-normal bg-[#0097A7] text-white">{job.company_name[0]}</div>}
                                <div className='flex flex-col justify-between'>
                                    <p className='-mt-1 font-bold text-lg text-primary'>{job.company_name}</p>
                                    <div className="flex items-center gap-2">
                                        <Icon path={mdiEarth} size={'18px'} color={"#B9BDCF"} />
                                        <p className="text-light text-xs font-medium">{job.location}</p>
                                    </div>
                                </div>
                            </div>
                            <article  className='mt-8 text-primary text-base font-normal'>
                                <pre className='font-Roboto whitespace-pre-wrap text-justify'>{job.description}</pre>
                            </article>
                        </section>
                    </div>
                    ))}
            </div>)}
        </>
        
        
    )
}





