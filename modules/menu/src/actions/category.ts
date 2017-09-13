import * as Actions from './types'

export interface Interface {
    select(category: ProductCategory): Action
    reset(): Action
}

export const select = payload => ({ type: Actions.SELECT_CATEGORY, payload })
export const reset = () => ({ type: Actions.RESET_CATEGORY })