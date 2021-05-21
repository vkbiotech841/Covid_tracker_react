import axios from 'axios';
import { baseApiUrl } from './base_api_url';

// we can consume REST APIs using two of the most popular methods known as Axios (a promise-based HTTP client) and 
// Fetch API (a browser in-built web API). 

// Axios is promise-based and thus we can take advantage of async and await for more readable asynchronous code. We can also intercept and 
// cancel requests, and there’s built-in client side protection against cross site request forgery.

const url = baseApiUrl.covidTracker;

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    };

    // We can use URL method to create a new url object.
    try {
        const finalUrl = new URL(changeableUrl);
        const { data } = await axios.get(finalUrl.href);
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        };
        return modifiedData;
    } catch (error) {
        console.log("error", error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;

    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}