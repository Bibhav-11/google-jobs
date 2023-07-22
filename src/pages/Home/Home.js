import Icon from '@mdi/react';
import { mdiBriefcaseOutline, mdiEarth, mdiClockOutline } from '@mdi/js';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import Radio from '../../components/Radio/Radio';
import { slugify, randomize } from '../../Helper/Helper';
import { ScaleLoader } from 'react-spinners';

function Home( {jobs, setJobs }) {
    const [pageNo, setPageNo] = useState(1);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState('')
    const [locationInput, setLocationInput] = useState('');
    const [wfh, setWfh] = useState(false);
    const [query, setQuery] = useState('nepal');
    const inputRef = useRef();


    useEffect(() => {        
        if(!query) return;
        setLoading(true);
        axios({
            method: 'get',
            // url: 'https://google-jobs-react.onrender.com/api',
             url: 'http://localhost:5000/api',
            params: {
                'query': query.split(' ').join('+'),
                'ltype': wfh ? 1 : 0,
                'location': location,
            }
        })
        .then(response => {console.log(response.data);if(response.data.error) {throw new Error(response.data.error)} else {setJobs(response.data.jobs_results);setError('');}})
        .catch(err => setError(`Sorry! ${err.message}`))
        .finally(() => setLoading(false))

        
    }, [query, wfh, location]);




    const renderedCards = jobs ? jobs.map(job => {   

        if(!job.location || !job.company_name) return;

        return (
            <Link to={`/job/${job.company_name.split(' ').splice(0,2).join('-').toLowerCase()}-${slugify(job.title)}-${job.location.split(",")[0].trim().toLowerCase()}-${randomize(job.job_id)}`} state={{job: job}} key={job.job_id} className="bg-white cursor-pointer shadow-default rounded-[4px] p-3 self-stretch">
                <div className="flex gap-4 text-primary text-xs font-bold font-Roboto">
                    {job.thumbnail ? <img src={job.thumbnail} className="h-[90px] w-[90px] rounded-[4px] border"/>: <div className="h-[90px] w-[90px] rounded-[4px] border flex justify-center items-center text-3xl font-normal bg-[#0097A7] text-white">{job.company_name[0]}</div>}
                    <div>
                        <p>{job.company_name || ''}</p>
                        <p className="font-normal text-base mt-2">{job.title || ''}</p>

                        {job.extensions.includes("Full-time") ? <p className="border inline-block border-primary rounded-[4px] px-2 py-1.5 mt-3.5">Full time</p> : ""}
                        
                    </div>
                </div>
    
                <div className="flex gap-7 justify-end mt-4">
                    <div className="flex items-center gap-2">
                        <Icon path={mdiEarth} size={'18px'} color={"#B9BDCF"} />
                        <p className="text-light text-xs font-medium">{job.location ? job.location.split(",")[0] : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon path={mdiClockOutline} size={'18px'} color={"#B9BDCF"} />
                        <p className="text-light text-xs font-medium">{job.extensions[0] || ''}</p>
                    </div>
                </div>
            </Link>
        )
    }) : null;


    return (
        <>
        
            <section>
                <div className="flex justify-center items-center bg-background bg-cover bg-center bg-no-repeat h-[8.625rem] rounded-[8px] px-4">
                    <form onSubmit={(e) =>{e.preventDefault();  setQuery(inputRef.current.value)}} className="h-14 w-full mx-auto bg-white flex items-center gap-2 p-1 pl-4 rounded-[4px] shadow-default md:max-w-screen-md">
                        <Icon path={mdiBriefcaseOutline} size={'18px'} color={"#B9BDCF"} />
                        <input ref={inputRef} className="mb-1 placeholder:text-xs placeholder:font-normal  placeholder:text-light flex-1 h-full font-Roboto text-dark outline-none" type="text" placeholder="Title, companies, expertise or benefits"/>
                        <input type='submit' value="Search" className="bg-skyblue text-white font-Roboto font-medium px-7 h-full rounded-[4px] cursor-pointer" />
                    </form>
                </div>
            </section>

            <div className="flex flex-col gap-6 md:flex-row">
    
                <section className="mt-7 text-primary font-Poppins font-medium text-sm flex-1">
    
                    <div className="ml-2">
                        <input type="checkbox" checked={wfh} onChange={() => setWfh(!wfh)} className="appearance-none peer" id="full-time"/>
                        <label htmlFor="full-time" className="flex items-center before:content before:h-4 before:w-4 before:border before:border-light before:rounded-t-sm before:mr-2 peer-checked:before:content-['\2713'] peer-hover:before:border-primary peer-checked:before:border-primary before:flex before:items-center before:justify-center before:text-primary cursor-pointer transition-all">
                            Work From Home
                        </label>
                    </div>
    
                    <p className="mt-8 text-light uppercase font-bold">Location</p>
    
                    <form onSubmit={e => { e.preventDefault(); setLocation(locationInput); setLocationInput('') }} className="h-12 w-full mx-auto mt-4 bg-white flex items-center gap-2 p-1 pl-4 rounded-[4px] shadow-default">
                            <Icon path={mdiEarth} size={'18px'} color={"#B9BDCF"} />
                            <input value={locationInput} onChange={(e) => setLocationInput(e.target.value)} className="placeholder:text-xs placeholder:font-normal  placeholder:text-light flex-1 h-full font-Roboto text-primary font-medium outline-none" type="text" placeholder="City, state, zip code or country"/>
                    </form>
    
                    <div onChange={e => setLocation(e.target.value)} className="mt-7 flex flex-col gap-4">
     
                        <Radio location={location} value='new+york' name="New York" />
                        <Radio location={location} value='london' name="London" />
                        <Radio location={location} value='amsterdam' name="Amsterdam" />
    
    
                    </div>
    
    
                </section>

                <div className='flex-[2] mt-7 text-primary text-sm font-semibold'>


                    {  
                        query === "nepal" ? (<p>Showing results for the most popular jobs in Nepal</p>) :
                        (query && location ? (<p>Showing results for "{query}" jobs in {location}</p>) : (<p>Showing results for "{query}" jobs</p>))
                    }

                    
                    <section className="flex flex-col gap-6 py-2 min-h-[500px] items-center justify-center text-light">
                        {error && error}
                        {loading ? (<div className='flex flex-grow flex-col justify-center items-center gap-1'><ScaleLoader color="#334680" /> <div className='font-Roboto text-primary text-sm'>Fetching Data</div></div>) : renderedCards}
                    </section>
                </div>

            </div>

        </>
    )
}

export default Home;