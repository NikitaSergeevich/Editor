import * as React from 'react'
import * as styles from './header.css'
import * as Actions from '../../actions'
import * as CONST from '../../constants'

import {createDays, shrinkTrimDays, toSeconds} from '../utils'

interface Props {
    salesplan: SalesPlan
    salepointlist: SalePoint[]
    planitems: PlanItem[]
    actions?: Actions.Interface
}
interface State {
   showRegSpinner: boolean
}

export default class Header extends React.Component <Props, State> {
    private period:HTMLInputElement
    private salesPlan:any 

    constructor(props:Props){
        super(props)
        this.salesPlan = {}
        this.state = { showRegSpinner: false}
    }

    componentWillReceiveProps(nextProps){
        if(this.state.showRegSpinner) this.setState({showRegSpinner:false})
    }

    handleRegister(){
        this.setState({showRegSpinner: true}, ()=>{
            const {salesplan, planitems, actions} = this.props
            actions.salesplan.registerSalesPlan(salesplan, planitems)
        })
    }

    getPeriodOptions(){
        const date = new Date()   
        let month:number = date.getMonth(),
            year:number= date.getFullYear()
        return new Array(12)
            .fill(' ')
            .map(_=>{
                const name =`${CONST.month[month]} ${year}`
                const period = toSeconds(new Date(year,month,1).getTime())
                const option = <option key={period} value={period}>{name}</option>
                if(month == 11) { month = 0; year += 1 }
                else month++
                return option
            })
    }

    onSalePointChange(e){
        const sale_point_id = e.target.value
        const sp = this.props.salepointlist.find(point=>point.id == e.target.value)
        const sale_point_name = !sp ? '' : sp.name
        const plan = {...this.props.salesplan, sale_point_id, sale_point_name}
        this.props.actions.salesplan.updateSalesPlan(plan)
    }
    onPeriodChange(e){
        const period = e.target.value
        const items = shrinkTrimDays(this.props.planitems,period)
        this.props.actions.planitems.updatePlanItems(items)
        const plan = {...this.props.salesplan, period}
        this.props.actions.salesplan.updateSalesPlan(plan)
    }

    onPlanNumberChange(e){
        const number = e.target.value
        const plan = {...this.props.salesplan, number}
        this.props.actions.salesplan.updateSalesPlan(plan)
    }

    onCommentChange(e){
        const comment = e.target.value
        const plan = {...this.props.salesplan, comment}
        this.props.actions.salesplan.updateSalesPlan(plan)
    }

    render(){
        if(!this.props.salesplan || !this.props.salepointlist) return null
        const {id, period, sale_point_id, number, user_fio, comment, is_register} = this.props.salesplan
        
        const salePointOptions = this.props.salepointlist.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ))
        const periodOptions = this.getPeriodOptions()

        const sprinner = <span className={"glyphicon glyphicon-refresh "+styles.spinner}/>

        return (
    <div className="main-content__header">
        <div>
            <div className="row">
                <div className="col-xs-3">
                    <div className="row">

                        <div className="col-xs-5">
                            <h1 className="h1 m-none">{CONST.TXT.PLAN}</h1>
                        </div>
                        <div className="col-xs-7">
                            <div className="input-group">
                                <span className="input-group-addon">{CONST.TXT.NUMBER}</span>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder=""
                                    onChange={this.onPlanNumberChange.bind(this)}
                                    defaultValue={number}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-3">
                    <div className="input-group disabled">
                        <span className="input-group-addon">{CONST.TXT.EMPLOYEE}:</span>
                        <input type="text" 
                            className="form-control" 
                            placeholder="" 
                            value={user_fio || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-xs-3">
                    <div className="input-group"><span className="input-group-addon">{CONST.TXT.PERIOD}:</span>
                        <select 
                            className="form-control"
                            onChange={this.onPeriodChange.bind(this)}
                            defaultValue={''+period}>
                            {periodOptions}
                        </select>
                    </div>
                </div>
                <div className="col-xs-3">
                    <button className="btn btn-default pull-right"
                        onClick={this.handleRegister.bind(this)}
                        disabled={!id}>
                        {this.state.showRegSpinner? sprinner:<span className="glyphicon glyphicon-warning-sign"/>}&nbsp;
                        {CONST.TXT.REGISTER}
                    </button>
                    <div className="label label-danger pull-right m-t-sm m-r-lg">{CONST.TXT.NOT_REG}</div>
                </div>
                <br/>
            </div>
        </div>
        <div className="row m-t-lg">
            <div className="col-xs-4">
                <select 
                    className="form-control"
                    onChange={this.onSalePointChange.bind(this)}
                    value={sale_point_id}>
                    {salePointOptions}
                </select>
            </div>
            <div className="col-xs-8">
                <input type="text" 
                    className="form-control" 
                    placeholder={CONST.TXT.COMMENT}
                    onChange={this.onCommentChange.bind(this)}
                    defaultValue={comment}
                />
            </div>
        </div>
    </div>    
        )
    }
}