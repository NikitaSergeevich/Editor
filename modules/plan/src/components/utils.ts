import * as CONST from '../constants'

export function createDays(period:number, arrange:boolean, amount:number): Array<Days>{
    const date = new Date(period*1000)
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysCount = new Date(year, month+1, 0).getDate()
    const rem = amount%daysCount
    const div = Math.floor(amount/daysCount)
    const  days = new Array(daysCount).fill({})
    
     if (arrange) return  days.map((item, idx) => {
            const plan = idx < rem ? div + 1 : div
            const day = toSeconds(new Date(year, month, idx+1).getTime())
            return {day,plan}
        })
    return  days.map((item, idx) => {
            const plan = idx == 0  ? amount : 0
            const day = toSeconds(new Date(year, month, idx+1).getTime())
            return {day,plan}
        })
}

export function getAmount(qty:number, price:number):string{
    return Math.floor(qty*price)+'.00'
}

export function getProfit(qty:number, price:number, cost:number):string {
    return Math.floor(qty*price-qty*cost)+'.00'
}

export function getPeriods(date:Date,count=6):Array<Date>{

    const year = date.getFullYear()
    const month = date.getMonth()
    return new Array(Math.abs(count))
        .fill(new Date())
        .map((_,idx)=>new Date(year,count<0?month-idx:month+idx,1))
}

export function getMonth(date:Date): string{
    const year = date.getFullYear()
    const month = date.getMonth()

    return `${CONST.month[month]} ${year}`
}

export function getDaysCount(period:number) {
    const date = new Date(period*1000)
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month+1, 0).getDate()
}

export function shrinkTrimDays(items:PlanItem[],period:number){
    const date = new Date(period*1000)
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysCount = new Date(year, month+1, 0).getDate()
    return items.map(item=>{
        if(item.days.length == daysCount) return item
        
        const days = new Array(daysCount).fill({})
            .map((d,i)=>({
                day: toSeconds(new Date(year,month,i+1).getTime()),
                plan: !item.days[i]? 0: Number(item.days[i].plan)
            }))
        const plan = days.reduce((acc,item)=>acc+=Number(item.plan),0)
        return {...item, days, plan}
    })
}

export function toSeconds(time:number): number{ return Math.floor(time/1000)}
