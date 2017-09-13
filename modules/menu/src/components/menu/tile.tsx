import * as React from 'react'
import * as DnD from 'react-dnd'
import DropTarget from 'react-dnd/lib/DropTarget'
import DragSource from 'react-dnd/lib/DragSource'
import * as Actions from '../../actions'
import * as CONST from '../../constants'
import {checkProduct, checkCategory, checkMenu} from './utils'

import Icon from '../common/icon'

const style = require('./tile.css')

interface Props { 
    cell: number
    menuItem: MenuItem
    actions: Actions.Interface
    onEdit(menuItem:MenuItem):void
    onNew(menuItem:MenuItem):void
    canDrop?: boolean
    isOver?: boolean
    connectDropTarget?: DnD.ConnectDropTarget
    connectDragSource?: DnD.ConnectDragSource
}

interface DragSourceMenu {
    menuItem: MenuItem
}

const boxTarget:DnD.DropTargetSpec<any> = {

    drop(props: Props, monitor:DnD.DropTargetMonitor): void {

        const {cell, menuItem, actions } = props
        switch(monitor.getItemType()){
            case CONST.CATEGORY :
                const category = monitor.getItem()['category'] as ProductCategory
                checkCategory(cell, menuItem, category, actions.menu)
                break;
            case CONST.PRODUCT :
                const product =  monitor.getItem()['product'] as Product
                checkProduct(cell, menuItem, product, actions.menu)
                break
            case CONST.MENU :
                const menu = monitor.getItem()['menuItem'] as MenuItem
                checkMenu(cell, menuItem, menu, actions.menu)
            default :
        }
    }
}

const boxSource: DnD.DragSourceSpec<DragSourceMenu> = {
  beginDrag(props: Props): DragSourceMenu {
    return { menuItem: props.menuItem as MenuItem }
  }
}

const collect: DnD.DropTargetCollector = 
    (connect: DnD.DropTargetConnector, monitor:DnD.DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
})

const spread: DnD.DragSourceCollector = 
    (connect: DnD.DragSourceConnector, monitor: DnD.DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
})

@DragSource(CONST.MENU, boxSource, spread)
@DropTarget([CONST.PRODUCT, CONST.CATEGORY, CONST.MENU], boxTarget, collect)
export default class Tile extends React.Component<Props, null>{

    changeMenuLevel(){
        const {id, products, product_categories} = this.props.menuItem
        if(!products.length && !product_categories.length && !!id)
            this.props.actions.menu.changeMenuLevel(this.props.menuItem.id)
        return
    }
    createNewMenuItem(){
        this.props.onNew(this.props.menuItem)
    }

    handleClick(){
        const {id} = this.props.menuItem
        if(!id) this.createNewMenuItem()
        else this.changeMenuLevel()
    }

    render(){

        const { menuItem, canDrop, isOver, connectDropTarget, actions, onEdit, connectDragSource } = this.props
        const isCellOccupied = !!menuItem.id
        const hasChildren = !!menuItem.child_menus&&!!menuItem.child_menus.length
        const isItProduct = menuItem.products_total && menuItem.products_total.length == 1 && !menuItem.product_categories.length
        const text = isCellOccupied ? <div className={style.text}>{menuItem.name}</div> : <div className={style.cell}/>

        const itemStyle = isOver && canDrop ? "menu-card menu-card_primary" : 
            isItProduct? "menu-card" : "menu-card menu-card_default"
        const folderIcon = hasChildren?<span className="glyphicon glyphicon-folder-close"/>:null
        const popUpMenu = <div className="menu-card__control" onClick={e=>e.stopPropagation()}>
                <button className="menu-card__btn"
                        title="Редактировать"
                        onClick={()=>{if(isCellOccupied) onEdit(menuItem)}}>
                    <span className="glyphicon glyphicon-edit"/>
                </button>
                <button className="menu-card__btn"
                        title="Удалить"
                        onClick={()=>{
                            if(window.confirm(CONST.R_U_SURE + menuItem.name + '?'))
                            actions.menu.removeMenuItem(menuItem)}}>
                    <span className="glyphicon glyphicon-trash"/>
                </button>
            </div>
        const cellContent = !isCellOccupied? <span className="glyphicon glyphicon-plus"/> :
            <div className="menu-card__content">
                <div className="menu-card__text">
                    {text}
                </div>
                {popUpMenu}
            </div>
        const cellFooter = !isCellOccupied? null :  <div className="menu-card__footer">
                <div className="price menu-card__price">
                    {folderIcon}
                </div>
                <div className="menu-card__icon">
                    <Icon menuItem={menuItem} />
                </div>
            </div>

        const cardColor = {
            "backgroundColor": menuItem.color
        }
        
        return connectDropTarget(
            connectDragSource(
            <div className="col-xs-3"
                onClick={this.handleClick.bind(this)}>
                <div className={itemStyle}>
                    {cellContent}
                    {cellFooter}
                </div>
                <div className="menu-card__color" style={cardColor}></div>
            </div>
        ))
    }
}