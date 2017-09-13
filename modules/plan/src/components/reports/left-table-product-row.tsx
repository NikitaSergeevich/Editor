import * as React from 'react'
import * as CONST from '../../constants'

import Money from '../common/money'
import DeviationPercent from '../common/deviation-percent'

interface Props {
    item: PlanFact
}

export default class LeftTableProductRow extends React.Component<Props, null> {

    render(){

        const {item} = this.props

        return (
            <tr className="vertical-middle">
                    <th className="col-xs-6">
                       <div className="h4 nowrap">{item.item_name}</div>
                    </th>
                    <th className="col-xs-2">
                        <div className="h4 nowrap text-right"><Money>{item.plan}</Money></div>
                    </th>
                    <th className="col-xs-2">
                        <div className="h4 nowrap text-right"><Money>{item.fact}</Money></div>
                    </th>
                    <th className="col-xs-2 text-right">
                        <DeviationPercent plan={item.plan} fact={item.fact}/>
                    </th>
                </tr>
        )

    }

}