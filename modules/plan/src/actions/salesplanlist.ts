import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    fetchSalesPlanList(): Action
}

export const fetchSalesPlanList = () => ({ type: Actions.FETCH_SALES_PLAN_LIST, payload: API.getDocumentList()})