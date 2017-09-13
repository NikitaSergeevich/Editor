import * as React from 'react'
import * as styles from './icon-picker.css'
import {DOMAIN} from '../../constants'

// TODO: IconPicker preload icons 

interface Props {
    visible: boolean
    icons: Array <string>
    onSelect(icon: string): void
}
export default class IconPicker extends React.Component <Props, null> {
    private images:Array<any>
    constructor(props: Props) {
        super(props)
        this.images = []
        
        props.icons.forEach(icon => {
            const image = new Image()
            image.src=`${DOMAIN}img/${icon}.svg`
            this.images.push(image)
        })
    
    }
    render(){
        const {icons, visible, onSelect} = this.props
        const style = visible ? {visibility: 'visible'} : {visibility: 'hidden'}
        const items = icons.map(icon => (
             <img key={icon}
                className={styles.icon}
                onClick={()=>onSelect(icon)}
                src={`${DOMAIN}img/${icon}.svg`} 
            />
        ))
        return (
            <div className={styles.container} style={style}>
                <div className={styles.overlay} 
                    onClick={()=>onSelect(null)}
                />
                <div className={styles.modal}>{items}</div>
            </div>
        )
    }
}