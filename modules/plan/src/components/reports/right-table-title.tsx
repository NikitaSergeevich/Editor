import * as React from 'react'
import {toSeconds} from '../utils'

import DayHead from '../common/dayhead'

interface Props {
    day: number
}

export default class RightTableTitle extends React.Component <Props, null> {
    render(){

        return (
            <tr className="p-t-lg vertical-middle">
               <th className="col-xs-12 text-center" colSpan={4}>
                    <DayHead value={this.props.day}/>
                </th>    
            </tr>
        )
    }
}