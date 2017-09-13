import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'

import Tile from './tile'
import EditMenu from '../modals/edit-menu'
import NewMenu from '../modals/new-menu'

interface State {
    menuItem: MenuItem
    cell: number
}

interface Props {
    menu: Menu
    path: Array<string>
    actions: Actions.Interface
    visible: boolean
}

export default class MenuTile extends React.Component<Props, State> {

    private menu: MenuState
    private menuItemPrototype:MenuItem
    private size: number

    constructor(props: Props){
        super(props)
        this.size = CONST.MENU_LENGTH
        this.menu  = this.createMenuPrototype(this.size)

        this.state = {
            menuItem: null,
            cell: null
        }
    }

    createMenuPrototype(size:number):Array<MenuItem>{

        const menuItemPrototype = {
            id: '',
            icon: '',
            name: '',
            color: '',
            cell: null,
            products: [],
            product_categories: []
        }

        return Array(size)
            .fill(menuItemPrototype)
            .map((item, idx) => ({...item, cell:idx}))
    }

    showEditModal(menuItem:MenuItem) {
        this.setState({menuItem})
    }

    showNewModal(menuItem:MenuItem) {
        this.setState({cell:menuItem.cell})

    }

    closeEditModal(){
        this.setState({menuItem: null})
    }

    deleteMenuItem(menuItem:MenuItem) {
        this.props.actions.menu.removeMenuItem(menuItem)
    }

    submitEditModal(menuItem:MenuItem){
        this.props.actions.menu.updateMenuItem(menuItem)
    }

    sumitNewMenuHandler(menuItem:MenuItem){
        this.props.actions.menu.createMenuItem(menuItem, this.props.path.slice(-1).pop())
    }

    render(){

        const {menu, path, actions, visible} = this.props

        if(!visible || !menu) return null

        // find out max cell number

        const maxCell = menu.child_menus.reduce((acc,item)=>{
            if(acc<item.cell) return item.cell
            return acc
        },0)

        if(this.size < maxCell) this.size = Math.ceil((maxCell+1)/4)*4

        this.menu = this.createMenuPrototype(this.size)
        const items = this.menu.map((item, idx) => {

            const menuItem = menu.child_menus.find(item => item.cell == idx) || item
            return (
                <Tile key={idx}
                    cell={idx}
                    menuItem={menuItem}
                    onEdit={this.showEditModal.bind(this)}
                    onNew={this.showNewModal.bind(this)}
                    actions={actions}
                />
            )
        })

        return (
            <div className="terminal-menu__wrapper">
                <div className="terminal-menu__content">
                    <div className="terminal-menu__card-list terminal-menu__card-list_full">
                        <div>
                            {items}
                            <NewMenu
                                visible={this.state.cell!=null}
                                menu={menu}
                                path={path}
                                cell={this.state.cell}
                                onClose={()=>this.setState({cell:null})}
                                onSubmit={this.sumitNewMenuHandler.bind(this)}
                            />
                            <EditMenu
                                menu={menu}
                                menuItem={this.state.menuItem}
                                onClose={this.closeEditModal.bind(this)}
                                onDelete={this.deleteMenuItem.bind(this)}
                                onSubmit={this.submitEditModal.bind(this)}
                            />

                        </div>
                    </div>
                </div>
                <div className="terminal-menu__footer">
                    <button className="btn btn-primary btn-sprite_plus-add"
                            onClick={()=>{this.size+=4;this.forceUpdate()}}>
                        {CONST.ADD_ROW}
                    </button>
                </div>
            </div>
        )
    }
}
