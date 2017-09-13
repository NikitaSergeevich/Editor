import * as React from 'react'
import * as CONST from '../../constants'
import * as styles from './header.css'

interface Props {
    salesplan: SalesPlan
    unRegister():void
}
interface State {
     showRegSpinner: boolean
}

export default class ReportHeader extends React.Component <Props, State> {

    constructor(props:Props){
        super(props)
        this.state = {
            showRegSpinner: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.showRegSpinner) this.setState({showRegSpinner:false})
    }

    handleUnRegister(){
        this.setState({showRegSpinner: true}, ()=>{
           this.props.unRegister()
        })
    }

    render(){
        const {salesplan} = this.props
        return (
            <div className="main-content__header">
                <div className="row">
                    <div className="col-xs-3">
                        <div className="row">
                            <div className="col-xs-5">
                                <h1 className="h1 m-none">{CONST.TXT.PLAN}</h1>
                            </div>
                            <div className="col-xs-7">
                                <div className="input-group disabled">
                                    <span className="input-group-addon">{CONST.TXT.NUMBER} :</span>
                                    <span className="form-control">{salesplan.number}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <div className="input-group">
                            <span className="input-group-addon">{CONST.TXT.EMPLOYEE} :</span>
                            <span className="form-control">{salesplan.user_fio}</span>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <div className="input-group">
                            <span className="input-group-addon">{CONST.TXT.PERIOD} :</span>
                            <span className="form-control">
                                {CONST.month[new Date(salesplan.period*1000).getMonth()]}
                            </span>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <div className="input-group">
                            <div className="label label-success m-t-sm m-r-lg">{CONST.TXT.IS_REG}</div>
                            <button className="btn btn-default"
                                onClick={this.handleUnRegister.bind(this)}>
                                {this.state.showRegSpinner
                                    ?<span className={"glyphicon glyphicon-refresh "+styles.spinner}/>
                                    :<span className="glyphicon glyphicon-warning-sign text-danger"/>}
                                &nbsp;{CONST.TXT.EDIT}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}