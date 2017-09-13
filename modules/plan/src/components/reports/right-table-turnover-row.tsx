import * as React from 'react'

import Money from '../common/money'
import DeviationPercent from '../common/deviation-percent'

interface Props {
    day: string
    planfactreport: PlanFact[]
}

export default class RightTableTurnoverRow extends React.Component<Props, null> {
    render(){
        const {day, planfactreport} = this.props
        if(!day || !planfactreport) return  null
        const reportItem = planfactreport.find(item=>item.type=='sale-point')
        if(!reportItem) return null //?
        const dayReport = reportItem.days.find(item=>item.day+''==day)
        if(!dayReport) return  null //?
        return (
            <tr>
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