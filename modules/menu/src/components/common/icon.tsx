import * as React from 'react'

interface Props {
    menuItem: MenuItem
}

export default class Icon extends React.Component<Props, null> {
    render(){
        const {menuItem} = this.props
        if(!menuItem || !menuItem.icon) return null
      
        const path:string = menuItem.icon.substring(menuItem.icon.lastIndexOf(" d=\"M") + 4,
            menuItem.icon.lastIndexOf("/>") - 1);
        const color:string = menuItem.color || 'black'
        return (
            <svg x="0" y="0" height="40" width="40" >
                <path d={path} fill={color} stroke="none" />
            </svg>
        )
    }
}