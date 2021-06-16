import {
    SEARCH,
    SEARCH_CLEAR,
    URL_UPLOAD
} from '../types';


export default function(state={}, action){
    switch(action.type){
        case SEARCH:
            return {...state, search: action.payload,  loaded: true}
        case SEARCH_CLEAR:
            return {...state, search: action.payload, loaded: false}
        case URL_UPLOAD:
            return {...state, urls: action.payload, finished: true}
        default: 
            return state;
    }
}