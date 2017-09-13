import * as React from 'react'
import * as styles from './footer.css'
import * as Actions from '../../actions'
import * as CONST from '../../constants'
import {createDays} from '../utils'

import Loader from './loader'

interface Props {
    salesplan: SalesPlan
    planitems: Array<PlanItem>
    actions: Actions.Interface
}
interface State {
    showSaveSpinner: boolean
}

export default class Footer extends React.Component<Props, State> {

    constructor(props:Props){
        super(props)

        this.state = {
            showSaveSpinner: false
        }
    }
    
     componentWillReceiveProps(nextProps){
        if(!nextProps.salesplan.id){
            const id = nextProps.planitems[0].planning_document_id
            if(!id) return
            this.props.actions.salesplan.fetchSalesPlan(id)
        }
        if(this.state.showSaveSpinner) this.setState({showSaveSpinner:false})
    }
   
    handleSubmit() {
        
        this.setState({showSaveSpinner: true}, ()=>{
            const {actions, salesplan, planitems} = this.props
            const items = this.checkPlanItems(planitems)
            actions.planitems.saveDocument(salesplan,items)
        })
    }

    checkPlanItems(items: PlanItem[]):PlanItem[]{
        const newPlan = {
            item_id: this.props.salesplan.sale_point_id,
            planning_document_id: this.props.salesplan.id,
            plan: 0, type: 'sale-point', percent: 0,
            days: createDays(this.props.salesplan.period,false, 0)
        } as PlanItem
        const turnover = items.find(item=>item.type=='sale-point')
        return !turnover ? [...items, newPlan]:items
    }

    render(){
        if(!this.props.salesplan || !this.props.planitems) return null
        const{is_register} = this.props.salesplan
        const sprinner = <span className={"glyphicon glyphicon-refresh "+styles.spinner}/>
        return (

        <div className="main-content__footer">
                <div className="row">
                  <div className="col-xs-6">
                    <Loader/>&nbsp;
                    <button 
                        className="btn btn-danger"
                        onClick={this.props.actions.planitems.cleanPlanItems}>
                        <span className="glyphicon glyphicon-trash"/>&nbsp;
                        {CONST.TXT.CLEAN}
                    </button>
                  </div>
                  <div className="col-xs-6">
                    <button className="btn btn-primary pull-right"
                        onClick={this.handleSubmit.bind(this)}>
                        {this.state.showSaveSpinner? sprinner:<span className="glyphicon glyphicon-ok"/>}&nbsp;
                        {CONST.TXT.SAVE}
                    </button>
                    <button className="btn btn-default sprite_delete pull-right m-r-sm"
                        onClick={e=>{document.location.href=document.location.origin+'/planning/document'}}>
                        <span className="glyphicon glyphicon-arrow-left"/>&nbsp;
                        {CONST.TXT.BACK}
                    </button>
                  </div>
                </div>
              </div>
        )
    }

}