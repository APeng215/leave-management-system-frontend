<script>
import ClockElement from "../components/ClockElement.vue"
export default {
    components: {
        ClockElement
    }

}
</script>
<template>
    <div class="home white-background d-flex justify-content-center vh-100 w-100">
        <ClockElement></ClockElement>
    </div>
</template>
<style scoped>


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
