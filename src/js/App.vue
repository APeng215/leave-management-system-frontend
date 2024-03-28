<script>
import TopNav from '../components/TopNav.vue'
import { useRoute } from 'vue-router'
import { router } from "../js/router.js"
export default {
    mounted() {
        router.push("/login");
    },
    components: {
        TopNav,
    },
    data() {
        return {
            logged: false
        }
    },
    methods: {
        onLoginSucceed() {
            this.logged = true;
            this.$refs.topNav.requestUserInfo();
            router.push("/home")
        },
        onLogout() {
            this.logged = false;
            router.push("/login")
        },

        toMainPage() {
            router.push("/home")
        },
        toPersonPage() {
            router.push("/person")
        },
        toManagePage() {
            router.push("/manage")
        },
    },
    computed: {

        isOnMainPage() {
            return this.$route.path == "/home";
        },
        isOnPersonPage() {
            return this.$route.path == "/person";
        },
        isOnManagePage() {
            return this.$route.path == "/manage";
        }
    }
}
</script>



<template>
    <div class="root d-flex align-items-center justify-content-center" :class="{ 'root-logged': logged }">
        <TopNav :logged="logged" @logout="onLogout" ref="topNav"></TopNav>
        <router-view @login-succeed="onLoginSucceed" @logout="onLogout"
            @url-updated="this.$refs.topNav.updateImgUrl()"></router-view>

    </div>







    <nav id="sidebarMenu" class="d-lg-block sidebar collapse bg-white shadow" v-if="logged">
        <div class="position-sticky">
            <div class="list-group list-group-flush mx-3 mt-4">
                <a href="#" class="list-group-item list-group-item-action py-2 ripple" @click="toMainPage"
                    :class="{ 'active': isOnMainPage }">
                    <i class="fas fa-tachometer-alt fa-fw me-3"></i>
                    <span><i class="bi bi-house-door-fill"></i> 主页</span>
                </a>

                <a href="#" class="list-group-item list-group-item-action py-2 ripple" @click="toPersonPage"
                    :class="{ 'active': isOnPersonPage }"><i class="fas fa-lock fa-fw me-3"></i>
                    <span><i class="bi bi-person-lines-fill"></i> 个人信息</span></a>

                <a href="#" class="list-group-item list-group-item-action py-2 ripple" @click="toManagePage"
                    :class="{ 'active': isOnManagePage }"><i class="fas fa-chart-line fa-fw me-3"></i><span><i
                            class="bi bi-calendar2-week-fill"></i> 请假管理</span></a>


            </div>
        </div>
    </nav>
    <!-- Sidebar -->
</template>
<style scoped>
@media (min-width: 700px) {
    .root {
        background-color: #fbfbfb;
        padding-top: 56px;
        height: 100vh;
        background: url("/static/login-background.jpg");
        background-attachment: fixed;
    }
}




@media (min-width: 700px) {
    .root-logged {
        padding-left: 300px;
    }
}



/* Sidebar */
.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 58px 0 0;
    /* Height of navbar */
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    width: 300px;
    z-index: 600;
}

@media (max-width: 991.98px) {
    .sidebar {
        width: 100%;
    }
}

.sidebar .active {
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto;
    /* Scrollable contents if viewport is shorter than content. */
}

.light-gray-background {
    background-color: #f4f4f4;
    /* Light gray color */
}
</style>