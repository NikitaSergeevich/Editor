import * as React from 'react'
import * as styles from './main.css'
import * as Actions from '../actions'
import * as CONST from '../constants'
import { bindActionCreators } from 'redux'
import {createDays, toSeconds} from '../components/utils'
const {connect} = require('react-redux')


import ReportHeader from '../components/reports/header'
import ReportBody from '../components/reports/body'
import ReportFooter from '../components/reports/footer'

interface Props {
    id: string
    salesplan?: SalesPlan
    planitems?: Array<PlanItem>
    salesreport?: Array<SalesReport>
    salesplanlist?: Array<SalesPlan>
    salepointlist?: Array<SalePoint>
    planfactreport?: Array<PlanFact>
    actions?: Actions.Interface
}

interface State {}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[],
        products: state.products as Product[],
        salesreport: state.salesreport as SalesReport[],
        salesplanlist: state.salesplanlist as SalesPlan[],
        salepointlist: state.salepointlist as SalePoint[],
        planfactreport: state.planfactreport as PlanFact[]
    }),
    dispatch => ({
        actions: {
            salesplan: bindActionCreators(Actions.salesplan as any, dispatch),
            planitems: bindActionCreators(Actions.planitems as any, dispatch),
            products: bindActionCreators(Actions.products as any, dispatch),
            salesreport: bindActionCreators(Actions.salesreport as any, dispatch),
            salesplanlist: bindActionCreators(Actions.salesplanlist as any, dispatch),
            salepointlist: bindActionCreators(Actions.salepointlist as any, dispatch),
            planfactreport: bindActionCreators(Actions.planfactreport as any, dispatch)
        } 
    })
)
export default class ReportScreen extends React.Component <Props, State> {

    componentDidMount(){
        if(!!this.props.id)
            this.props.actions.planfactreport.fetchAll(this.props.id)
    }    

    render(){    
        const {id, salesplan, planfactreport, actions} = this.props
        if(!id || !salesplan || !planfactreport) return null
        return (
            <div className="main-content">
                <ReportHeader
                    salesplan={salesplan}
                    unRegister={()=>actions.salesplan.unregisterSalesPlan(salesplan)}
                />
                <ReportBody
                    salesplan={salesplan}
                    planfactreport={planfactreport}
                />
                <ReportFooter/>
            </div>
        )
    }
}