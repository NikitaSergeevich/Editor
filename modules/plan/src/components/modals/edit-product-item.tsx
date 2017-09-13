import * as React from 'react'
import * as styles from './edit-product-item.css'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
import {createDays} from '../utils'
const {connect} = require('react-redux')

interface Props {
    planItem: PlanItem
    visible: boolean
    onClose():void
    salesplan?: SalesPlan
    planitems?: PlanItem[]
    products?: Product[]
    actions?: Actions.Interface
}
interface State {
    arrange: boolean
    productRadio
}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[],
        products: state.products as Product[]
        // salesreport: state.salesreport as SalesReport[]
    }),
    dispatch => ({
        actions: {
            salesplan: bindActionCreators(Actions.salesplan as any, dispatch),
            planitems: bindActionCreators(Actions.planitems as any, dispatch),
            products: bindActionCreators(Actions.products as any, dispatch),
            salesreport: bindActionCreators(Actions.salesreport as any, dispatch)
        } 
    })
)
export default class EditProductItem extends React.Component <Props, State> {

    private id: string
    private amount: number

    constructor(props:Props){
        super(props)
        this.state = {
            arrange: true,
            productRadio: true
        }
    }
    componentWillReceiveProps(nextProps:Props){
        if(!!nextProps.planItem) {
            this.id = nextProps.planItem.item_id
            this.amount = nextProps.planItem.plan

            if(!nextProps.products.length) return
            const product = nextProps.products.find(item=>item.id==this.id)
            if(!product) return
            this.setState({productRadio: product.type=='product'})
        }
    }
   
    handleKeyPress(e){
        switch(e.key){
            case 'Enter' :
                this.submitHandler()
                break
            case 'Escape' :
                this.props.onClose()
                break
        }
    }
   
    submitHandler(){
       
        const item_id = this.id
        const plan = this.amount
        const days = this.state.arrange || this.amount != this.props.planItem.plan ? 
            createDays(this.props.salesplan.period, this.state.arrange, this.amount) :
            this.props.planItem.days
        const item = {...this.props.planItem, plan, days, item_id}
        this.props.actions.planitems.updatePlanItem(item)
        this.props.onClose()

    }
    removeHandler(){
        this.props.actions.planitems.removePlanItem(this.props.planItem)
        this.props.onClose()
    }

    render(){
        const {planItem, planitems, visible, products} = this.props
        if(!visible || !planItem || !planitems.length || !products.length) return null
        const options  = this.props.products
            .filter(p=>!planitems.some(v=>v.item_id==p.id && v.item_id!=this.id))
            .filter(item=>item.type==(this.state.productRadio?'product':'product-tag'))
            .map(item=>(<option key={item.id} value={item.id}>{item.name}</option>))
        return (
            <div className={styles.overlay} onClick={this.props.onClose}>
             <div className="modal-dialog" 
                onClick={e=>e.stopPropagation()}
                role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            onClick={this.props.onClose}
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h2 className="modal-title">{CONST.TXT.EDIT_PRODUCT}</h2>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <div className="radio" onClick={e=>e.stopPropagation()}>
                                <label className="js-radio">
                                    <input type="radio" 
                                        name="item-type"
                                        checked={this.state.productRadio}
                                        onChange={()=>this.setState({productRadio: true})}
                                    />
                                    {CONST.TXT.PRODUCT}
                                    <span className="cr"><span className="cr-icon"></span></span>
                                </label>&nbsp;&nbsp;
                                <label className="js-radio">
                                    <input type="radio" 
                                        name="item-type"
                                        checked={!this.state.productRadio}
                                        onChange={()=>this.setState({productRadio: false})}
                                    />
                                    {CONST.TXT.CATEGORY}
                                    <span className="cr"><span className="cr-icon"></span></span>
                                </label>
                                <p className="help-block help-block-error"></p>
                            </div>
                           
                        </div>
                        <div className="form-group">
                            <select className="form-control"
                                defaultValue={this.id}
                                onChange={e=>this.id=e.target.value}>
                                {options}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.AMOUNT}</label>
                            <input className="form-control"
                                type="number"
                                autoFocus
                                defaultValue={this.amount.toString()}
                                onKeyUp={this.handleKeyPress.bind(this)}
                                onChange={e=>this.amount=Number(e.target.value)}/>
                        </div>
                         <div className="checkbox">
                            <label className="js-checkbox">
                                <input type="checkbox"
                                    checked={this.state.arrange}
                                    onChange={()=>this.setState(state=>({arrange:!state.arrange}))}
                                />
                                {CONST.TXT.ARRANGE_PRODUCTS}
                                 <span className="cr"><span className="cr-icon glyphicon glyphicon-ok"></span></span>
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                            className="btn btn-danger" 
                            onClick={this.removeHandler.bind(this)}
                            style={{float:'left'}}
                            data-dismiss="modal">
                            <span className="glyphicon glyphicon-trash"/>&nbsp;{CONST.TXT.REMOVE}
                        </button>
                        <button type="button" 
                            className="btn btn-default" 
                            onClick={this.props.onClose}
                            data-dismiss="modal">
                            {CONST.TXT.CANCEL}
                        </button>
                        <button type="button" 
                            className="btn btn-primary"
                            onClick={this.submitHandler.bind(this)}>
                            <span className="glyphicon glyphicon-ok"/>&nbsp;{CONST.TXT.SAVE}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}