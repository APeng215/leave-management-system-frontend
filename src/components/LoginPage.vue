<script>
import FetchHelper from "../js/util/FetchHelper.js"
export default {
  mounted() {
    this.autoLogin();
  },
  data() {
    return {
      account: {
        username: "",
        password: ""
      },
      loginFailed: false
    }
  },
  methods: {
    async autoLogin() {
      // Send logging information
      const result = await FetchHelper.fetch("POST", "http://localhost:8081/backend/login", this.account);
      console.log("Success:", result);

      if (result.loginSucceed) {
        this.$emit("loginSucceed");
        this.loginFailed = false;
      }

    },
    async login() {
      // Send logging information
      const result = await FetchHelper.fetch("POST", "http://localhost:8081/backend/login", this.account);
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
.root {
  background: url("/static/login-background.jpg")
}
.white-background {
    background-color: #ffffff;
    /* White color */
}

</style>
<template>
  <div class="d-flex justify-content-center align-items-center vh-100 root">
    <div class="border border-primary rounded p-4 white-background shadow">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label" for="inputUsername">学号/工号</label>
          <input @focus="onInputFocused" type="text" class="form-control" id="inputUsername" name="username" placeholder="ID"
            v-model="account.username" required>
        </div>
        <div class="mb-3">
          <label class="form-label" for="inputPassword">密码</label>
          <input @focus="onInputFocused" type="password" class="form-control" id="inputPassword" name="password" placeholder="Password"
            v-model="account.password" required>
        </div>
        <div class="mb-3 text-danger" v-if="loginFailed">
          登录失败：账号或密码错误
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>