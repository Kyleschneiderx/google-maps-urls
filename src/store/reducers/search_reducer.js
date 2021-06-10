import {
    SEARCH
} from '../types';


export default function(state={}, action){
    switch(action.type){
        case SEARCH:
            return {...state, search: action.payload,  loaded: true}
        default: 
            return state;
    }
}