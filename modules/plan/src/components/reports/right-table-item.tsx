import * as React from 'react'
import {toSeconds} from '../utils'
import RightTableTitle from './right-table-title'
import RightTableHeader from './right-table-header'
import RightTableTurnoverRow from './right-table-turnover-row'
import RightTableRow from './right-table-row'

interface Props {
    day: string
    salesplan: SalesPlan
    planfactreport: PlanFact[]
    showProduct: boolean
    showTurnover: boolean
}

export default class RightTableItem extends React.Component <Props, null> {
    render(){
        const {day, planfactreport, showProduct, showTurnover} = this.props
        if(!planfactreport || !planfactreport.length) return null
        const sec = toSeconds(new Date(this.props.day).getTime())
        
        const goods = planfactreport
            .filter(item=>item.type == 'product' || item.type == 'product-tag')
            .map((item, idx)=><RightTableRow
                    key={idx}
                    day={day}
                    planfactitem={item}
                />)


        return (
            <table className="table table-transparent">
                <tbody>
                    {!showTurnover?<tr><td/></tr>:<RightTableTitle day={sec}/>}
                    {!showTurnover?null:<RightTableHeader/>}
                    {!showTurnover?null:<RightTableTurnoverRow
                        day={this.props.day}
                        planfactreport={this.props.planfactreport}
                    />}
                    {!showProduct?<tr><td/></tr>:<RightTableTitle day={sec}/>}
                    {!showProduct?null:<RightTableHeader/>}
                    {!showProduct?null:goods}
                </tbody>
            </table>
        )
    }
}