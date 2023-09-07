<script>
import { useCurrentTime } from "../js/useCurrentTime";
export default {
    name: "CurrentTimeExample",
    setup() {
        const { currentTime } = useCurrentTime();
        console.log(currentTime.value);
        return { currentTime };
    },
};
</script>

<template>
        <div id="clock" class="space">
            <p class="time">{{ currentTime.toLocaleTimeString() }}</p>
            <p class="date">{{ currentTime.toLocaleDateString() }}</p>
        </div>
</template>



<style scoped>
.space {
    padding-left: 300px;
    padding-top: 56px;
}
html,body {
    height: 100%;
}
body {
    background: #0f3854;
    background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%);
    background-size: 100%;
}
p {
    margin: 0;
    padding: 0;
}
#clock {
    font-family: Consolas ,Calibri, monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
    .time {
        letter-spacing: 0.05em;
        font-size: 240px;
        padding: 5px 0;
    }
    .date {
        letter-spacing: 0.1em;
        font-size: 72px;
    }
    .text {
        letter-spacing: 0.1em;
        font-size: 12px;
        padding: 20px 0 0;
    }
}
</style>