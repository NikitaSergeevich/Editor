import { combineReducers, Reducer } from 'redux'

import nomenclature from './nomenclature'
import category, {CategoryReducer} from './category'
import menu from './menu'

export interface RootState {
  nomenclature: ProductCategory
  category: CategoryReducer
  menu: Menu  
  path: Array<string>
}

export default combineReducers<RootState>({
  nomenclature,
  category,
  menu
})