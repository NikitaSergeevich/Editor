import * as React from 'react'
import * as styles from './menu.css'

interface Props {
    visible: boolean
    menu: Array<string>
    onClose(): void
    onSelect?(value:string): void
}
interface State {}

export default class Menu extends React.Component <Props, State> {
    render(){
        if(!this.props.visible) return null
        const menu= this.props.menu.map(item=>(
            <li key={Math.random()}>
                <a href="#" onClick={()=>this.props.onSelect(item)}>
                    {item}
                </a>
            </li>
        ))
        return (
            <div className={styles.container}>
                <div className={styles.overlay} 
                    onClick={this.props.onClose}
                />
                <ul className={"dropdown-menu "+styles.menu}
                    onClick={e=>e.stopPropagation()}>
                    {menu}
                </ul>
            </div>
        )
    }

}