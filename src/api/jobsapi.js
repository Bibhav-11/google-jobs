import axios from "axios";

export default function Jobs(term) {
    console.log(axios({
        method: 'get',
        url: "https://serpapi.com/search",
        params: {
            engine: "google_jobs",
            api_key: "8638f93bb029f8f12a54b1b33119a1ab8c02d9aa7cf04c7b9f14fb433e72e943",
            q: term
        }
    }))
}