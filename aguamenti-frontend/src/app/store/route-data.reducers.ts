import { createReducer, on } from '@ngrx/store';
import { changeRoute } from './route-data.actions';


export const initialData: {
    house?: any
} = {};
export const RouteDataReducer = createReducer(
    initialData,
    on(changeRoute, (state, { house }) => {
        return { ...state, house };
    })
);