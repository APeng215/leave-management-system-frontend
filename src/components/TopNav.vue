<script>
import { BButton } from 'bootstrap-vue';
import { router } from '../js/router'
import FetchHelper from '../js/util/FetchHelper'
export default {
    props: {
        logged: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            user:{
                name: ""
            },
            oldPassword: "",
            newPassword: "",
            newPasswordForConfirm: "",

            passwordUnmatched: false,
        }
    },
    computed: {
        oldPasswordState() {
            if(this.oldPassword.length !=0) {
                return true;
            }
            return false;
        },
        newPasswordState() {
            if(this.newPassword.length >= 6) {
                return true;
            }
            return false;
        },
        newPasswordForConfirmState() {
            if(this.newPasswordForConfirm.length >= 6) {
                return true;
            }
            return false;
        },

    },
    methods: {
        onMainPageClicked() {
            if (this.logged) {
                router.push("/home");
            }
            else {
                router.push("/login");
            }
        },
        onLogoutClicked() {
            FetchHelper.fetch("GET", "http://localhost:8081/backend/logout");
            this.$emit("logout");
        },
        async tryChangePassword(bvModalEvent) {
            bvModalEvent.preventDefault()
            if (this.newPassword != this.newPasswordForConfirm) {
                this.passwordUnmatched = true;
                return;
            }
            const result = await FetchHelper.fetch("POST", "http://localhost:8081/backend/changePassword", { oldPassword: this.oldPassword, newPassword: this.newPassword });
            console.log(result);
            if (result.changeSucceed == true) {
                this.$emit("logout");
                this.$bvModal.hide("changePasswordModal");
                this.$bvModal.msgBoxOk('密码修改成功！请重新登录', { okTitle: '确定', centered: true });
            } else {
                this.$bvModal.msgBoxOk("密码修改失败！原因：" + result.reason, { okTitle: '确定', centered: true });
            }
        },
        onChangingPasswordInputFocused() {
            this.passwordUnmatched = false;
            this.passwordTooEasy = false;
        },
        async requestUserInfo() {
            const result = await FetchHelper.fetch("GET", "http://localhost:8081/backend/requestUserInfo");
            this.user.name = result.name;
        },
        goToPersonPage() {
            this.$router.push("/person");
        }
    }
}
</script>
<template>
    <nav class="navbar fixed-top shadow" data-bs-theme="dark">
        <div class="container-fluid">
            <a href="#" class="navbar-brand"><i class="bi bi-window-sidebar"></i>  请假管理系统</a>
            <div class="nav-item d-flex ms-auto">
                <router-link class="nav-link text-white" v-if="!logged" to="/login">登录</router-link>
                <a class="nav-link text-white me-4" href="" v-if="logged" @click.prevent="goToPersonPage"><i class="bi bi-person-circle"></i>  {{this.user.name}}</a>
                <a class="nav-link text-white" href="" v-if="logged" @click="onLogoutClicked">注销  <i class="bi bi-box-arrow-right"></i></a>
            </div>
        </div>
    </nav>
</template>
<style>
.navbar {
    background-color:rgb(28, 118, 198)
}
</style>