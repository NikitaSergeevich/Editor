import * as React from 'react'
import * as constants from '../../constants'
import CategoryItem from './category-item'
import * as Actions from '../../actions'

interface Props {
    current: ProductCategory
    nomenclature: ProductCategory
    actions: Actions.Interface
}

export default class Categories extends React.Component<Props, null> {

    render(){

        const {nomenclature, current, actions} = this.props
        
        const items = nomenclature.child_categories.map(item => (
            <CategoryItem 
                selected={!current?false:current.id==item.id}
                key={item.id}
                category={item}
                actions={actions} 
            />
        ))
      
        return (
            <section className="terminal-menu__menu-list">
                {items}
            </section>
        )
    }
}