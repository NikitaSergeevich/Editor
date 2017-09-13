import * as React from 'react'

export default class Money extends React.Component<null, null> {

    render(){
        const amount = Number(this.props.children).toFixed(2)
        const i =amount.indexOf('.')
        const dimes = amount.substr(i)
        const rubles = amount
            .substr(0,i)
            .replace(/./g, (c, i, a) => i && c !== "." && ((a.length - i) % 3 === 0) ? '\'' + c : c )
        return<span>{rubles}<small>{dimes}</small></span>
    }

}