<template>
    <CDropdown
        inNav
        class="c-header-nav-items"
        placement="bottom-end"
        add-menu-classes="pt-0"
    >
        <template #toggler>
            <CHeaderNavLink>
                <div v-if="user">
                    {{ user.name }}
                    <CIcon name="cil-chevron-bottom"></CIcon>
                </div>
            </CHeaderNavLink>
        </template>
        <CDropdownHeader
            tag="div"
            class="text-center"
            color="light"
        >
            <strong>Settings</strong>
        </CDropdownHeader>
        <CDropdownItem>
            <CIcon name="cil-user"/>
            Profile
        </CDropdownItem>
        <CDropdownItem @click="logout">
            <CIcon name="cil-lock-locked"/>
            Logout
        </CDropdownItem>
    </CDropdown>
</template>

<script>
import auth from "../auth";
import {mapState} from "vuex";

export default {
    name: 'TheHeaderDropdownAccnt',

    data() {
        return {
            itemsCount: 42
        }
    },

    computed: mapState('auth', ['user']),

    methods: {
        logout() {
            auth.removeToken();
            this.$store.commit('auth/setUser', null);

            this.$router.replace('/login');
        }
    }
}
</script>

<style scoped>
.c-icon {
    margin-right: 0.3rem;
}
</style>
