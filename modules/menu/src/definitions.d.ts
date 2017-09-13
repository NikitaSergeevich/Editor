declare interface Action {
    type: string
    payload?: any
}

declare interface Product {
    id: string
    name: string
    product_category_id: string
    description: string
    price: number
    measure: string
}

declare interface ProductCategory {
    id: string
    icon: string
    color: string
    name: string
    lft?: number
    rgt?: number
    depth?: number
    child_menus?: ProductCategory[]
    child_categories?: ProductCategory[]
    products?: Product[]
}

declare interface ProductTotal {
    id: string
    name: string
    product_category_id: string
    short_name: string
    description: string
    price: number
    price_cost: number
    measure: string
}

declare interface MenuItem {
    id: string
    child_menus: Array<MenuItem>
    icon: string
    icon_name?: string
    name: string
    color: string
    cell: number
    products: Array<Product>
    product_categories: Array<ProductCategory>
    products_total?: Array<ProductTotal>
    excluded_products?: Array<Product>
}

declare type MenuState = Array<MenuItem>

declare interface Menu {
    id: string
    name: string
    cell: number
    child_menus: MenuState
}