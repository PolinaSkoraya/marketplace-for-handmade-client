export const ROUTES = {
    root: '/',

    goods: {
        goods:'/goods/',
        id: '/goods/:id'
    },

    sellers: {
        sellers: '/sellers/',
        id: '/sellers/:id',
        profile: '/sellers/profile/'
    },

    buyers: {
        buyers: '/buyers/',
        login: '/buyers/login',
        registration: '/buyers/registration',
        profile: '/buyers/:id'
    }

}
