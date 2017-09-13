import * as React from 'react'

import Cell from '../common/cell'

interface Props {
    num: number
    name: string
    planItem: PlanItem
    onEdit(planItem:PlanItem): void
    onSubmit(planItem:PlanItem): void
}
interface State {}

export default class ProductRow extends React.Component<Props, State> {
    render(){
        return(
            <tr>
                <td className="col-xs-1">{this.props.num}</td>
                <td className="col-xs-9"
                    onClick={()=>this.props.onEdit(this.props.planItem)}>
                    {this.props.name}
                </td>
                <td className="col-xs-2" >
                    <Cell planItem={this.props.planItem}
                        onSubmit={this.props.onSubmit}
                    />
                </td>
            </tr>
        )
    }
}