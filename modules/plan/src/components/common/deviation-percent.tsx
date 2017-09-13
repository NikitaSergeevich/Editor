import * as React from 'react'

interface Props {
    plan: number
    fact: number
}

export default class DeviationPercent extends React.Component <Props, null> {

    render(){
        const {plan, fact} = this.props

        const percent = !plan? 100 : (fact-plan)/plan*100
        if(percent < 80) return  <div className="h4 nowrap text-danger">{percent.toFixed(0)}%</div>
        if(percent < 90) return  <div className="h4 nowrap text-warning ">{percent.toFixed(0)}%</div>
        return  <div className="h4 nowrap text-success">{percent.toFixed(0)}%</div>
    }
    
}