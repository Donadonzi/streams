import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case 'FETCH_STREAMS':
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case 'FETCH_STREAM':
            return { ...state, [action.payload.id]: action.payload };
        case 'CREATE_STREAM':
            return { ...state, [action.payload.id]: action.payload };
        case 'EDIT_STREAM':
                return { ...state, [action.payload.id]: action.payload };
        case 'DELETE_STREAM':
            return _.omit(state, action.payload);  // Cuz we have passed payload: id in the action creator, so we don't address it as action.payload.id 
        default:
            return state;
    }
};