import axios from 'axios';
import {
    SEARCH
} from '../types'
// const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;




/*=============Search=================*/
export async function search({state, search}){

    console.log(search.replace(' ', '%20'))

    const vgmUrl= `https://localistica.com/usa/${state}/zipcodes/most-populated-zipcodes/`;

    let top_50=[];
    const url = await axios.get(vgmUrl)
    const dom = new JSDOM(url.data)
    console.log(dom.window.document.querySelector(`#dgZipCodes > tbody > tr:nth-child(2) > td:nth-child(1) > a`).textContent);

    let i;
    for(i=2; i<52; i++){
        console.log(dom.window.document.querySelector(`#dgZipCodes > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).textContent);
        top_50.push(dom.window.document.querySelector(`#dgZipCodes > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).textContent)
    }

    let wed=[];
    let coords_list = [];
    var place_website_list=[];
    var places_id_list = [];
    let z = 1;
    for(z; z<=top_50.length; z++){
        // const search = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${z}&key=AIzaSyBLNweAWL0C8ZQaoZ3S_AkPINbJhsiD7p8`)
        try {
            const search = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${top_50[z]}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            // console.log(search.data.results[0].geometry.location.lat + ',' + search.data.results[0].geometry.location.lng )
            // coords_list.push(search.data.results[0].geometry.location.lat + ',' + search.data.results[0].geometry.location.lng)
            const result_by_location = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${search.data.results[0].geometry.location.lat + ',' + search.data.results[0].geometry.location.lng}&radius=50000&keyword=${search.replace(' ', '%20')}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            let i=0;
            while (i < result_by_location.data.results.length) {
                console.log(result_by_location.data.results[i].place_id)
                places_id_list.push(result_by_location.data.results[i].place_id)
                i++;
            }

        } catch(e) { // Missing this
            console.error(e);
            console.log('error') 
        }


        // coords_list.push(search.data.results[0].geometry.location.lat + ',' + search.data.results[0].geometry.location.lng )
    }
    console.log(places_id_list)
    let uniqueChars = [...new Set(places_id_list)];
    console.log(uniqueChars)
    var k;
    for (k = 0; k < uniqueChars.length; k++) {
        const detail = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${uniqueChars[k]}&fields=name,rating,formatted_phone_number,website&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        console.log(detail.data.result.website)
        place_website_list.push(detail.data.result.website)
    }
    const request = place_website_list.filter(Boolean)


    return{
        type: SEARCH,
        payload:request
    }

}