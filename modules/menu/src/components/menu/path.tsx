import * as React from 'react'
import * as Actions from '../../actions'
import * as CONST from '../../constants'
import {getMenuName} from './utils'

interface Props {
    title: string
    path: Array<string>
    actions: Actions.Interface
    onSubmit(title:string): void
}
interface State {
    editMode: boolean
}

export default class Path extends React.Component <Props, State> {

    private input: HTMLInputElement

    constructor(props:Props){
        super(props)
        this.state = {
            editMode: false
        }
    }

    keyUpHandler(e){
        switch(e.key){
            case 'Enter' :
                this.submitTitleHandler()
                break
            case 'Escape' :
                this.setState({editMode:false})
                break
        }
    }

    submitTitleHandler(){
        const {path, title, onSubmit} = this.props
        const value = this.input.value
        this.setState({editMode:false})
        if(title != value ) onSubmit(value)
    }

    render(){
        const {path, title, actions} = this.props
        if(!path.length) return null
        const pathItems = path.map(id=>(
            <a key={id}
                href="#"
                onClick={e=>{e.preventDefault();actions.menu.changeMenuLevel(id)}}>
                /&nbsp;{getMenuName(id)}&nbsp;
            </a>
        ))

        const titleBlock = !this.state.editMode ? (
            <div className="terminal-menu__head-text">
                <div className="terminal-menu__head-text-overflow">{this.props.title}</div> 
                <button className="btn btn-transparent terminal-menu__head-btn"
                    onClick={()=>this.setState({editMode:true})}>
                    <span className="glyphicon glyphicon-edit"></span>
                </button>
            </div>

        ) : (
            <input 
                className="form-control"
                ref={element=>this.input=element}
                defaultValue={title}
                autoFocus
                onKeyUp={this.keyUpHandler.bind(this)}
                onBlur={this.submitTitleHandler.bind(this)}
            />
        )
            
        return (
            <div className="terminal-menu__head">
                <div className="terminal-menu__nav">
                    {pathItems}
                </div>
                {titleBlock}
            </div>
        )
    }
}