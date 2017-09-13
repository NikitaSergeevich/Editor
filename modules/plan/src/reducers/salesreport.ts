import * as Actions from '../constants/actions'
import * as CONST from '../constants'

const initialState: Array<SalesReport> = []

export default function salesreport (state = initialState, action: Action): Array<SalesReport>{

    switch(action.type){
      
        case Actions.FETCH_SALES_REPORT : 
            return Object.getOwnPropertyNames(action.payload)
                .map(date=>action.payload[date].map(item=>({
                        ...item, 
                        date: date.substr(0,7),
                        total_cost: Number(item.total_cost), 
                        quantity: Number(item.quantity)
                    })))
                .reduce((acc,item)=>[...acc,...item],[])
                .reduce((acc, item) => {
                    const product = acc.find(v => v.product_id == item.product_id && v.date == item.date)
                    if(!product) return [...acc, ...item] 
                    product.quantity += item.quantity
                    product.total_cost += item.total_cost 
                    return acc },[]) as Array<SalesReport>
        
    }
    return state
}