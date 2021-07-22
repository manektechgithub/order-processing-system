<template>
    <c-card>
        <c-card-header>{{ createRoute ? 'Create product' : 'Edit product' }}</c-card-header>
        <c-card-body>
            <CForm @submit.prevent="submit">
                <CInput
                    label="Title"
                    v-model="item.title"
                ></CInput>
                <CTextarea
                    label="Description"
                    v-model="item.description"
                    :rows="5"
                ></CTextarea>

                <c-button type="submit" color="primary">Save</c-button>
                <a class="btn btn-secondary" @click.prevent="$router.back()">Go, back</a>
            </CForm>
        </c-card-body>
    </c-card>
</template>

<script>
const fetchPost = function (id) {
    return axios.get('/api/products/' + id)
        .then(response => response.data.data);
}

export default {
    data() {
        return {
            item: {
                id: null,
                title: null,
                description: null
            },

            errors: {}
        }
    },

    beforeRouteEnter(to, from, next) {
        if (!to.params.id) {
            next();
            return;
        }

        fetchPost(to.params.id).then(item => {
            next(vm => vm.setItem(item));
        });
    },

    beforeRouteUpdate(to, from, next) {
        if (!to.params.id) {
            next();
            return;
        }
        this.item = null

        fetchPost(to.params.id).then(item => {
            next(vm => vm.setItem(item));
        });
    },

    computed: {
        createRoute() {
            return this.$route.meta.create || false
        }
    },

    methods: {
        setItem(item) {
            this.item = item;
        },

        submit() {
            if (this.item.id) {
                this.update();
            } else {
                this.create();
            }
        },

        create() {
            return axios.post('/api/products', this.item).then()
                .then(response => {
                    this.$store.commit('flash', {message: 'The product was created successfully.'});

                    this.$router.push('/products')
                })
                .catch(e => {
                    this.errors = e.response.data.errors;
                });
        },

        update() {
            return axios.patch('/api/products/' + this.item.id, this.item)
                .then(response => {
                    this.$store.commit('flash', {message: 'The product was updated successfully.'});

                    this.$router.push('/products')
                })
                .catch(e => {
                    this.errors = e.response.data.errors;
                });
            ;
        }
    }
}
</script>
