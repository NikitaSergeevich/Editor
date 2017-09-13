import * as React from 'react'
import * as CONST from '../../constants'
import {toSeconds} from '../utils'

import RightTableItem from './right-table-item' 

interface Props {
    salesplan: SalesPlan
    planfactreport: PlanFact[]
    showProduct: boolean
    showTurnover: boolean
}

export default class RightTable extends React.Component <Props, null> {
    render(){
        const {salesplan, planfactreport, showProduct, showTurnover} = this.props
        if(!salesplan || !planfactreport || !planfactreport.length) return  null
        const days = planfactreport[0].days
        if(!days) return null
        const items = days.map((item, idx)=> <RightTableItem
            key={idx}
            day={''+item.day}
            salesplan={salesplan}
            planfactreport={planfactreport}
            showProduct={showProduct}
            showTurnover={showTurnover}
            />
        )
        return (
            <div className="col-xs-6 p-l-none p-r-none overflow-auto plan__interval">
                <div className="plan__group">
                    {items}
                </div>
            </div>
        )
    }
}