<script>
import FetchHelper from "../js/util/FetchHelper.js"
import VarificationCode from "./VarificationCode.vue";
export default {
  mounted() {
    this.autoLogin();
    this.refreshCode();
  },
  data() {
    return {
      inputCode: "",
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz", //随机串内容,从这里随机抽几个显示验证码
      identifyCode: "", //验证码图片内容
      account: {
        username: "",
        password: ""
      },
      loginFailed: false,
      codeWrong: false
    }
  },
  components: {
    VarificationCode
  },
  methods: {
    // 重置验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //获取验证码的值
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        //通过循环获取字符串内随机几位
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    //随机数字：用于当角标拿字符串的值
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    async autoLogin() {
      // Send logging information
      const result = await FetchHelper.fetch("POST", "/login", this.account);
      console.log("Success:", result);

      if (result.loginSucceed) {
        this.$emit("loginSucceed");
        this.loginFailed = false;
      }

    },
    async login() {
      if(this.inputCode != this.identifyCode) {
        this.codeWrong = true;
        this.refreshCode();
        return;
      }
      // Send logging information
      const result = await FetchHelper.fetch("POST", "/login", this.account);
      console.log("Success:", result);

      if (result.loginSucceed) {
        this.$emit("loginSucceed");
        this.loginFailed = false;
      }
      else {
        this.loginFailed = true;
      }
    },
    onInputFocused() {
      this.loginFailed = false;
    }

  }
}
</script>
<style scoped>
.login-root {}

.white-background {
  background-color: #ffffff;
  /* White color */
}
</style>
<template>
  <div class="d-flex justify-content-center align-items-center vh-100 login-root">
    <div class="border border-primary rounded p-4 white-background shadow">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label" for="inputUsername">学号/工号</label>
          <input @focus="onInputFocused" type="text" class="form-control" id="inputUsername" name="username"
            placeholder="ID" v-model="account.username" required>
        </div>
        <div class="mb-3">
          <label class="form-label" for="inputPassword">密码</label>
          <input @focus="onInputFocused" type="password" class="form-control" id="inputPassword" name="password"
            placeholder="Password" v-model="account.password" required>
        </div>
        <div class="mb-3 text-danger" v-if="loginFailed">
          登录失败：账号或密码错误
        </div>
        <div class="input-group d-flex flex-row align-items-center mb-3">
          <input class="form-control" placeholder="请输入验证码" v-model="inputCode" @focus="codeWrong=false" required>
          <VarificationCode :identifyCode="identifyCode"></VarificationCode>
        </div>
        <div class="mb-3 text-danger" v-if="codeWrong">
          登录失败：验证码错误
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>