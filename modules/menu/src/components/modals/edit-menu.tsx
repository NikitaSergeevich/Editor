import * as React from 'react'
import * as styles from './new-menu.css'
import * as CONST from '../../constants'
import Selectize from '../common/selectize'
import IconPicker from '../common/icon-picker'
import ColorPicker from '../common/color-picker'
import ConfirmDelete from './confirm-delete'
// import {createNewMenuItem} from '../MenuContainer/utils'

interface Props {
    menu: Menu
    // path: Array<string>
    menuItem: MenuItem
    onClose(): void
    onDelete(menuItem:MenuItem): void
    onSubmit(menuItem: MenuItem): void
}

interface State {
    menuItem: MenuItem
    showIconMenu: boolean
    showColorMenu: boolean
    showConfirmModal: boolean
    showSpinner: boolean
    showTrashSpinner: boolean
}

export default class EditMenu extends React.Component <Props, State> {

    constructor(props:Props) {
        super(props)
        this.state= { 
            menuItem: props.menuItem,
            showColorMenu: false,
            showIconMenu: false,
            showConfirmModal: false,
            showSpinner: false,
            showTrashSpinner: false
        }
    }

    componentWillReceiveProps(nextProps: Props){
        if(this.state.showSpinner || this.state.showTrashSpinner) this.props.onClose()
        this.setState({menuItem: nextProps.menuItem, showSpinner: false, showTrashSpinner: false})
    }


    changeTitleHandler(name: string){
        this.setState(state => {
            const menuItem = {...state.menuItem, name }
            return {menuItem}
        })
    }

    selectCategoryHandler(menuItem: MenuItem){
        this.setState({menuItem})
    }

    selectProductHandler(menuItem: MenuItem){
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

    deleteMenuItem(){
        this.setState({showConfirmModal: false, showTrashSpinner: true}, ()=> {
            this.props.onDelete(this.state.menuItem)
        })
    }

    submitHandler(){
       // ToDo: check errors
        if(!this.state.menuItem.name) return console.log('наименование не должно быть пустым')
        this.setState({showSpinner: true},()=>{
            this.props.onSubmit(this.state.menuItem)
        })
    }

    render(){
        if(!this.props.menuItem) return null

        const {menu,  onClose, onSubmit} = this.props
        const {menuItem} = this.state
        const color = <div className={styles.color} style={{backgroundColor:menuItem.color}}/>
        const icon = !!menuItem.icon_name ? <img key={menuItem.icon_name} className={styles.icon} 
                        src={`${CONST.DOMAIN}img/${menuItem.icon_name}.svg`} /> : null
        const spinner = this.state.showSpinner ? 
            <span className={"glyphicon glyphicon-refresh "+styles.spinner}/> : 
            <span className="glyphicon glyphicon-ok"/>
        const trash = this.state.showTrashSpinner ? 
            <span className={"glyphicon glyphicon-refresh "+styles.spinner}/> :
            <span className="glyphicon glyphicon-trash"/>
        const selectizeStyle = !menuItem.child_menus.length ? "form-group" : styles["display-none"]
        return (
            <div className={styles.overlay} onClick={onClose}>
                 <ConfirmDelete
                    visible={this.state.showConfirmModal}
                    name={menuItem.name}
                    onClose={()=>this.setState({showConfirmModal: false})}
                    onDelete={this.deleteMenuItem.bind(this)}
                />
                <div className="modal-dialog" role="document" onClick={e=>e.stopPropagation()}>
                    <div className={"modal-content " +styles.modalContent}>
                    <div className="modal-header">
                        <button type="button" 
                                onClick={onClose}
                                className="close" 
                                data-dismiss="modal" 
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="modal-title">{CONST.EDIT}</h3>
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
                                defaultValue={menuItem.name}
                                onChange={(event)=>this.changeTitleHandler(event.target.value)}
                             />
                        </div>
                        <div className={selectizeStyle}>
                            <label>{CONST.ALSO_CONTAINS}</label>
                            <Selectize
                                type="product"
                                menuItem={this.state.menuItem}
                                onSelect={this.selectProductHandler.bind(this)}
                            />
                        </div>
                        <div className={selectizeStyle}>
                            <label>{CONST.INCLUDES_CATEGORIES}</label>
                            <Selectize
                                type="category"
                                menuItem={this.state.menuItem}
                                onSelect={this.selectCategoryHandler.bind(this)}
                            />
                        </div>
                         <div className={selectizeStyle}>
                            <label>{CONST.EXCLUDED_GOODS}</label>
                            <Selectize
                                type="excluded"
                                menuItem={this.state.menuItem}
                                onSelect={this.selectCategoryHandler.bind(this)}
                            />
                        </div>
                        <div className="form-group p-t">
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
                        <button className="btn btn-danger" 
                            onClick={()=>this.setState({showConfirmModal:true})}
                            style={{
                                float: 'left',
                                marginLeft: 0
                            }}>
                            {trash}&nbsp;{CONST.DELETE}
                        </button> 
                        <button 
                            type="button" 
                            className="btn btn-default" 
                            data-dismiss="modal"
                            onClick={onClose}>
                            {CONST.CANCEL}
                        </button>
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