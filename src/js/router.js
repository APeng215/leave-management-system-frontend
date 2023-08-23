import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import HomePage from "../components/HomePage.vue"
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/home",
      component: HomePage
    }
  ],
});
