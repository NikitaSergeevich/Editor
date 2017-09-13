import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    fetchSalesReport(sale_point_id:string): Action
}

export const fetchSalesReport = sale_point_id => ({ type: Actions.FETCH_SALES_REPORT, payload: API.getSalesReport(sale_point_id)})