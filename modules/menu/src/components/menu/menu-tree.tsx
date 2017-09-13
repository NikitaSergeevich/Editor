import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import CategoryForm from './category-form'
import MenuListItem from './menu-list-item'

interface Props {
    visible: boolean
    menu: Menu
    actions: Actions.Interface
}
interface State {
    menuItemID: string
}

export default class MenuTree extends React.Component <Props, State> {

    constructor(props:Props){
        super(props)
        this.state = { menuItemID: null }
    }

    render(){
         const {menu, actions, visible} = this.props

        if(!visible) return null

        const list = this.props.menu.child_menus
            .map(item => <MenuListItem
                key={item.id}
                active={item.id == this.state.menuItemID}
                menuItem={item}
                onSelect={menuItemID=>this.setState({menuItemID})}
        />)

        const categoryForm = !this.state.menuItemID ? null
            : <CategoryForm
                    actions={actions}
                    menu={menu}
                    menuItemID={this.state.menuItemID}
                    onClose={()=>this.setState({menuItemID:null})}
                />

        return (
            <div className="row terminal-menu__content">
                <section className="terminal-menu__card-list">
                    {list}
                </section>
                <section className="terminal-menu__form">
                    {categoryForm}
                </section>
            </div>
        )
    }
}
