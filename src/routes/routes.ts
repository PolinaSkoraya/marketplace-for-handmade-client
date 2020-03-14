export const ROUTES = {
    root: '/',

    goods: {
        goods:'/goods/',
        id: '/goods/:id'
    },

    sellers: {
        sellers: '/sellers/',
        id: '/sellers/:id',
        profile: '/seller/:id/profile'
    },

    users: {
        users: '/users/',
        login: '/users/login',
        registration: '/users/registration',
        profile: '/users/:id'
    },

    admin: '/admin'

}
