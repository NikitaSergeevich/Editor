import * as Actions from './constants/actions'
import * as CONST from './constants'
import axios from 'axios'

const accessToken = document.querySelector('meta[name=access-token]').getAttribute('content')
const tenantDomain = document.querySelector('meta[name=tenant-domain]').getAttribute('content')
const headers = {
    'Content-Type': 'application/json',
    'Tenant-Domain': tenantDomain,
    'Access-Token': accessToken
}

export function getDocumentView(id: string){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/view/${id}`,
        method: 'GET',
        headers
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function createDocumentView(plan: SalesPlan){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/create`,
        method: 'POST', headers, 
        data: JSON.stringify(plan)
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function updateDocumentView(plan: SalesPlan){
    const id = plan.id
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/update/${id}`,
        method: 'POST', headers,
        data: JSON.stringify(plan)
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function registerDocumentView(plan: SalesPlan){
    const id = plan.id
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/register/${id}`,
        method: 'POST', headers
    }
    return axios(options)
        // .then(response => ({...plan, is_register: true}))
        .then(_=> document.location.href=document.location.origin+'/planning/document')
        .catch(error => { 
            return ({...plan, is_register: false})
            // throw error
        }) //({...plan, is_register: true}))
}

export function unregisterDocumentView(plan: SalesPlan){
    const id = plan.id
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/un-register/${id}`,
        method: 'POST', headers
    }
    return axios(options)
        .then(response => ({...plan, is_register: false}))
        .catch(error => { throw error})
}


export function getDocumentItems(id:string, type:string){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/${id}/document-item/${type}?per-page=10000`,
        method: 'GET', headers
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function getNomenclature(){

    const options = {
        url: `${CONST.DOMAIN}api/v1/nomenclature/category/info`,
        method: 'GET', headers
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function getSalesReport(sale_point_id: string){

    const today = new Date()
    const y = today.getFullYear()
    const m = today.getMonth()
    const dateFrom = `1.${m-6}.${y}`
    const dateTo = `1.${m+1}.${y}`
    const options = {
        url: `${CONST.DOMAIN}api/v1/sales/report/sale-point?date_accepted_from=${dateFrom}&date_accepted_to=${dateTo}&sale_point_ids[]=${sale_point_id}`,
        method: 'GET', headers
    }
    return axios(options)
        .then(response => response.data[sale_point_id])
        .catch(error => { throw error})
}

export function getPlaningReport(id: string, type:string){

    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/report/${id}/${type}?reportType=amount`,
        method: 'GET', headers
    }
    return axios(options)
        .then(response => response.data.map(item=>({...item,type, plan: Number(item.plan), fact:Number(item.fact)})))
        .catch(error => { throw error})
}

export function getDocumentList(){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/list?per-page=10000`,
        method: 'GET', headers
    }
    return axios(options)
        .then(response=>response.data)
        .catch(error => { throw error})
}

export function getSalePointList(){
    const options = {
        url: `${CONST.DOMAIN}api/v1/structure/sale-point/list`,
        method: 'GET', headers
    }
    return axios(options)
        .then(response=>response.data)
        .catch(error => { throw error})
}

export function getProductTagList(){
    const options = {
        url: `${CONST.DOMAIN}api/v1/nomenclature/product-tag/list`,
        method: 'GET', headers
    }
    return axios(options)
        .then(response=>response.data)
        .catch(error => { throw error})
}


function clearDocumentItems(id:string){
    if(!id) return Promise.resolve([])
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/clear/${id}`,
        method: 'GET', headers
    }
    return axios(options)
        .then(response => [])
        .catch(error => { throw error})
}

function batchCreateDocumentItems(items: PlanItem[]){

    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document-item/batch-create`,
        method: 'POST', headers,
        data: JSON.stringify({items})
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}


export function saveDocument(plan:SalesPlan, items:PlanItem[]){
    if(!plan.id){
        return createDocumentView(plan)
            .then(response=>{
                const planning_document_id = response.id
                const planItems = items.map(item=>({...item, planning_document_id}))
                return batchCreateDocumentItems(planItems)
            })
    }
    updateDocumentView(plan)
    return clearDocumentItems(plan.id)
        .then(_=>batchCreateDocumentItems(items))
}

export function registerDocument(plan:SalesPlan, items:PlanItem[]){
    return saveDocument(plan,items)
        .then(_=>registerDocumentView(plan))
}


// export function createTurnoverItem(item: PlanItem){
//     return getDocumentItems(item.planning_document_id, 'sale-point')
//         .then(result=>!result.length ? createDocumentItem(item) : Promise.resolve(result))
//         .then(result=>result)
//         .catch(error => {throw error})

// export function createDocumentItem(item: PlanItem){
//     const options = {
//         url: `${CONST.DOMAIN}api/v1/planning/document-item/create`,
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Tenant-Domain': tenantDomain,
//             'Access-Token': accessToken
//         },
//         data: JSON.stringify(item)
//     }
//     return axios(options)
//         .then(response => response.data)
//         .catch(error => { throw error})
// }

// export function updateDocumentItem(item: PlanItem){
//     const options = {
//         url: `${CONST.DOMAIN}api/v1/planning/document-item/update/${item.id}`,
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Tenant-Domain': tenantDomain,
//             'Access-Token': accessToken
//         },
//         data: JSON.stringify(item)
//     }
//     return axios(options)
//         .then(response => response.data)
//         .catch(error => { throw error})
// }

// export function removeDocumentItem(item: PlanItem){
//     const options = {
//         url: `${CONST.DOMAIN}api/v1/planning/document-item/delete/${item.id}`,
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Tenant-Domain': tenantDomain,
//             'Access-Token': accessToken
//         }
//     }
//     return axios(options)
//         .then(_=>item)
//         .catch(error => { throw error})
// }
            
// }