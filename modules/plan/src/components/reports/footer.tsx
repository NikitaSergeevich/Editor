import * as React from 'react'
import {TXT} from '../../constants'

export default class ReportFooter extends React.Component <null, null>{
    render(){
        return(
            <div className="main-content__footer">
                <button className="btn btn-primary sprite_plus pull-right"
                    onClick={e=>{document.location.href=document.location.origin+'/planning/document'}}>
                    {TXT.CANCEL}
                </button>
            </div>
        )
    }
}