import * as React from 'react'
import * as CONST from '../../constants'

import LeftTable from './left'
import RightTable from './right'

interface Props {
    salesplan: SalesPlan
    planfactreport: PlanFact[]
}
interface State {
    showProduct: boolean
    showTurnover: boolean
}

export default class ReportBody extends React.Component <Props, State> {

    constructor(props:Props){
        super(props)
        this.state = {
            showProduct: true,
            showTurnover: true
        }
    }
    render(){
        const {salesplan} = this.props
        return (
            <div className="main-content__center">
                <div className="row m-t-lg">
                    <div className="col-xs-4">
                        <span className="form-control">{salesplan.sale_point_name}</span>
                    </div>
                    <div className="col-xs-8">
                        <span className="form-control">
                            {!salesplan.comment?CONST.TXT.COMMENT:salesplan.comment}
                        </span>
                    </div>
                </div>
                <div className="pan m-t-lg">
                    <div className="row">
                        <LeftTable
                            showProduct={this.state.showProduct}
                            showTurnover={this.state.showTurnover}
                            salesplan={this.props.salesplan}
                            planfactreport={this.props.planfactreport}
                            toggleProduct={()=>this.setState(state=>({showProduct:!state.showProduct}))}
                            toggleTurnover={()=>this.setState(state=>({showTurnover:!state.showTurnover}))}
                        />
                        <RightTable
                            salesplan={this.props.salesplan}
                            planfactreport={this.props.planfactreport}
                            showProduct={this.state.showProduct}
                            showTurnover={this.state.showTurnover}
                        />
                    </div>
                </div>


            </div>
        )
    }
}