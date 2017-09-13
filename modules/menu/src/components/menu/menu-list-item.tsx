import * as React from 'react'
import * as CONST from '../../constants'
import * as DnD from 'react-dnd'
import * as Actions from '../../actions'
import DropTarget from 'react-dnd/lib/DropTarget'
import { bindActionCreators } from 'redux'
import {checkCategory, checkProduct} from './utils'
import Icon from '../common/icon'

const {connect} = require('react-redux')

interface Props {
    menuItem: MenuItem
    active: boolean
    onSelect(menuItemID:string): void
    actions?: Actions.Interface
    canDrop?: boolean
    isOver?: boolean
    connectDropTarget?: DnD.ConnectDropTarget
}

const boxTarget:DnD.DropTargetSpec<any> = {

    drop(props: Props, monitor:DnD.DropTargetMonitor): void {

        const {menuItem, actions } = props
        const cell = menuItem.cell
        switch(monitor.getItemType()){
            case CONST.CATEGORY :
                const category = monitor.getItem()['category'] as ProductCategory
                checkCategory(cell, menuItem, category, actions.menu)
                break;
            case CONST.PRODUCT :
                const product =  monitor.getItem()['product'] as Product
                checkProduct(cell, menuItem, product, actions.menu)
            default :
        }
    }
}
const collect: DnD.DropTargetCollector = 
    (connect: DnD.DropTargetConnector, monitor:DnD.DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
})
@connect(
    state => ({}),
    dispatch => ({
        actions: {
            menu: bindActionCreators(Actions.Menu as any, dispatch)
        } 
    })
)
@DropTarget([CONST.PRODUCT, CONST.CATEGORY], boxTarget, collect)
export default class MenuListItem extends React.Component <Props, null> {

    shouldComponentUpdate(nextProps){
        return (
            nextProps.menuItem != this.props.menuItem ||
            nextProps.isOver != this.props.isOver ||
            nextProps.canDrop != this.props.canDrop ||
            nextProps.active != this.props.active
        )
    }

    changeMenuLevel(){
        const {id, products, product_categories, products_total, child_menus} = this.props.menuItem
        this.props.onSelect(this.props.menuItem.id)
        if(!!child_menus.length && !products.length && !product_categories.length && !products_total.length && !!id)
            this.props.actions.menu.changeMenuLevel(this.props.menuItem.id)
        return
    }
    
    render(){
        const {menuItem, isOver, canDrop, active} = this.props

        const itemStyle =  [
            isOver && canDrop ? "menu-card menu-card_list menu-card_primary" : "menu-card menu-card_list",
            active ? "active" : ""
        ].join(' ')


        const cardColor = {
            "backgroundColor": menuItem.color
        }

        return this.props.connectDropTarget(
            <div className="menu-card__wrapper">

                <div className={itemStyle}
                    //onClick={()=>this.props.onSelect(menuItem.id)}
                    onClick={this.changeMenuLevel.bind(this)}>

                    <div className="menu-card__icon-folder">
                        {!menuItem.child_menus || !menuItem.child_menus.length?null:<span className="glyphicon glyphicon-level-up"/>}
                    </div>
                    <div className="menu-card__content">
                        <div className="menu-card__text">
                            <span className="col-xs-6">
                                {menuItem.name}
                            </span>
                        </div>
                        <div className="menu-card__icon">
                            <Icon menuItem={menuItem}/>
                        </div>
                    </div>
                </div>
                <div className="menu-card__color" style={cardColor}></div>
            </div>
        )
    }
}