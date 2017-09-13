import * as React from 'react'
import * as DnD from 'react-dnd'
import DragSource from 'react-dnd/lib/DragSource'
import * as CONST from '../../constants'

const style = require('./product-item.css')

interface Props {
    product: Product
    connectDragSource?: (Element: any) => any
    isDragging?: boolean
}

interface DragSourceProduct {
    product: Product
}

const boxSource: DnD.DragSourceSpec<DragSourceProduct> = {
  beginDrag(props: Props): DragSourceProduct {
    return { product: props.product as Product }
  }
}

const collect: DnD.DragSourceCollector = 
    (connect: DnD.DragSourceConnector, monitor:DnD.DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
})

@DragSource(CONST.PRODUCT, boxSource, collect)
export default class ProductItem extends React.Component<Props, null>{

    render(){
        const { product, isDragging, connectDragSource } = this.props
        const opacity = isDragging ? 0.4 : 1

        return connectDragSource(
            <div className="terminal-menu__btn terminal-menu__btn_submenu" style={{opacity}}>
                {product.name}
            </div>
        )
    }
}