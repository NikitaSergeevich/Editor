import * as Actions from '../constants/actions'
import {shrinkTrimDays} from '../components/utils'
import store from '../store'


const initialState: Array<PlanItem> = []

export default function planitems (state = initialState, action: Action): Array<PlanItem>{
    
    switch(action.type){
        case Actions.CREATE_PLAN_ITEM : 
            return [...state,action.payload]
        case Actions.UPDATE_PLAN_ITEM :
            return state.map(item => item.id != action.payload.id ? item : action.payload)
        case Actions.REMOVE_PLAN_ITEM :
            return state.filter(item => item.id != action.payload.id)
        case Actions.CLEAN_PLAN_ITEMS : 
            return state.filter(item=>item.type=='sale-point').slice(0,1)

        case Actions.BATCH_CREATE_PLAN_ITEMS :
        case Actions.BATCH_UPDATE_PLAN_ITEMS :
            return [...action.payload]

        case Actions.FETCH_TAG_ITEMS :
        case Actions.FETCH_PLAN_ITEMS :
        case Actions.FETCH_PRODUCT_ITEMS :
        case Actions.FETCH_TURNOVER_ITEM :
            return [...state,...action.payload]
            //return Array.isArray(action.payload)?[...state,...action.payload]:[...state,action.payload]

        case Actions.LOAD_PLAN_ITEMS_FROM_DOCUMENT : 
        case Actions.LOAD_PLAN_ITEMS_FROM_REPORT : {
            const period = store.getState().salesplan.period
            const items = shrinkTrimDays(action.payload,period)
                .filter(payload=>!state.some(item=>item.item_id==payload.item_id))
            return [...state, ...items]
        }

        case Actions.UPDATE_SALES_PLAN :
            return state.map(item=>item.type!='sale-point'?item:{...item,item_id:action.payload.sale_point_id})

    }
    return state
}