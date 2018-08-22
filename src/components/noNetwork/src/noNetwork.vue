<template>
    <div id="noNetwork" class="noNetwork">
        <img :src="urlImg">
        <p class="text">{{ text }}</p>
    </div>
</template>
<script>

import img_rul from '../../../assets/img/12.png'

export default {
    name: "noNetwork",
    props: {
        text: {
            type: String,
            default: '暂无数据'
        },
        urlImg: {
            type: String,
            default: img_rul,
        }
    },
    data(){
        return {
            img_rul,
        }
    }
} 
</script>
<style lang="scss" scoped>
    .noNetwork{
        height: 100vh;
        background: #fff;
        text-align: center;
        padding-top: 2.5rem;
        img{
            width: 3.6rem;
            height: 2.8rem;
        }
        .text{
            font-size:.28rem;
            color:#999999;
        }
    }
</style>