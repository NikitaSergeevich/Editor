import * as Actions from '../constants/actions'
import {shrinkTrimDays} from '../components/utils'
import store from '../store'


const initialState: Array<PlanFact> = []

export default function planfactreport (state = initialState, action: Action): Array<PlanFact>{
    
    switch(action.type){
        case Actions.FETCH_PLANNNING_REPORTS :
            console.log(action.payload)
            return [...state, ...action.payload]
      
    }
    return state
}