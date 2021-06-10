import {
    SEARCH,
    SEARCH_CLEAR
} from '../types';


export default function(state={}, action){
    switch(action.type){
        case SEARCH:
            return {...state, search: action.payload,  loaded: true}
        case SEARCH_CLEAR:
            return {...state, search: action.payload, loaded: false}
        default: 
            return state;
    }
}