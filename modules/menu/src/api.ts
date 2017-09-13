import * as Actions from './actions/types'
import * as CONST from './constants'
import axios from 'axios'
const uuid = require('uuid')

const accessToken =  document.querySelector('meta[name=access-token]').getAttribute('content')
const tenantDomain =  document.querySelector('meta[name=tenant-domain]').getAttribute('content')
const menuID =  document.querySelector('#menu-visual').getAttribute('data-id')

export function loadNomenclature(){

    const options = {
        url: `${CONST.DOMAIN}api/v1/nomenclature/category/info`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function loadMenu(){

    const options = {
        url: `${CONST.DOMAIN}api/v1/terminal-menu/menu/view/${menuID}?scenario=full`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})        
}

export function createMenuItem(menuItem:MenuItem, parentID=menuID): Promise<any> {
    
    const products = menuItem.products.map(v => v.id)
    const product_categories = menuItem.product_categories.map(v => v.id)
    
    const options = {
        url: `${CONST.DOMAIN}api/v1/terminal-menu/menu/create-node/${parentID}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        },
        data: {...menuItem, products, product_categories}
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})      
}

export function updateMenuItem(menuItem:MenuItem): Promise<any> {
    
    const products = menuItem.products.map(v => v.id)
    const product_categories = menuItem.product_categories.map(v => v.id)
    const icon = menuItem.icon_name
    const options = {
        url: `${CONST.DOMAIN}api/v1/terminal-menu/menu/update/${menuItem.id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        },
        data: {...menuItem, products, product_categories, icon }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})      
}

export function deleteMenuItem(menuItem:MenuItem): Promise<any> {
 
    const options = {
        url: `${CONST.DOMAIN}api/v1/terminal-menu/menu/delete/${menuItem.id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => menuItem )
        .catch(error => { throw error})      
}