import * as Actions from '../actions/types'
import {getCurrentMenu} from '../components/menu/utils'

export interface MenuState {
    menu: Menu
    path: Array<string>
}


const initialState: MenuState = {
    menu: null,
    path: []
}

export default function menu(state=initialState, {type, payload}): MenuState {

    switch(type){
        case Actions.DROP_ADDITIONAL_PRODUCT :
        case Actions.DROP_ADDITIONAL_CATEGORY : {
            const {child_menus, products, product_categories} = payload
            if(!!child_menus && !!child_menus.length && (!!products.length || !!product_categories.length)) return {...state}
            const parent =  getCurrentMenu(state.menu, state.path)
            parent.child_menus = parent.child_menus
                .map(item => payload.id == item.id ? payload : item)
                .sort((a,b) => a.cell-b.cell)
            const menu = {...state.menu}
            return {...state, menu }
        }
        case Actions.UPDATE_MENU_ITEM : {
            const {child_menus, products, product_categories} = payload
            if(!!child_menus && !!child_menus.length && (!!products.length || !!product_categories.length)) return {...state}
            const parent =  getCurrentMenu(state.menu, state.path)
            parent.child_menus = parent.child_menus
                .map(item => payload.id == item.id ? payload : item)
                .sort((a,b) => a.cell-b.cell)
            const menu = {...state.menu}
            return {...state, menu }
        }
        case Actions.REMOVE_MENU_ITEM : {
            const parent =  getCurrentMenu(state.menu, state.path)
            parent.child_menus = [...parent.child_menus]
                .filter(item => payload.id != item.id)
                .sort((a,b) => a.cell-b.cell)
            const menu = {...state.menu}
            return {...state, menu }
        }
        case Actions.DROP_CATEGORY : 
        case Actions.DROP_PRODUCT : 
        case Actions.CREATE_MENU_ITEM : {

            const parent = getCurrentMenu(state.menu,state.path)
            parent.child_menus = [...parent.child_menus, payload].sort((a,b) => a.cell-b.cell)
            const menu = {...state.menu}
            return {...state, menu }
        }
        case Actions.CHANGE_MENU_LEVEL : {
            let path = [...state.path, payload]
            if(state.path.includes(payload)){
                const idx = state.path.findIndex(item=>item==payload)
                path = state.path.filter((item,i)=>i<=idx)
            }
            return {...state, path}
         }
        case Actions.FETCH_MENU : {
            const child_menus = payload.child_menus
                .sort((a,b) => a.cell-b.cell)
                .map(item => {
                    // excluded_products cant be null
                   const excluded_products = !item.excluded_products ? [] : item.excluded_products
                   return {...item, excluded_products}
                })
            const menu = {...payload, child_menus}
            const path = [payload.id]
            return {menu, path}
        }
    }

    return state
}
