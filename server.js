const express = require('express');
const axios = require('axios');

const app = express();

//8638f93bb029f8f12a54b1b33119a1ab8c02d9aa7cf04c7b9f14fb433e72e943
//0068b7fc089186eae2f64ee425ee828d6e7d96bcb7a995b1853d5084c2f5a35b


app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");
    res.set("x-requested-with", "XMLHttpRequest");
    res.set("Access-Control-Expose-Headers","Content-Encoding,api_key");
    res.set("origin","http://localhost:3000");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    next();
});

app.get("/api", (req, res) => {
    const query = req.query.query
    const pagination = req.query.pagination
    const ltype = req.query.ltype;
    const location = req.query.location;

    if(pagination) axios.get(`https://serpapi.com/search?engine=google_jobs&api_key=0068b7fc089186eae2f64ee425ee828d6e7d96bcb7a995b1853d5084c2f5a35b&q=${query}&start=${pagination}&ltype=${ltype}&location=${location}`)
    .then(response => {res.json(response.data)});

    else axios.get(`https://serpapi.com/search?engine=google_jobs&api_key=0068b7fc089186eae2f64ee425ee828d6e7d96bcb7a995b1853d5084c2f5a35b&q=${query}&location=${location}`)
    .then(response => {res.json(response.data)});

    
})

app.get("/apply", (req, res) => {
    const query = req.query.query

    axios.get(`https://serpapi.com/search?engine=google_jobs_listing&api_key=0068b7fc089186eae2f64ee425ee828d6e7d96bcb7a995b1853d5084c2f5a35b&q=${query}`)
    .then(response => {res.json(response.data)});

    
})

app.listen(5000, () => console.log("Server running at port 5000"));