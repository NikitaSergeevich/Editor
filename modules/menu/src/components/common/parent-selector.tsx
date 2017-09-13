import * as React from 'react'

interface Props {
    menu: Menu
    defaultValue: string
    onSelect(id: string): void
}

export default class ParentSelector extends React.Component <Props, null> {

    render(){
        const {menu, defaultValue, onSelect} = this.props
        const options = this.props.menu.child_menus.map(item => (
            <option key={item.id} 
                value={item.id}>
                {item.name}
            </option>
        ))
        options.unshift(<option key={menu.id} value={menu.id}>{menu.name}</option>)
        return (
             <select className="form-control"
                onChange={e=>onSelect(e.target.value)}
                defaultValue={defaultValue}>
                {options}
            </select>
        )
    }
}