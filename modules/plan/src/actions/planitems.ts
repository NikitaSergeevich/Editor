import * as Actions from '../constants/actions'
import * as API from '../api'
import * as CONST from '../constants'

export interface Interface {
    fetchPlanItems(id: string): Action
    fetchTurnoverItem(id:string): Action
    fetchTagItems(id:string): Action
    fetchProductItems(id:string): Action
    saveDocument(plan:SalesPlan,items:PlanItem[])
    createPlanItem(item: PlanItem): Action
    updatePlanItem(item: PlanItem): Action
    updatePlanItems(items:PlanItem[]): Action
    removePlanItem(item: PlanItem): Action
    loadFromReport(items:Array<PlanItem>): Action
    loadFromDocument(id:string, type?:string): Action
    cleanPlanItems(): Action
}

export const fetchPlanItems = id => ({ type: Actions.FETCH_PLAN_ITEMS, payload: API.getDocumentItems(id, 'product')})
export const fetchTurnoverItem = id => ({ type: Actions.FETCH_TURNOVER_ITEM, payload: API.getDocumentItems(id, 'sale-point')})
export const fetchProductItems = id => ({ type: Actions.FETCH_PRODUCT_ITEMS, payload: API.getDocumentItems(id, 'product')})
export const fetchTagItems = id => ({ type: Actions.FETCH_TAG_ITEMS, payload: API.getDocumentItems(id, 'product-tag')})
export const saveDocument = (plan,items) => ({type: Actions.BATCH_CREATE_PLAN_ITEMS, payload: API.saveDocument(plan,items)}) 
export const createPlanItem = item => ({type: Actions.CREATE_PLAN_ITEM, payload: item }) 
export const updatePlanItem = item => ({type: Actions.UPDATE_PLAN_ITEM, payload: item })//API.updateDocumentItem(item)})
export const updatePlanItems = items => ({type: Actions.BATCH_UPDATE_PLAN_ITEMS, payload: items })
export const removePlanItem = item => ({type: Actions.REMOVE_PLAN_ITEM, payload: item }) //API.removeDocumentItem(item)})
export const loadFromReport = items => ({type: Actions.LOAD_PLAN_ITEMS_FROM_REPORT, payload: items }) //API.loadReportItems(items)})
export const loadFromDocument = id => ({type: Actions.LOAD_PLAN_ITEMS_FROM_DOCUMENT, payload: API.getDocumentItems(id,'product')})
export const cleanPlanItems = () => ({type: Actions.CLEAN_PLAN_ITEMS }) //, payload:  API.clearDocumentItems()})