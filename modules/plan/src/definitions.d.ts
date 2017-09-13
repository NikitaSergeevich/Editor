declare interface Action {
    type: string
    payload?: any
}

declare interface Product {
    id: string
    name: string
    price?: number
    type?: 'product-tag' | 'product'
    cost_price?: number
    // short_name: string
    // product_category_id: string
    // description: string
    // measure: string
    // status: 'enabled' | 'disabled'
}

declare interface SalesPlan {
    id: string
    number?: string
    name?: string
    period: number // data unix time
    comment: string
    is_register?: boolean // could be null
    sale_point_id?: string
    sale_point_name?: string
    user_fio?: string
}

declare interface Days {
    day: number
    plan: number
    fact?: number
}

declare interface PlanItem {
    id?: string  // 
    item_id: string // product ID
    planning_document_id: string // plan id
    type: 'product' | 'product-tag' | 'sale-point'
    plan: number // quantity
    days: Array<Days> // ? date, quantity
    percent?: number // ?s
    // price?: number
    // cost_price?: number
    tenant_id?: string   // google_id
    created_at?: number
    updated_at?: number
    status?: 'enabled' | 'disabled'
}

declare interface SalesReport {
    product_id: string
    cost: string
    total_cost: number
    discount_percent: string
    quantity: number
    date?: string
}

declare interface SalePoint {
    id: string
    name: string
    address?: string
    phone_number?: string
}

declare interface ProductTag {
    id: string
    name: string
    productsCostPrice: number
    productsPrice: number
}

declare interface PlanFact {
    item_name: string
    type: string
    plan: number
    fact: number
    days: Array<Days>
}

/*
{
  "id": "ef9274c9-f283-4c3d-a8f9-3c395985aa5e",
  "item_id": "ef9274c9-f283-4c3d-a8f9-3c395985aa5e",
  "planning_document_id": "ef9274c9-f283-4c3d-a8f9-3c395985aa5e",
  "tenant_id": "ef9274c9-f283-4c3d-a8f9-3c395985aa5e",
  "plan": 0,
  "type": "product",
  "percent": 0,
  "price": 0,
  "cost_price": 0,
  "days": [
    {
      "day": 0,
      "plan": 0
    }
  ],
  "created_at": 0,
  "updated_at": 0,
  "status": "enabled"
}
*/