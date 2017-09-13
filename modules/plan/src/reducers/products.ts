import * as Actions from '../constants/actions'

const initialState: Array<Product> = []

export default function products (state = initialState, action: Action): Array<Product>{

    switch(action.type){
        case Actions.FETCH_PRODUCTS :
            if(!action.payload.child_categories) break
            const products = action.payload.child_categories
                .map(item => item.products)
                .reduce((acc, item) => [...acc, ...item]) 
                .map(({id,name, price, cost_price})=>({id, name, price, cost_price, type:'product'})) as Array<Product>
            return [...state, ...products]
        case Actions.FETCH_PRODUCT_TAGS :
            const tags = action.payload.map((item:ProductTag)=>(
                {
                    id: item.id,
                    name: item.name,
                    price: item.productsPrice,
                    cost_price: item.productsCostPrice,
                    type: 'product-tag'
                } as Product 
            ))
            return [...state, ...tags]
    }
    return state
}