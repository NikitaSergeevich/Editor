import * as React from 'react'
import * as Actions from '../actions'
import * as CONST from '../constants'
import { bindActionCreators } from 'redux'
import DragDropContext from 'react-dnd/lib/DragDropContext'
import {default as HTML5Backend} from 'react-dnd-html5-backend'
import Categories from '../components/categories'
import Products from '../components/products'
import MenuContainer from '../components/menu'

const {connect} = require('react-redux')

interface Props {

    nomenclature?: ProductCategory
    category?: ProductCategory
    menu?: Menu
    path?: Array<string>
    menuItem?: MenuItem
    actions?: Actions.Interface

}

@connect(
    state => ({
        nomenclature: state.nomenclature as ProductCategory,
        category: state.category.current as ProductCategory,
        menu: state.menu.menu as Menu,
        path: state.menu.path as Array<string>
    }),
    dispatch => ({
        actions: {
            nomenclature: bindActionCreators(Actions.Nomenclature as any, dispatch),
            category: bindActionCreators(Actions.Category as any, dispatch),
            menu: bindActionCreators(Actions.Menu as any, dispatch)
           // path: bindActionCreators(Actions.Path as any, dispatch)
        } 
    })
)
@DragDropContext(HTML5Backend)
export default class Main extends React.Component<Props, null> {

    constructor(props: Props){
        super(props)

        props.actions.menu.fetch()
        props.actions.nomenclature.fetch()
    }

    render(){

        const {nomenclature, category, menu, path, menuItem, actions} = this.props

        if(!nomenclature || !menu ) return  <div className="refresh-animate block-center"></div>
        const products = category ? category.products : null
    
        return (
            <section className="terminal-menu">
                <Categories 
                    current={category}
                    actions={actions}
                    nomenclature={nomenclature}
                />
                <Products products={products}/>
                <MenuContainer 
                    actions={actions}
                    menu={menu} 
                    path={path}
                />
            </section>
        )
    }
}