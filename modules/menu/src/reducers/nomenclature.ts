import * as Actions from '../actions/types'

const initialState: ProductCategory = {
    id: '',
    icon: '',
    color: '',
    name: '',
    lft: 0,
    rgt: 0,
    depth: 0,
    // child_menus: [], 
    child_categories: [],
    products: []
}

export default function nomenclature(state:ProductCategory = initialState, action: Action): ProductCategory{

    switch(action.type){

        case Actions.FETCH_NOMENCLATURE :
            return action.payload
    }

    return state
}