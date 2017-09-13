import * as salesplan from './salesplan'
import * as planitems from './planitems'
import * as products from './products'
import * as salesreport from './salesreport'
import * as salesplanlist from './salesplanlist'
import * as salepointlist from './salepointlist'
import * as planfactreport from  './planfactreport'

interface Interface {
    salesplan?: salesplan.Interface
    planitems?: planitems.Interface
    products?: products.Interface
    salesreport?: salesreport.Interface
    salesplanlist?: salesplanlist.Interface
    salepointlist?: salepointlist.Interface
    planfactreport?: planfactreport.Interface
}

export  { 
    Interface, salesplan, planitems, products, salesreport, salesplanlist, salepointlist, planfactreport
} 