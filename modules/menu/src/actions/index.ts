import * as Nomenclature from './nomenclature'
import * as Category from './category'
import * as Menu from './menu'


interface Interface {
    nomenclature?: Nomenclature.Interface
    category?: Category.Interface
    menu?: Menu.Interface
}

export  { Interface, Nomenclature , Category, Menu} 