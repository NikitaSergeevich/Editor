import * as React from 'react'
import * as CONST from '../../constants'

import LeftTableHead from './left-table-head'
import LeftTableTitle from './left-table-title'
import LeftTableProductRow from './left-table-product-row'
import LeftTableTurnoverRow from './left-table-turnover-row'

interface Props {
    showTurnover: boolean
    showProduct: boolean
    salesplan: SalesPlan
    planfactreport: PlanFact[]
    toggleTurnover():void
    toggleProduct():void
}
interface State {}

export default class LeftTable extends React.Component<Props, State> {

    render(){

        const {showProduct, showTurnover} = this.props
        if(!this.props.planfactreport) return null

        const goods = this.props.planfactreport
            .filter(item=> item.type=='product' || item.type=='product-tag')
            .map((item,idx)=><LeftTableProductRow key={idx} item={item}/>)

        return (
            <div className="col-xs-6 p-l-none p-r-none pos-s">
                <table className="table table-transparent">
                    <tbody>
                        <LeftTableTitle
                            show={this.props.showTurnover}
                            title={CONST.TXT.TURNOVER}
                            onToggle={this.props.toggleTurnover}
                        />
                        {!showTurnover?null:<LeftTableHead title={CONST.TXT.SALE_POINT}/>}
                        {!showTurnover?null:<LeftTableTurnoverRow
                                salesplan={this.props.salesplan}
                                planfactreport={this.props.planfactreport}
                            />}
                        <LeftTableTitle
                            show={this.props.showProduct}
                            title={CONST.TXT.PRODUCT_REPORT}
                            onToggle={this.props.toggleProduct}
                        />
                        {!showProduct?null:<LeftTableHead
                            title={CONST.TXT.PRODUCT}
                        />}
                        {!showProduct?null:goods}
                    </tbody>
                </table>
            </div>
        )
    }
}