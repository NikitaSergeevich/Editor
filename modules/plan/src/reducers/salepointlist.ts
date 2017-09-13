import * as Actions from '../constants/actions'

const initialState: Array<SalePoint> = []

export default function salepointlist (state = initialState, action: Action): Array<SalePoint>{

    switch(action.type){
        case Actions.FETCH_SALE_POINT_LIST :   
            return action.payload as SalePoint[]
    }
    return state
}