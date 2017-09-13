import * as Actions from './types'
import * as API from '../api'

export interface Interface {
    fetch(): Action
    removeMenuItem(payload: MenuItem): Action
    updateMenuItem(payload: MenuItem): Action
    dropProduct(menuItem: MenuItem, parentID: string): Action
    dropCategory(menuItem: MenuItem, parentID: string): Action
    dropAdditionalProduct(payload: MenuItem): Action
    dropAdditionalCategory(payload: MenuItem): Action
    createMenuItem(meuItem: MenuItem, parentID?:string): Action
    changeMenuLevel(id:string): Action
}

export const fetch = () => ({ type: Actions.FETCH_MENU, payload: API.loadMenu()})
export const removeMenuItem = payload => ({ type: Actions.REMOVE_MENU_ITEM, payload: API.deleteMenuItem(payload) })
export const updateMenuItem = payload => ({ type: Actions.UPDATE_MENU_ITEM, payload: API.updateMenuItem(payload) })
export const dropProduct =  (menuItem, parentID) => ({ type: Actions.DROP_PRODUCT, payload: API.createMenuItem(menuItem, parentID) })
export const dropCategory = (menuItem, parentID) => ({ type: Actions.DROP_CATEGORY, payload: API.createMenuItem(menuItem, parentID) })
export const dropAdditionalProduct = payload => ({ type: Actions.DROP_ADDITIONAL_PRODUCT, payload: API.updateMenuItem(payload) })
export const dropAdditionalCategory = payload => ({ type: Actions.DROP_ADDITIONAL_CATEGORY, payload: API.updateMenuItem(payload) })
export const createMenuItem = (menuItem, parentID) => ({type: Actions.CREATE_MENU_ITEM, payload: API.createMenuItem(menuItem, parentID)})
export const changeMenuLevel = payload => ({ type: Actions.CHANGE_MENU_LEVEL, payload})