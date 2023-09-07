<script>
import ClockElement from "../components/ClockElement.vue"
export default {
    components: {
        ClockElement
    }

}
</script>
<template>
    <div class="home-space home white-background d-flex justify-content-center align-items-top vh-100">
        <ClockElement></ClockElement>
    </div>
</template>
<style scoped>
.home-space {
    padding-left: 300px;
    padding-top: 56px;
}

img {
    position: fixed;
}

.home {
    background-color: #fbfbfb;
    background-image: url("/static/ZZU.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
}
</style>
