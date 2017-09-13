import * as Actions from '../constants/actions'

const initialState: Array<SalesPlan> = []

export default function salesplanlist (state = initialState, action: Action): Array<SalesPlan>{

    switch(action.type){
        case Actions.FETCH_SALES_PLAN_LIST :   
            if(!action.payload) break
            return action.payload
                .sort((a,b)=>a.created_at-b.created_at) as SalesPlan[]
    }
    return state
}