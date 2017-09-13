import * as React from 'react'
import * as CONST from '../../constants'


interface Props {
    title: string
}

export default class LeftTableHead extends React.Component<Props, null> {


    render(){
        return (
            <tr className="vertical-middle">
                <th className="col-xs-6">
                    <div className="text-default text-uppercase">{this.props.title}</div>
                </th>
                <th className="col-xs-2">
                    <div className="text-default text-uppercase text-right">{CONST.TXT.PLAN}</div>
                </th>
                <th className="col-xs-2">
                    <div className="text-default text-uppercase text-right">{CONST.TXT.FACT}</div>
                </th>
                <th className="col-xs-2">
                    <div className="text-default text-uppercase text-right">{CONST.TXT.DEV}</div>
                </th>
            </tr>
        )

    }

}