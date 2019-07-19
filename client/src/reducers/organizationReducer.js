import {
    GET_SQUADRONS
} from '../actions/types';

const initialState = {
    wing: null,
    group: null,
    squadrons: null,
    flight: null
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_SQUADRONS:
            return {
                ...state,
                squadrons: action.payload
            };
        default:
            return {
                ...state
            }
    }
}