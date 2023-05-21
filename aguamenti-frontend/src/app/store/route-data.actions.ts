import { createAction, props } from '@ngrx/store';

export const changeRoute = createAction('[Overview Component] Change', props<{house?: any}>());