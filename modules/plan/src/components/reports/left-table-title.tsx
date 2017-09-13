import * as React from 'react'
import * as CONST from '../../constants'


interface Props {
    show: boolean
    title: string
    onToggle():void
}

export default class LeftTableTitle extends React.Component<Props, null> {


    render(){
        return (
             <tr className="vertical-middle">
                <th className="col-xs-12" colSpan={4}>
                    <h2 className="col-xs-8 h2 m-none min-height">{this.props.title}</h2>
                    <div className="col-xs-4">
                        <button className="btn btn-default btn-sm"
                            onClick={this.props.onToggle}>
                            {this.props.show
                            ?<span className="glyphicon glyphicon-chevron-up"/>
                            :<span className="glyphicon glyphicon-chevron-down"/>}
                        </button>
                    </div>
                </th>
            </tr>
        )
    }

}