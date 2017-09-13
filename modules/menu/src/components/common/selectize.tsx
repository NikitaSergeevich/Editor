import * as React from 'react'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
import TagInput from '../tag-input'

const {connect} = require('react-redux')

interface Props {
    type: "category" | "product" | "excluded"
    menuItem: MenuItem
    nomenclature?: ProductCategory
    onSelect(menuItem:MenuItem): void
}

@connect(
    state => ({
        nomenclature: state.nomenclature as ProductCategory
    })
)
export default class Selectize extends React.Component <Props, null> {


    renderCategory(): JSX.Element{
        // filter categories
        // remove categories which contains goods from products
        const remove_ids = this.props.menuItem.products.map(item => item.product_category_id)

        const options = this.props.nomenclature.child_categories
           // .filter(item => !remove_ids.includes(item.id))
            .map(item => (
                <option key={item.id}
                    value={item.id}>
                    {item.name}
                </option>
            ))
        const selected = this.props.menuItem.product_categories
            .map(item => item.id)

        return this.renderTagInput({options, selected})
    }

    renderProduct(): JSX.Element{

        // filter
        //remove products wichone already added in category
        // const categories = this.props.menuItem.product_categories.map(item => item.id)
        const options = this.props.nomenclature.child_categories
            .reduce((acc, item) => [...acc, ...item.products],[])
           // .filter(item => !categories.includes(item.product_category_id))
            .map(item => <option key={item.id} value={item.id}>{item.name}</option>)

        const selected = this.props.menuItem.products.map(item => item.id)

       return this.renderTagInput({options, selected})
         
    }

    renderExcluded(){
        // categories = take all used categories
        // goods = take all goods from this categories
        // selected = take all products from excluded_products
        // options = goods 
       // remove goods that cant be excluded cos no parent category selected
        // const categories = this.props.menuItem.product_categories.map(item => item.id)
        
        // const goods = this.props.nomenclature.child_categories
        //     .reduce((acc, item) => categories.includes(item.id) ? [...acc, ...item.products] : acc,[])
        // const selected = !this.props.menuItem.excluded_products ? [] :
        //     this.props.menuItem.excluded_products
        //     .filter(item=> goods.some(v=>v.id == item.id)) // clean after removed category
        //     .map(item => item.id)

        // const options = goods.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
        // return this.renderTagInput({options, selected})

        const options = this.props.nomenclature.child_categories
            .reduce((acc, item) => [...acc, ...item.products],[])
            .map(item => <option key={item.id} value={item.id}>{item.name}</option>)

        const selected =  !this.props.menuItem.excluded_products ? [] : this.props.menuItem.excluded_products.map(item => item.id)

        return this.renderTagInput({options, selected})
    }

    renderTagInput({options, selected}): JSX.Element {
        return (
            <TagInput 
                selected={selected}
                onSelect={this.onSelect.bind(this)}>
                {options}
            </TagInput>
        ) 
    }


    onSelect(ids: Array<string>){


        switch(this.props.type){
            case 'category' : {
                // got error
                // if one of category is deleted, should filer excluded goods
                const product_categories = this.props.nomenclature.child_categories
                    .filter(item => ids.includes(item.id)) 

                // const excluded_products = this.props.menuItem.excluded_products  // it shouldnot by null
                //         .filter(item => product_categories.some(cat=>cat.id==item.product_category_id))

                this.props.onSelect({...this.props.menuItem, product_categories})
                break
            }
            case 'product' : {
                const products = this.props.nomenclature.child_categories
                    .reduce((acc,item) => [...acc,...item.products],[])
                    .filter(item => ids.includes(item.id))
                this.props.onSelect({...this.props.menuItem, products})
                break
            }
            case 'excluded' : {
                // const categories = this.props.menuItem.product_categories
                //     .map(item => item.id)
                // const excluded_products = this.props.nomenclature.child_categories
                //     .reduce((acc, item) => categories.includes(item.id) ? [...acc, ...item.products] : acc,[])
                //     .filter(item => ids.includes(item.id))
                const excluded_products = this.props.nomenclature.child_categories
                    .reduce((acc,item) => [...acc,...item.products],[])
                    .filter(item => ids.includes(item.id))
                this.props.onSelect({...this.props.menuItem, excluded_products})
                break
            }
        }
        
    }

    render(){
        switch(this.props.type){
            case "product" :
                return this.renderProduct()
            case "category" :
                return this.renderCategory()
            case "excluded" :
                return this.renderExcluded()
            default:
        }
        return null
    }
}

