import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    fetchSalesPointList(): Action
}

export const fetchSalesPointList = () => ({ type: Actions.FETCH_SALE_POINT_LIST, payload: API.getSalePointList()})