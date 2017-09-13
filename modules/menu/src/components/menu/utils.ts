const uuid = require('uuid')
import {Interface as MenuActionsInterface} from '../../actions/menu'

import store from '../../store'

export function checkProduct(
    cell: number, 
    menuItem: MenuItem, 
    product: Product, 
    actions: MenuActionsInterface): void{

    if(!menuItem.id){ //create new menuItem from  dropped product
        const item  = { id: uuid(), color: '', icon: '', name: product.name, cell, products: [product], 
            product_categories:[], child_menus:[] }
        const {menu, path} = store.getState().menu as any
        const parentID = getCurrentMenu(menu,path).id
        actions.dropProduct(item, parentID)  
    // } else if(menuItem.product_categories.length > 0) { // its not single product
    } else {
        if(menuItem.products.some(item => item.id == product.id)) return // already exist
        if(!!menuItem.child_menus.length) return // have folders inside
        // if(menuItem.product_categories.some(item => (
        //     item.id == product.product_category_id))) return  //parent category is in the list already
        const products = [...menuItem.products, product]
        actions.dropAdditionalProduct({...menuItem, products})  
    }
}

export function checkCategory(
    cell: number, 
    menuItem: MenuItem,
    category: ProductCategory,
    actions: MenuActionsInterface ): void {

    const {id, color, icon, name, products} = category

    const {menu, path} = store.getState().menu as any

    const parentID = getCurrentMenu(menu,path).id

    if(!menuItem.id){ //create new menuItem from  dropped category
        const product_categories = [{id, color, icon, name, products}]
        const item  = { id: uuid(), color, icon, name, cell, products: [], product_categories, child_menus:[] }
        actions.dropCategory(item, parentID)  
   // } else if(menuItem.product_categories.length > 0){    // add category to the product_categories array 
    } else {
        if(menuItem.product_categories.some(item => item.id == id)) return // already exist
        if(!!menuItem.child_menus.length) return // have folders inside
        const product_categories = [...menuItem.product_categories, {id, color, icon, name, products}]
        actions.dropAdditionalCategory({...menuItem, product_categories})  
    }
}

export function checkMenu(
    cell: number, 
    menuItem: MenuItem,
    menu: MenuItem,
    actions: MenuActionsInterface
): void {

    if(!menuItem.id){ //droped to empty cell
        const item = {...menu, cell}
        actions.updateMenuItem(item)
    } else { // switch tiles
        const item1 = {...menuItem, cell: menu.cell}
        const item2 = {...menu, cell}
        actions.updateMenuItem(item1)
        actions.updateMenuItem(item2)
    }

}

export function createNewMenuItem(menuItem: Menu, path: string[], cell?:number): MenuItem {

    const menu = getCurrentMenu(menuItem,path)

    return {
        id: uuid(),
        icon: null,
        name: null,
        color: null,
        cell: !cell?getFreeCell(menu):cell,
        child_menus: [],
        products: [],
        product_categories: []
    }
}

function getFreeCell(menu:Menu): number {
    const cells = menu.child_menus
        .map(item => item.cell) as Array<number>
    for(let i=0; i < 100; i++) if(!cells.includes(i)) return i
    return null
}


export function getMenuItem(menu:Menu, id:string):Menu{
    if(menu.id == id) return menu
    else if(!menu.child_menus || !menu.child_menus.length) return null
    return menu.child_menus
        .map(item => getMenuItem(item,id))
        .filter(item => !!item)[0] || null
}


export function getMenuName(id: string):string {

    const menu = store.getState().menu['menu']
    const menuItem = getMenuItem(menu,id)
    return !menuItem ? null : menuItem.name
}

export function getCurrentMenu(menu:Menu,path:string[]):Menu {
    if(!path.length) return null
    const id = path[path.length-1]
    return getMenuItem(menu,id)
}