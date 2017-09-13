import * as React from 'react'
import * as CONST from '../../constants'

import Money from '../common/money'
import DeviationPercent from '../common/deviation-percent'

interface Props {
    salesplan: SalesPlan
    planfactreport: PlanFact[]
}

export default class LeftTableTurnoverRow extends React.Component<Props, null> {

    render(){

        const {planfactreport, salesplan} = this.props
        if(!planfactreport || !salesplan) return null
        const item = planfactreport.find(item=>item.type=='sale-point')
        if(!item) return null
        return (
            <tr className="vertical-middle">
                <th className="col-xs-6">
                   <div className="h4 nowrap">{salesplan.sale_point_name}</div>
                </th>
                <th className="col-xs-2">
                    <div className="h4 nowrap text-right"><Money>{item.plan}</Money></div>
                </th>
                <th className="col-xs-2">
                    <div className="h4 nowrap text-right"><Money>{item.fact}</Money></div>
                </th>
                <th className="col-xs-2 text-right"><DeviationPercent plan={item.plan} fact={item.fact}/></th>
            </tr>
        )

    }

}