import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import ManagePage from "../components/ManagePage.vue"
import PersonPage from "../components/PersonPage.vue"
import HomePage from "../components/HomePage.vue"
import NoticePage from "../components/NoticePage.vue"
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/person",
      component: PersonPage
    },
    {
      path: "/manage",
      component: ManagePage
    },
    {
      path: "/home",
      component: HomePage
    },
    {
      path: "/notice",
      component: NoticePage
    }
  ],
});
