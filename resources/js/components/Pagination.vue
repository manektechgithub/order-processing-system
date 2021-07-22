<template>
    <c-pagination
        :size="size"
        :align="align"
        :dots="dots"
        :arrows="arrows"
        :double-arrows="doubleArrows"
        :activePage="pagination.current_page"
        :pages="pagination.last_page"
        @update:activePage="updateActivePage"
    ></c-pagination>
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            default: () => ({})
        },

        size: {
            type: String,
            validator: val => ['', 'sm', 'lg'].includes(val)
        },

        align: {
            type: String,
            default: 'start',
            validator: val => ['start', 'center', 'end'].includes(val)
        },

        dots: {
            type: Boolean,
            default: true
        },

        arrows: {
            type: Boolean,
            default: true
        },

        doubleArrows: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        updateActivePage(number) {
            this.$emit('update:activePage', number, false)
        }
    }
}
</script>
