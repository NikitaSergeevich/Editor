import * as React from 'react'
import * as styles from './cell.css'

import Money from '../common/money'
import {createDays, toSeconds} from '../utils'

interface Props{
    planItem: PlanItem
    date?: number
    onSubmit(planItem:PlanItem): void
}
interface State{
    showInput: boolean
    value: number
}

export default class Cell extends React.Component <Props, State> {
    
    constructor(props:Props){
        super(props)
        this.state = {
            showInput: false,
            value: this.getValue(props.planItem, props.date)
        }
    }

    componentWillReceiveProps(nextProps){
        const value = this.getValue(nextProps.planItem, nextProps.date)
        this.setState({value})
    }

    getValue(planItem:PlanItem,date?:number): number{
        if(!planItem) return 0
        return !date ? Number(planItem.plan) : Number(planItem.days.find(d=>d.day==date).plan)
    }

    setValue(value:number):PlanItem{
        const item = {...this.props.planItem}
        const period = item.days[0].day
        if(!this.props.date) {
            item.plan = value
            item.days = createDays(period,true,value)
        } else {
            item.days = item.days.map(d=>d.day!=this.props.date? d : {day:d.day,plan:value})
            item.plan = item.days.reduce((acc,d)=>acc+=Number(d.plan),0)
        }
        return item
    }

    handleInput(e){
        switch(e.key){
            case 'Enter' :
                this.props.onSubmit(this.setValue(this.state.value))
            case 'Escape' :
                this.setState({showInput:false})
            break
        }
    }

    render(){
        const {planItem} = this.props
        const {value} = this.state
        if(this.state.showInput) return (
            <input type="number"
                className={styles.input}
                onBlur={()=>this.setState({showInput:false})}
                onKeyUp={this.handleInput.bind(this)}
                onChange={e=>this.setState({value:Number(e.target.value)})}
                defaultValue={''+value} 
                autoFocus
            />
        )
       
        return (
            <div className={[styles['plan-item'], styles.hand].join(' ')}
                onClick={()=>this.setState({showInput:true})}>
                <Money>{value}</Money>
            </div>
        )
    }
}