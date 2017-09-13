import * as React from 'react'
import * as DnD from 'react-dnd'
import DragSource from 'react-dnd/lib/DragSource'
import * as Actions from '../../actions'
import * as CONST from '../../constants'

interface Props {
    selected: boolean
    category: ProductCategory
    actions: Actions.Interface
    isDragging?: boolean
    connectDragSource?: DnD.ConnectDragSource
}

interface DragSourceCategory {
    category: ProductCategory
}

const boxSource: DnD.DragSourceSpec<DragSourceCategory> = {
  beginDrag(props: Props): DragSourceCategory {
    return { category: props.category as ProductCategory }
  }
}

const collect: DnD.DragSourceCollector = 
    (connect: DnD.DragSourceConnector, monitor: DnD.DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
})

@DragSource(CONST.CATEGORY, boxSource, collect)
export default class CategoryItem extends React.Component<Props, null>{

    selectCategoryHandler(){
        const {selected, category, actions} = this.props
        if(selected) actions.category.reset()
        else actions.category.select(category)
    }

    render(){
        const { selected, category, actions, isDragging, connectDragSource} = this.props
        
        const styles = [
            "btn btn-default",
            "terminal-menu__btn",
            selected ? "terminal-menu__btn_transfer" : null
        ].join(' ')

        return connectDragSource(
            <div className={styles}
                onClick={this.selectCategoryHandler.bind(this)}>
                {category.name}
            </div>
        )
    }
}