<script>
import { router } from '../js/router'
import FetchHelper from '../js/util/FetchHelper'
export default {
    props: {
        logged: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onMainPageClicked() {
            if (this.logged) {
                router.push("/home")
            }
            else {
                router.push("/login")
            }
        },
        onLogoutClicked() {
            FetchHelper.fetch("GET", "http://localhost:8081/backend/logout");
            this.$emit("logout");
        }
    }
}
</script>
<template>
    <nav class="navbar bg-primary fixed-top" data-bs-theme="dark">
        <div class="container-fluid">
            <a href="#" class="navbar-brand">请假管理系统</a>

            <div class="">
                <a class="nav-link text-white" @click="onMainPageClicked" href="#">主页</a>
            </div>
            <div class="nav-item d-flex ms-auto">
                <router-link class="nav-link text-white" v-if="!logged" to="/login">登录</router-link>
                <a class="nav-link text-white" href="" v-if="logged" @click="onLogoutClicked">注销</a>
            </div>
        </div>
    </nav>
</template>
  