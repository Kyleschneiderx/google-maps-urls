import axios from 'axios';
import {
    SEARCH,
    SEARCH_CLEAR,
    URL_UPLOAD,
    EMPTY_URL
} from '../types'
const cheerio = require("cheerio")
var Scraper = require("email-crawler");




/*=============Search=================*/
export async function search({state, search}){

    // console.log(search.replace(' ', '%20'))
    // console.log(state + ' ' + search)

    const vgmUrl= `https://localistica.com/usa/${state}/zipcodes/most-populated-zipcodes/`;

    let top_50=[];
    const url = await axios.get(vgmUrl)
    const dom = cheerio.load(url.data, { ignoreWhitespace: true })
    let data =[]
    dom('table tr td:nth-child(1)').each((i, elem) => {
        data.push({
          title : dom(elem).text().substr(19,5),
        });
    });
    console.log(data);
    // console.log(dom.window.document.querySelector(`#dgZipCodes > tbody > tr:nth-child(2) > td:nth-child(1) > a`).textContent);

    // let i;
    // for(i=2; i<102; i++){
    //     console.log(dom.window.document.querySelector(`#dgZipCodes > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).textContent);
    //     top_50.push(dom.window.document.querySelector(`#dgZipCodes > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).textContent)
    // }

    var place_website_list=[];
    var places_id_list = [];
    let z = 1;
    for(z; z<=data.length; z++){
        try {
            console.log(data[z].title)
            const search1 = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data[z].title}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            // console.log(search.data.results[0].geometry.location.lat + ',' + search.data.results[0].geometry.location.lng )
            // coords_list.push(search.data.results[0].geometry.location.lat + ',' + search.data.results[0].geometry.location.lng)
            const search_term = search.replace(' ', '%20')
            const result_by_location = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${search1.data.results[0].geometry.location.lat + ',' + search1.data.results[0].geometry.location.lng}&radius=50000&keyword=${search.replace(' ', '%20')}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            let i=0;
            while (i < result_by_location.data.results.length) {
                // console.log(result_by_location.data.results[i].place_id)
                places_id_list.push(result_by_location.data.results[i].place_id)
                i++;
            }

        } catch(e) { // Missing this
            console.error(e);
            // console.log('error') 
        }


        // coords_list.push(search.data.results[0].geometry.location.lat + ',' + search.data.results[0].geometry.location.lng )
    }
    // console.log(places_id_list)
    let uniqueChars = [...new Set(places_id_list)];
    // console.log(uniqueChars)
    var email_list=[];
    var k;
    for (k = 0; k < uniqueChars.length; k++) {
        try{
            const detail = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${uniqueChars[k]}&fields=name,rating,formatted_phone_number,website&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            console.log(detail.data.result.website)
            place_website_list.push(detail.data.result.website)
        } catch(e){
            console.error(e);
            // console.log('error') 
        }

    }
    const request = [...new Set(place_website_list.filter(Boolean))]

    
    
    console.log(request.length)

    // for (let x = 0; x < 30 ; x++) {
    //     console.log("hello")
    //     try{
    //         const email = await axios.get(`https://api.hunter.io/v2/domain-search?domain=${request[x]}&api_key=${process.env.REACT_APP_HUNTER_API_KEY}`)
    //         console.log(email)
    //         console.log(x)
    //         email_list.push(email.data)
    //     } catch(e){
    //         console.error(e);
    //         console.log('error') 
    //     }

    // }

    console.log(email_list)


    return{
        type: SEARCH,
        payload:request
    }

}



export async function csvUpload(urls){
    console.log(urls.Urls)
    var data = []
    var data_by_url = []
    try{

        for(let i =0 ; i<urls.length; i++){
            console.log(urls[i].Urls)
            var emailscraper = new Scraper(urls[i].Urls);
            const email = await emailscraper.getLevels(2)
            console.log(email)
            for(let k=0; k<email.length; k++){
                console.log(email[k])
                data.push(email[k])
                
            }
            console.log(email)
            data_by_url.push({'url': urls[i].Urls, 'emails': email })
        }
        console.log(data)
    }catch(e){
        console.error(e)
    }

    return{
        type: URL_UPLOAD,
        payload: data
    }

}

export function emptyUrl(search){
    return{
        type: EMPTY_URL,
        payload: null
    }
}

export function clearSearch(search){
    return{
        type: SEARCH_CLEAR,
        payload: null
    }
}