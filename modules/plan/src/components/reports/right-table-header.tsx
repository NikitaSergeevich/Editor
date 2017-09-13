import * as React from 'react'
import * as CONST from '../../constants'

interface Props {}

export default class RightTableHeader extends React.Component <Props, null> {
    render(){

        return (
            <tr className="vertical-middle">
                <th className="col-xs-1">
                    <div className="text-default text-uppercase text-right">{CONST.TXT.PLAN}</div>
                </th>
                <th className="col-xs-1">
                    <div className="text-default text-uppercase text-right">{CONST.TXT.FACT}</div>
                </th>
                <th className="col-xs-1">
                    <div className="text-default text-uppercase text-right">{CONST.TXT.DEV}</div>
                </th>
            </tr>
        )
    }
}