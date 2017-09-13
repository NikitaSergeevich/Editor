import * as React from 'react'

import Cell from '../common/cell'

interface Props {
    item: PlanItem
    onSubmit(planItem:PlanItem): void
}
interface State {}

export default class TurnoverRow extends React.Component<Props, State> {

    render(){
        const {item, onSubmit} = this.props
        const days = item.days.map(day=> (
            <td key={item.id+day.day}
                className="col-xs-1">
                <Cell planItem={item}
                    date={day.day}
                    onSubmit={onSubmit}
                />
            </td>
        ))
        return(
            <tr>{days}</tr>
        )
    }
}