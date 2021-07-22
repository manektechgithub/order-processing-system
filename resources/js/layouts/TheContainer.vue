<template>
    <div class="c-app">
        <TheSidebar/>
        <CWrapper>
            <TheHeader @toggle-sidebar-desktop="$emit('toggle-sidebar-desktop')" @toggle-sidebar-mobile="$emit('toggle-sidebar-mobile')"/>
            <div class="c-body">
                <main class="c-main">
                    <CContainer fluid>
                        <c-alert v-if="flash.message" :show="5" :closeButton="true" :color="flash.type" :fade="true">
                            {{ flash.message }}
                        </c-alert>

                        <transition name="fade" mode="out-in">
                            <router-view :key="$route.path"></router-view>
                        </transition>
                    </CContainer>
                </main>
            </div>
            <TheFooter/>
        </CWrapper>
    </div>
</template>

<script>
import {mapState} from 'vuex';

import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
export default {
    name: 'TheContainer',

    components: {
        TheSidebar,
        TheHeader,
        TheFooter
    },

    computed: mapState(['flash']),

    beforeMount() {
        this.loadUser();
    },

    methods: {
        loadUser() {
            axios.get('/api/user').then(response => {
                this.$store.commit('auth/setUser', response.data);
            });
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
