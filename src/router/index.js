import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/LoginOrRegister/Login";
import Register from "@/components/LoginOrRegister/Register.vue";
import Home from "@/views/Home.vue"
import MenuSort from "@/components/Menu/MenuSort.vue";
import Notice from "@/components/Notice/Notice.vue"
import OrderAll from "@/components/Orders/OrderAll.vue";
import OrderSearch from "@/components/Orders/OrderSearch.vue";
import MenuPutUp from "@/components/Menu/MenuPutUp.vue";
import CustomersInfo from "@/components/HumInfo/CustomersInfo.vue";
import StaffsInfo from "@/components/HumInfo/StaffsInfo.vue";
import MenuSearch from "@/components/Menu/MenuSearch.vue";
import Cook from "@/views/Cook.vue"
import Feedback from "@/components/Setting/Feedback.vue";
import Summary from "@/components/Summary/Summary.vue";
import MenuOrdinary from "@/components/Menu/MenuOrdinary.vue";
import NoticeOrdinary from "@/components/Notice/NoticeOrdinary.vue";


const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/cook',
        name: 'cook',
        component: Cook
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/menu',
                name: 'menu',
                component: MenuSort
            },
            {
                name: 'menu_ordinary',
                path: '/menu_ordinary',
                component: MenuOrdinary
            },
            {
                path: '/menu_search',
                name: 'menu_search',
                component: MenuSearch
            },
            {
                path: '/notice',
                name: 'notice',
                component: Notice
            },
            {
                path: '/notice_ordinary',
                name: 'notice_ordinary',
                component: NoticeOrdinary
            },
            {
                path: '/feedback',
                name: 'feedback',
                component: Feedback
            },
            {
                path: '/order_all',
                name: 'order_all',
                component: OrderAll
            },
            {
                path: '/order_search',
                name: 'order_search',
                component: OrderSearch
            },
            {
                path: '/menu_put_up',
                name: 'menu_put_up',
                component: MenuPutUp
            },
            {
                path: '/customers_info',
                name: 'customers_info',
                component: CustomersInfo
            },
            {
                path: '/staffs_info',
                name: 'staffs_info',
                component: StaffsInfo
            },
            {
                path: '/summary',
                name: 'summary',
                component: Summary
            }]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

