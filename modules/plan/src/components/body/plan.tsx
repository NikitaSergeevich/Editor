import * as React from 'react'
import * as CONST from '../../constants'

import NewItemModal from '../modals/new-product-item'
import EditProductItem from '../modals/edit-product-item'
// import ProductsTable from '../products-table'
import Menu from '../modals/menu'
import LeftTable from './left-table'
import RightTable from './right-table'
// import Loader from './loader'

interface Props {}
interface State {
    showNewItemModal: boolean
    showEditItemModal: boolean
    showLoadMenu: boolean
}

export default class Plan extends React.Component <Props, State> {
    private currentItem: PlanItem  
    constructor(props:Props){
        super(props)
        this.state={
            showNewItemModal: false,
            showEditItemModal: false,
            showLoadMenu: false
        }
        this.currentItem = null
    }
    editProductItemHandler(item:PlanItem){
        this.currentItem = item
        this.setState({showEditItemModal: true})
    }
    render(){
        return(
            <div className="plan m-t-lg">
                <NewItemModal
                    onClose={()=>this.setState({showNewItemModal: false})}
                    visible={this.state.showNewItemModal}
                />
                <EditProductItem
                    planItem={this.currentItem}
                    onClose={()=>this.setState({showEditItemModal: false})}
                    visible={this.state.showEditItemModal}
                />
                <div className="row">
                    <div className="col-xs-6 p-l-none p-r-none pos-s">
                        <LeftTable
                            onEdit={this.editProductItemHandler.bind(this)}
                            onAddNew={()=>this.setState({showNewItemModal: true})}
                        />
                    </div>
                     <div className="col-xs-6 p-l-none p-r-none overflow-auto plan_interval">
                        <RightTable/>
                    </div>
                </div>

            </div>
        )
    }
}