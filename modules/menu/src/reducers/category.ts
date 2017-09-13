import * as Actions from '../actions/types'

export interface CategoryReducer {
    current: ProductCategory
}

const initialState: CategoryReducer = {
    current: null 
}

export default function category (state = initialState, action: Action): CategoryReducer{

    switch(action.type){
        case Actions.SELECT_CATEGORY :   
            return {current: action.payload} as CategoryReducer
        case Actions.RESET_CATEGORY :
            return {current: null}
    }
    return state
}