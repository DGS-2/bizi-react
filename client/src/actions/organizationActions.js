import axios from 'axios';
import { GET_SQUADRONS } from './types';

export const getSquadrons = () => dispatch => {
    axios
        .get('/organizations/squadrons')
            .then(res => {
                dispatch({
                    type: GET_SQUADRONS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_SQUADRONS,
                    payload: null
                });
            });
}