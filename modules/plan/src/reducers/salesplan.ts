import * as Actions from '../constants/actions'



const initialState: SalesPlan = null

export default function salesplan (state = initialState, action: Action): SalesPlan{

    switch(action.type){
        case Actions.REGISTER_SALES_PLAN :
        console.log(action.payload)
        case Actions.FETCH_SALES_PLAN :   
        case Actions.UPDATE_SALES_PLAN :
        case Actions.UNREGISTER_SALES_PLAN :
        case Actions.SAVE_SALES_PLAN :
        case Actions.CREATE_SALES_PLAN :
            return {...state,...action.payload} as SalesPlan
 
    }
    return state
}