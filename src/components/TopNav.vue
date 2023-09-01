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
    data() {
        return {
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
                <a class="nav-link text-white me-3" href="#" id="show-btn"
                    @click="$bvModal.show('changePasswordModal')" v-if="logged">修改密码</a>
                <b-modal id="changePasswordModal" cancel-title="取消" ok-title="确定修改" title="修改密码" @ok="tryChangePassword" centered>
                    <b-form id="requestForm">
                        <b-input-group class="mb-3" prepend="旧密码">
                            <b-form-input type="password" v-model="oldPassword" :state="oldPasswordState"></b-form-input>
                        </b-input-group>
                        <div class="text-danger mb-3 d-flex justify-content-center" v-if="!oldPasswordState">
                            请输入旧密码
                        </div>
                        <b-input-group class="mb-3 flex-colunm" prepend="新密码">
                            <b-form-input type="password" v-model="newPassword" :state="newPasswordState" @focus="onChangingPasswordInputFocused"></b-form-input>
                        </b-input-group>
                        <div class="text-danger mb-3 d-flex justify-content-center" v-if="!newPasswordState">
                            新密码长度至少为6
                        </div>

                        <b-input-group class="mb-3" prepend="确认新密码" :invalid-feedback="newPasswordForConfirmInvalidFeedback">
                            <b-form-input type="password" v-model="newPasswordForConfirm" :state="newPasswordForConfirmState" @focus="onChangingPasswordInputFocused"></b-form-input>
                        </b-input-group>
                        <div class="text-danger d-flex justify-content-center" v-if="passwordUnmatched">
                            两次新密码不一致！
                        </div>

                    </b-form>

                </b-modal>
                <a class="nav-link text-white" href="" v-if="logged" @click="onLogoutClicked">注销</a>
            </div>
        </div>
    </nav>
</template>
  