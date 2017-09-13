import * as React from 'react'
import * as styles from './new-menu.css'
import * as CONST from '../../constants'

import Selectize from '../common/selectize'
import IconPicker from '../common/icon-picker'
import ColorPicker from '../common/color-picker'
import {createNewMenuItem} from '../menu/utils'

interface Props {
    menu: Menu
    path: Array<string>
    cell?: number
    visible: boolean
    onClose(): void
    onSubmit(menuItem: MenuItem): void
}
interface State {
    menuItem: MenuItem
    showIconMenu: boolean
    showColorMenu: boolean
    showSpinner: boolean
}

export default class NewMenu extends React.Component <Props, State> {

    constructor(props:Props){
        super(props)
        this.state= { 
            menuItem: createNewMenuItem(props.menu, props.path, props.cell||null),
            showColorMenu: false,
            showIconMenu: false,
            showSpinner: false
        }
    }


    componentWillReceiveProps(nextProps){
        const {menu, path, cell} = nextProps
        if(this.state.showSpinner) this.props.onClose()
        this.setState({menuItem: createNewMenuItem(menu, path, cell||null), showSpinner: false})
    }


    changeTitleHandler(name: string){
        this.setState(state => {
            const menuItem = {...state.menuItem, name }
            return {menuItem}
        })
    }

    selectHandler(menuItem: MenuItem){
        this.setState({menuItem})
    }

    selectIconHandler(icon: string){
        if(!icon) return  this.setState({showIconMenu: false})
        const icon_name = icon
        const menuItem = {...this.state.menuItem, icon, icon_name}
        this.setState({menuItem, showIconMenu: false})
    }
    selectColorHandler(color: string){
        if(!color) return this.setState({showColorMenu: false})
        const menuItem = {...this.state.menuItem, color}
        this.setState({menuItem, showColorMenu: false})
    }

    submitHandler(){
       // ToDo: check errors
       if(!this.state.menuItem.name) return console.log('error заполните поле наименование')
       this.setState({showSpinner: true},()=>{
            this.props.onSubmit(this.state.menuItem)
        })
    }

    render(){
        if(!this.props.visible) return null

        const {menu, visible, onClose, onSubmit} = this.props
        const {menuItem} = this.state
        const color = <div className={styles.color} style={{backgroundColor:menuItem.color}}/>
        const icon = !!menuItem.icon_name ? <img key={menuItem.icon_name} className={styles.icon} 
                        src={`${CONST.DOMAIN}img/${menuItem.icon_name}.svg`} /> : null
        const spinner = this.state.showSpinner ? 
            <span className={"glyphicon glyphicon-refresh "+styles.spinner}/> : 
            <span className="glyphicon glyphicon-ok"/>

        return (
            <div className={styles.overlay} onClick={onClose}>
                <div className="modal-dialog" role="document" onClick={e=>e.stopPropagation()}>
                    <div className={"modal-content " + styles.modalContent}>
                    <div className="modal-header">
                        <button type="button" 
                                onClick={onClose}
                                className="close" 
                                data-dismiss="modal" 
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="modal-title">{CONST.CREATE_NEW_ITEM}</h3>
                    </div>
                    <div className={"modal-body "+styles.modalBody}>
                        <div className="form-group">
                            <label className="control-label">
                                {CONST.NAME}
                            </label>
                            <input 
                                className="form-control"
                                type="text" 
                                placeholder={CONST.MENU_ITEM_NAME}
                                onChange={(event)=>this.changeTitleHandler(event.target.value)}
                             />
                        </div>
                        
                        <div className="form-group">
                            <label>{CONST.ALSO_CONTAINS}</label>
                            <Selectize
                                type="product"
                                menuItem={this.state.menuItem}
                                onSelect={this.selectHandler.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label>{CONST.INCLUDES_CATEGORIES}</label>
                            <Selectize
                                type="category"
                                menuItem={this.state.menuItem}
                                onSelect={this.selectHandler.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                {CONST.EXCLUDED_GOODS}
                            </label>
                            <Selectize key={"excluded"+menuItem.id}
                                type="excluded"
                                menuItem={menuItem}
                                onSelect={this.selectHandler.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <div className="button-group">
                                <button className="btn btn-transparent p-r-none dropdown-toggle"
                                    onClick={()=>this.setState({showColorMenu: true})}
                                    style={{float: 'right'}}>
                                    {CONST.COLOR} &nbsp;{color}&nbsp;<span className="caret"/>
                                </button>
                                <ColorPicker
                                    visible={this.state.showColorMenu}
                                    colors={CONST.colors}
                                    onSelect={this.selectColorHandler.bind(this)}
                                />
                                <button className="btn btn-transparent p-l-none dropdown-toggle"
                                    onClick={()=>this.setState({showIconMenu: true})}>
                                    {CONST.ICON} &nbsp; {icon} &nbsp;<span className="caret"/>
                                </button>
                                <IconPicker
                                    visible={this.state.showIconMenu}
                                    icons={CONST.icons}
                                    onSelect={this.selectIconHandler.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-default" 
                            data-dismiss="modal"
                            onClick={onClose}>
                            {CONST.CANCEL}
                        </button>
                        <span>&nbsp;</span>
                        <button
                            type="button" 
                            className="btn btn-primary"
                            onClick={this.submitHandler.bind(this)}>
                            {spinner}&nbsp;{CONST.SAVE}
                        </button>
                    </div>
                    </div>
                </div> 
            </div>
        )
    }
}