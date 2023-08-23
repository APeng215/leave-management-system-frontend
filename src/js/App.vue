<script>
import TopNav from '../components/TopNav.vue'
import {router} from "../js/router.js"
export default {
    mounted() {
        router.push("/login");
    },
    components: {
        TopNav,
    },
    data() {
        return {
            logged : false
        }
    },
    methods:{
        onLoginSucceed() {
            this.logged = true;
            router.push("/home")
        }
    }
}
</script>



<template>
    <TopNav :logged="logged"></TopNav>
    <router-view @login-succeed="onLoginSucceed"></router-view>
</template>
