import * as React from 'react'
import * as CONST from '../../constants'
import * as styles from './dayhead.css'

interface Props {
    value: number
}
interface State {}

export default class DayHead extends React.Component<Props, State> {
    render(){
        const date = new Date(this.props.value*1000)
        const day = date.getDate()
        const month = CONST.shortMonth[date.getMonth()]
        const year = date.getFullYear()
        const week = date.getDay()
        const weekDay = CONST.weekDays[week]
        return (
            <span className="small">
                {`${day} ${month}.`}&nbsp;
                <span 
                    className={week<1||week>5?styles.weekoff:styles.badge}>
                    {weekDay}
                </span>
            </span>
        )
    }
}