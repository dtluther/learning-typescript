// With consumers
const fetch = require('node-fetch');
const { log } = require('console');

const url = "https://api.covid19api.com/summary";

const fetchWithThen = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(body => {
            console.log(typeof body)
            Object.values(body.Countries).forEach(record => {
                log(record.Country);
            })
        })
    }

const asyncFetch = async (url) => {
    const response = await fetch(url);
    body = await response.json()
    Object.values(body.Countries).forEach(record => {
        log(record.Country);
    })
}

fetchWithThen(url)
asyncFetch(url);