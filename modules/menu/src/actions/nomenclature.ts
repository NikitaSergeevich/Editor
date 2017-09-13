import * as Actions from './types'
import * as API from '../api'

export interface Interface {
    fetch(): Action
}

export const fetch = () => ({type: Actions.FETCH_NOMENCLATURE, payload: API.loadNomenclature()})