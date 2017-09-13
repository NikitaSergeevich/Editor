import * as React from 'react'
import * as CONST from '../../constants'
import * as styles from './confirm-delete.css'

interface Props {
    onClose():void
    onDelete():void
    name: string
    visible: boolean
}

export default class ConfirmDelete extends React.Component <Props, null> {
    render(){
        if(!this.props.visible) return null
        return (
         <div className={styles.overlay} onClick={this.props.onClose}>
             <div className="modal-dialog" 
                onClick={e=>e.stopPropagation()}
                role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            onClick={this.props.onClose}
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h2 className="modal-title">{CONST.R_U_SURE}</h2>
                    </div>
                    <div className="modal-body">
                        <p>{this.props.name}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                            className="btn btn-default" 
                            onClick={this.props.onClose}
                            data-dismiss="modal">
                            {CONST.CANCEL}
                        </button>
                        <button type="button"
                            onClick={this.props.onDelete}
                            className="btn btn-danger">
                            <span className="glyphicon glyphicon-trash"/>&nbsp;
                            {CONST.DELETE}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}