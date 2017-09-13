import * as React from 'react'
import * as Actions from '../../actions'
import {ADD} from '../../constants'
import {getCurrentMenu} from './utils'

import MenuTile from './menu-tile'
import MenuTree from './menu-tree'
import NewMenu from '../modals/new-menu'
import Path from './path'

interface Props {
    menu: Menu
    path: Array<string>
    actions: Actions.Interface
}
interface State {
    showTiles: boolean
    showNewMenuModal: boolean
}

export default class MenuContainer extends React.Component <Props, State> {

    constructor(props: Props){
        super(props)

        this.state={
            showTiles: true,
            showNewMenuModal: false
        }
    }

    switchScreen(showTiles: boolean){
        this.setState({showTiles})
    }

    sumitNewMenuHandler(menuItem:MenuItem){
        const {menu, path} = this.props
        const curMenu = getCurrentMenu(menu, path)
        if(!curMenu) return
        this.props.actions.menu.createMenuItem(menuItem, curMenu.id)
    }

    submitTitleHandler(title:string){
        const {menu, path} = this.props
        const curMenu = getCurrentMenu(menu, path) as MenuItem
        if(!curMenu) return
        curMenu.name = title
        this.props.actions.menu.updateMenuItem(curMenu)
    }

    render(){

        if(!this.props.menu) return null
        const {showTiles} = this.state
        const menu = getCurrentMenu(this.props.menu,this.props.path)

        const header = (
            <header className="terminal-menu__header">
                <Path 
                    title={menu.name}
                    path={this.props.path}
                    actions={this.props.actions}
                    onSubmit={this.submitTitleHandler.bind(this)}
                />
                {/* <h1 className="h1 terminal-menu__title m-n">{menu.name}</h1>  */}
                <div className="form-group font-null terminal-menu__head-control">
                    <button className="btn btn-primary btn-sprite_plus-add m-r-lg"
                        onClick={()=>this.setState({showNewMenuModal: true})}>
                        {ADD}
                    </button>
                    <div className="btn btn-default terminal-menu__btn_table m-r-sm"
                        data-active={showTiles}
                        onClick={()=>this.switchScreen(true)}>
                    </div>
                    <div className="btn btn-default terminal-menu__btn_list m-r-sm"
                        data-active={!showTiles}
                        onClick={()=>this.switchScreen(false)}>
                    </div>
                </div>
                <NewMenu 
                    visible={this.state.showNewMenuModal}
                    menu={this.props.menu}
                    path={this.props.path}
                    onClose={()=>this.setState({showNewMenuModal:false})}
                    onSubmit={this.sumitNewMenuHandler.bind(this)}
                />
            </header>
        )

        return (
            <section className="terminal-menu__catalog">
                {header}
                <MenuTile
                    menu={menu}
                    path={this.props.path}
                    visible={showTiles}
                    actions={this.props.actions}
                />
                <MenuTree
                    visible={!showTiles}
                    actions={this.props.actions}
                    menu={menu}
                />
            </section>
        )
    }
}
