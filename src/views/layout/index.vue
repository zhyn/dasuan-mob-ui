<template>
    <div class="layout">
        <header class="el-header">Header</header>
        <section class="el-container">
            <aside class="el-aside">
                aside
            </aside>
            <div class="el-main">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
<script type="text/babel">

export default {
	name: "demo",
    data(){
        return {}
    },
    components: {},
    computed: {},
    watch: {},
    created(){},
    mounted(){},
    methods: {},
}
</script>
<style scoped lang="scss">
    .layout {
        width: 1140px;
        margin: 0 auto;
        font-size: 18px;
        .el-header {
            margin-top: 10px;
            background-color: #b3c0d1;
            color: #333;
            height: 60px;
            line-height: 60px;
            font-size: 18px;
            box-sizing: border-box;
            flex-shrink: 0;
            margin-bottom: 20px;
        }
        .el-container {
            display:flex;
            justify-content:center;
            align-items:center;

            .el-aside {
                width: 240px;
                margin-right: 20px;
            }
            .el-main {
                flex: 1;
                background-color: #e9eef3;
                color: #333;
                text-align: center;
            }
        }
    }
</style>