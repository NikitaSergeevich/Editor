import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    fetchProducts(): Action
    fetchProductTags(): Action
}

export const fetchProducts = () => ({ type: Actions.FETCH_PRODUCTS, payload: API.getNomenclature()})
export const fetchProductTags = () => ({ type: Actions.FETCH_PRODUCT_TAGS, payload: API.getProductTagList()})