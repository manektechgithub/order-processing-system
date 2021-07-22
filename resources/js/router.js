import Vue from "vue";
import VueRouter from "vue-router";

/**
 * Layout components
 */
import Auth from "./layouts/Auth";
import TheContainer from "./layouts/TheContainer";

/**
 * Pages components
 */
import Login from "./pages/Auth/Login";

import Dashboard from './pages/Dashboard';
import ProductList from './pages/Products/ProductList';
import ProductForm from "./pages/Products/ProductForm";

Vue.use(VueRouter);

const routes = [
    {
        path: '/', redirect: '/dashboard'
    },
    {
        path: '/',
        component: TheContainer,
        meta: {label: 'Admin'},
        children: [
            {path: '/dashboard', component: Dashboard, meta: {label: 'Dashboard'},},
            {path: '/products', component: ProductList, meta: {label: 'Products'},},
            {path: '/products/create', component: ProductForm, meta: {label: 'Create Product', create: true},},
            {path: '/products/:id/edit', component: ProductForm, meta: {label: 'Edit Product', create: false},}
        ]
    },
    {
        path: '/',
        component: Auth,
        children: [
            {path: '/login', component: Login, meta: {label: 'Login'},},
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes
});

export default router;
