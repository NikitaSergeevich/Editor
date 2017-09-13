import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './products-table.css'
import { bindActionCreators } from 'redux'
import {createDays, getDaysCount} from '../utils'
const {connect} = require('react-redux')

import TurnoverRow from './turnover-row'
import Cell from '../common/cell'
import DayHead from '../common/dayhead'

interface Props {
    salesplan?: SalesPlan
    planitems?: PlanItem[]
    actions?: Actions.Interface
}
interface State {}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[]
    }),
    dispatch => ({
        actions: {
            planitems: bindActionCreators(Actions.planitems as any, dispatch)
        } 
    })
)

export default class RightTable extends React.Component <Props, State> {
    render(){
        const {planitems, salesplan,  actions} =this.props
        if(!planitems ) return null
        const daysCount = getDaysCount(salesplan.period)
        const plangoods = planitems.filter(v=>v.type!='sale-point')
        const turnoverItem = planitems.filter(v=>v.type=='sale-point')[0] // ToDo: Check errors
        if(!turnoverItem) return null
        const dayHeaders= turnoverItem.days
            .map(d=><th key={d.day}><DayHead value={d.day}/></th>)
        
        const productItems = plangoods.map((item,idx)=>(
            <TurnoverRow key={idx} item={item} onSubmit={actions.planitems.updatePlanItem}/>
        ))
        

       
        return (
            <table className="table table-transparent">
                <tbody>
                     <tr className="vertical-middle">
                        <th className="col-xs-10" colSpan={daysCount}>
                            <h2>&nbsp;</h2>
                        </th>
                    </tr>
                    <tr>{dayHeaders}</tr>
                    <TurnoverRow 
                        item={turnoverItem} 
                        onSubmit={this.props.actions.planitems.updatePlanItem}
                    />
                    <tr className="vertical-middle">
                        <th className="col-xs-10" colSpan={daysCount}>
                            <h2>&nbsp;</h2>
                        </th>
                    </tr>
                    <tr>{dayHeaders}</tr>
                    {productItems}
                </tbody>
            </table>
        )
    }

}
