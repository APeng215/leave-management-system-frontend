<script>
import FetchHelper from '../js/util/FetchHelper';
export default {
    mounted() {
        this.requestUserInfo();
    },
    data() {
        return {
            user: {
                name: null,
                username: null,
                id: null,
                sex: null,
                department: null,
                duty: null,


            },
            oldPassword: "",
            newPassword: "",
            newPasswordForConfirm: "",

            passwordUnmatched: false,
        };
    },
    methods: {

        async requestUserInfo() {
            const result = await FetchHelper.fetch("GET", "http://localhost:8081/backend/requestUserInfo");
            this.user = result;
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
    },
    computed: {
        oldPasswordState() {
            if (this.oldPassword.length != 0) {
                return true;
            }
            return false;
        },
        newPasswordState() {
            if (this.newPassword.length >= 6) {
                return true;
            }
            return false;
        },
        newPasswordForConfirmState() {
            if (this.newPasswordForConfirm.length >= 6) {
                return true;
            }
            return false;
        },
    }

}
</script>
<style scoped>

.root {
    padding-left: 300px;
    background: url("/static/login-background.jpg")
}
</style>


<template>
    <div class="d-flex justify-content-center align-items-center flex-column vh-100 root">
        <div class="d-flex justify-content-center align-items-center flex-column">
            <button type="button" class="btn btn-danger btn-lg mb-3 shadow" @click="$bvModal.show('changePasswordModal')">
                修改密码  <i class="bi bi-pencil-square"></i>
            </button>
            <b-modal id="changePasswordModal" cancel-title="取消" ok-title="确定修改" title="修改密码" @ok="tryChangePassword"
                centered>
                <b-form id="requestForm">
                    <b-input-group class="mb-3" prepend="旧密码">
                        <b-form-input type="password" v-model="oldPassword" :state="oldPasswordState"></b-form-input>
                    </b-input-group>
                    <div class="text-danger mb-3 d-flex justify-content-center" v-if="!oldPasswordState">
                        请输入旧密码
                    </div>
                    <b-input-group class="mb-3 flex-colunm" prepend="新密码">
                        <b-form-input type="password" v-model="newPassword" :state="newPasswordState"
                            @focus="onChangingPasswordInputFocused"></b-form-input>
                    </b-input-group>
                    <div class="text-danger mb-3 d-flex justify-content-center" v-if="!newPasswordState">
                        新密码长度至少为6
                    </div>

                    <b-input-group class="mb-3" prepend="确认新密码" :invalid-feedback="newPasswordForConfirmInvalidFeedback">
                        <b-form-input type="password" v-model="newPasswordForConfirm" :state="newPasswordForConfirmState"
                            @focus="onChangingPasswordInputFocused"></b-form-input>
                    </b-input-group>
                    <div class="text-danger d-flex justify-content-center" v-if="passwordUnmatched">
                        两次新密码不一致！
                    </div>

                </b-form>

            </b-modal>
            <!-- Pernsonal Infomation -->
            <div class="p-3 mb-3 border border-primary rounded d-flex flex-column white-background shadow">
                <p class="fs-3 d-flex justify-content-center"><i class="bi bi-person-square"></i>&nbsp个人信息</p>
                <div class="input-group mb-3">
                    <label class="input-group-text">姓名</label>
                    <input type="text" class="input-group-text" readonly :value="this.user.name">
                </div>

                <div class="input-group mb-3">
                    <label class="input-group-text">学号/工号</label>
                    <input type="text" class="input-group-text" readonly :value="this.user.username">
                </div>

                <div class="input-group mb-3">
                    <label class="input-group-text">身份证号</label>
                    <input type="text" class="input-group-text" readonly :value="this.user.id">
                </div>

                <div class="input-group mb-3">
                    <label class="input-group-text">性别</label>
                    <input type="text" class="input-group-text" readonly :value="this.user.sex">
                </div>

                <div class="input-group mb-3">
                    <label class="input-group-text">学院</label>
                    <input type="text" class="input-group-text" readonly :value="this.user.department">
                </div>

                <div class="input-group">
                    <label class="input-group-text">身份</label>
                    <input type="text" class="input-group-text" readonly :value="this.user.duty">
                </div>

            </div>

        </div>

    </div>
</template>