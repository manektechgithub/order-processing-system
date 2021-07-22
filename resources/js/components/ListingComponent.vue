<template>
    <div>
        <c-card>
            <c-card-header>
                <div class="d-flex justify-content-between text-xl font-weight-bold">
                    <div>{{ title }}</div>
                    <router-link v-if="createUrl" :to="createUrl" class="btn btn-sm btn-outline-primary">Create</router-link>
                </div>
            </c-card-header>
            <c-card-body>
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th v-for="heading in headings">{{ heading }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <template v-for="(column, j) in columns">
                            <td v-if="column === 'actions'">
                                <router-link class="btn btn-sm btn-outline-primary"
                                             :to="editUrl.replace(':id', item.id)">
                                    <CIcon name="cil-pencil" size="sm"></CIcon>
                                </router-link>
                                <a @click.prevent="deleting = item.id" class="btn btn-sm btn-outline-danger">
                                    <CIcon name="cil-trash" size="sm"></CIcon>
                                </a>
                            </td>
                            <td :key="j" v-else>{{ item[column] }}</td>
                        </template>
                    </tr>
                    <tr v-if="!items.length">
                        <td :colspan="columns.length">No {{ title }} available.</td>
                    </tr>
                    </tbody>
                </table>
            </c-card-body>
            <c-card-footer>
                <pagination align="center" :pagination="pagination" @update:activePage="updateActivePage"/>
            </c-card-footer>
        </c-card>

        <c-modal title="Delete" size="lg" :show="!!deleting" @update:show="() => { deleting = null; }"
                 :close-on-backdrop="true">
            Are you sure you want to delete this item ?

            <template v-slot:footer>
                <c-button color="secondary" @click="deleting = null">Cancel, I have changed my mind.</c-button>
                <c-button color="primary" @click="deleteItem(deleting)">Yes, delete it!</c-button>
            </template>
        </c-modal>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: null
        },

        headings: {
            type: Array,
            default: () => ([])
        },

        columns: {
            type: Array,
            default: () => ([])
        },

        apiUrl: {
            type: String,
            default: null
        },

        editUrl: {
            type: String,
            default: null
        },

        createUrl: {
            type: String,
            default: null
        }
    },

    beforeMount() {
        this.loadItems();
    },

    data() {
        return {
            items: [],
            pagination: {
                current_page: parseInt(this.$route.query.page || 1)
            },
            loading: false,

            deleting: null
        }
    },

    computed: {
        page() {
            return parseInt(this.$route.query.page || 1);
        }
    },

    watch: {
        page() {
            this.loadItems();
        }
    },

    methods: {
        loadItems() {
            if (this.loading) {
                return;
            }

            this.loading = true;

            axios.get(this.apiUrl, {
                params: {
                    paginate: 1,
                    order_by: 'id,DESC',
                    page: this.page,
                }
            }).then(response => {
                this.items = response.data.data;
                this.pagination = response.data.meta;
            }).finally(() => this.loading = false);
        },

        updateActivePage(number) {
            this.$router.push({path: this.$route.path, query: {page: number}});
        },

        deleteItem(id) {
            axios.delete([this.apiUrl, id].join('/'))
                .then(response => {
                    this.$store.commit('flash', {message: 'The ' + this.title + ' was deleted successfully.'});
                    this.deleting = null;
                    this.loadItems();
                });
        }
    }
}
</script>
