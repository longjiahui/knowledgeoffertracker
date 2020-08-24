import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        component: ()=>import('@/views/Home'),
        children: [{
            path: '/',
            component: ()=>import('@/views/layoutA/LayoutA'),
            children: [{
                path: '/',
                component: ()=>import('@/views/layoutA/Index'),
            }, {
                path: '/sessionlist/:type',
                props: true,
                component: ()=>import('@/views/layoutA/SessionList')
            }, {
                path: '/searchsession/:keyword?',
                props: true,
                component: ()=>import('@/views/layoutA/SessionList')
            }]
        }]
    }]
})