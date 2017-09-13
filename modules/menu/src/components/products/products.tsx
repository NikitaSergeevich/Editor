import * as React from 'react'
import ProductItem from './product-item'

interface Props {
    products: Product[]
}
export default class Products extends React.Component<Props, null>{

    render(){
        const {products} = this.props
        if(!products) return null
        const items = products.map((item, idx) => (
            <ProductItem key={item.id}
                         product={item}>
            </ProductItem>
        ))

        return (
            <section className="terminal-menu__submenu-list">
                {items}
            </section>
        )
    }
}