// API
function getDomain(){
    const proxy = PRODUCTION ? '' : 'localhost:1337/'
    const tenant = document.querySelector('meta[name=tenant-domain]').getAttribute('content')
    const domain = document.querySelector('#menu-visual').getAttribute('data-api-host')
    return `http://${proxy}${tenant}.${domain}`
}

export const ROOT_MENU_ID = document.querySelector('#menu-visual').getAttribute('data-id')
export const DOMAIN = getDomain()
export const MENU_LENGTH = 24
export const PRODUCT = 'PRODUCT'
export const CATEGORY = 'CATEGORY'
export const MENU = 'MENU'
export const API_LOAD_TIMEOUT = 4000

// intl
export const MENU_ITEM_NAME = 'Название '
export const INCLUDES_CATEGORIES = 'Товары из категории '
export const ALSO_CONTAINS = 'Товары '
export const SAVE  = 'Сохранить'
export const CANCEL= 'Отменить'
export const CLOSE = 'Закрыть'
export const ADD = 'Добавить'
export const DELETE = 'Удалить'
export const ICON = 'Иконка'
export const COLOR = 'Цвет'
export const MENU_ITEM = 'Элемент меню'
export const R_U_SURE = 'Вы действительно хотите удалить ?'
export const ENTER_CATEGORY_NAME = 'Введите название раздела меню'
export const NAME = 'Наименование'
export const PARENT = 'Родитель'
export const PRODUCTS = 'Товары'
export const PRODUCTS_OF_CATEGORY = 'Товары из категории'
export const EXCLUDED_GOODS = 'Исключить товары'
export const CREATE_NEW_ITEM = 'Создать новую запись в меню'
export const EDIT = 'Редактировать'
export const ADD_ROW = 'Добавить еще один ряд '

export const icons = [
        'salad', 
        'soup',
        'rice-noodles',
        'sweet-roll',
        'big-roll',
        'small-roll',
        'cream-roll',
        'hot-roll',
        'mixed-roll',
        'tortilla-roll',
        'tempura-roll',
        'thin-dough',
        'thick-dough',
        'hot-drink',
        'cold-drink',
        'milk-shake',
        'ice-cream',
        'cheese-cake',
        'babyish-menu'
    ]
    
export const colors = [
    '#cccccc',
    '#999999',
    '#333333',
    '#66CCCC',
    '#08A9AE',
    '#95ACE6',
    '#476FBD',
    '#FF4646',
    '#FFCC33',
    '#8AAE3E',
    '#D679BD',
    '#A60000',
    '#91006C',
    '#007C80'
]