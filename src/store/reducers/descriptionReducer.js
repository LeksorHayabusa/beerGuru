import * as actionTypes from '../actions/actionTypes';

const initialState = {
	item: {}
}

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.GET_ITEM:
			return {
				item: state.item

		}
	}
	return state
}

export default reducer