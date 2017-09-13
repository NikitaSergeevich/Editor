import * as Actions from '../constants/actions'
import * as API from '../api'
import * as CONST from '../constants'

export interface Interface {
    fetchProductItems(id: string): Action
    fetchAll(id: string): void
    
}

export const fetchProductItems = id => ({ type: Actions.FETCH_PLANNNING_REPORTS, payload: API.getPlaningReport(id, 'product')})
export const fetchAll = id => {
    return dispatch => {
        ['sale-point','product','product-tag'].forEach(item => { // ToDo: add cashiers
             dispatch({type: Actions.FETCH_PLANNNING_REPORTS, payload: API.getPlaningReport(id, item)})     
        })
    }
}