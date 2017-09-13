import * as React from 'react'

import Money from '../common/money'
import DeviationPercent from '../common/deviation-percent'

interface Props {
    day: string
    planfactitem: PlanFact
}

export default class RightTableRow extends React.Component<Props, null> {
    render(){
        const {day, planfactitem} = this.props
        if(!day || !planfactitem) return  null
        const dayReport = planfactitem.days.find(item=>item.day+''==day)
        if(!dayReport) return  null //?
        return (
            <tr className="vertical-middle">
                <th className="col-xs-1">
                    <div className="h4 text-right"><Money>{dayReport.plan}</Money></div>
                </th>
                <th className="col-xs-1">
                    <div className="h4 text-right"><Money>{dayReport.fact}</Money></div>
                </th>
                <th className="col-xs-1">
                    <div className="h4 text-right text-danger">
                        <DeviationPercent plan={dayReport.plan} fact={dayReport.fact}/>
                    </div>
                </th>
            </tr>
        )
    }
}