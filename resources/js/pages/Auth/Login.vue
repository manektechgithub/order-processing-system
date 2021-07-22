<template>
    <div class="c-app flex-row align-items-center">
        <CContainer>
            <CRow class="align-items-center">
                <CCol class="offset-md-1 text-center">
                    <h1>Order Processing</h1>
                    <h2>System</h2>
                </CCol>
                <CCol md="4" class="offset-md-1">
                    <CCardGroup>
                        <CCard class="p-4">
                            <CCardBody>
                                <CForm @submit.prevent="login">
                                    <h1>Login</h1>
                                    <p class="text-muted">Sign In to your account</p>
                                    <CInput
                                        placeholder="Email"
                                        autocomplete="username email"
                                        :addInputClasses="{'is-invalid': !!errors.email}"
                                        v-model="email"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-envelope-closed"/>
                                        </template>
                                        <template #invalid-feedback v-for="error in errors.email">
                                            <div class="invalid-feedback">{{ error }}</div>
                                        </template>
                                    </CInput>
                                    <CInput
                                        placeholder="Password"
                                        type="password"
                                        autocomplete="curent-password"
                                        v-model="password"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-lock-locked"/>
                                        </template>
                                    </CInput>
                                    <CRow>
                                        <CCol col="6" class="text-left">
                                            <CButton type="submit" color="primary" class="px-4">Login</CButton>
                                        </CCol>
                                        <CCol col="6" class="text-right">
                                            <CButton color="link" class="px-0">Forgot password?</CButton>
                                            <CButton color="link" class="d-lg-none">Register now!</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
import auth from "../../auth";

export default {
    data() {
        return {
            email: null,
            password: null,
            errors: {}
        }
    },

    methods: {
        login() {
            this.errors = {};
            axios.post('/api/login', {
                email: this.email,
                password: this.password
            }).then(response => {
                auth.setToken(response.data.accessToken);
                this.$store.commit('auth/setUser', response.data.user);
                this.$router.replace('/dashboard');
            }).catch(e => {
                try {
                    this.errors = e.response.data.errors;
                } catch (er) {}
            });
        }
    }
}
</script>
