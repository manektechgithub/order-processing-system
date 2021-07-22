<template>
    <CHeader fixed with-subheader light>
        <CToggler
            in-header
            class="ml-3 d-lg-none"
            @click="$store.commit('set', ['sidebarShow', !sidebarShow])"
        />
        <CToggler
            in-header
            class="ml-3 d-md-down-none"
            @click="$store.commit('set', ['sidebarMinimize', !sidebarMinimize])"
        />
        <CHeaderBrand class="mx-auto d-lg-none" to="/">
            <CIcon name="logo" height="48" alt="Logo"/>
        </CHeaderBrand>
        <CHeaderNav class="ml-auto mr-4">
            <CHeaderNavItem class="d-md-down-none mx-2">
                <CHeaderNavLink>
                    <CIcon name="cil-bell"/>
                </CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem class="d-md-down-none mx-2">
                <CHeaderNavLink>
                    <CIcon name="cil-list"/>
                </CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem class="d-md-down-none mx-2">
                <CHeaderNavLink>
                    <CIcon name="cil-envelope-open"/>
                </CHeaderNavLink>
            </CHeaderNavItem>
            <TheHeaderDropdownAccnt/>
        </CHeaderNav>
    </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import {mapState} from 'vuex';

export default {
    name: 'TheHeader',
    components: {
        TheHeaderDropdownAccnt
    },

    computed: mapState(['sidebarMinimize', 'sidebarShow'])
}
</script>
