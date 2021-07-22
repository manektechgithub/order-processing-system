<template>
    <div>
        <h1>Dashboard</h1>
        <h2 v-if="user">Welcome, {{ user.name }}</h2>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    computed: mapState('auth', ['user']),
}
</script>
