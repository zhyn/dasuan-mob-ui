<template>
    <div id="star" class="star">
        <span v-if="!isShow" class="star-item-bigYellow" :class="itemclass" v-for="(itemclass, indexs) in itemclasses"
        :track-by="indexs" @click="stars(indexs)"></span>
        <span v-if="isShow && type == 'smallred'" class="star-item-smallRed" :class="itemclass" v-for="(itemclass, indexs) in itemclasses"
        :track-by="indexs"></span>
        <span v-if="isShow && type == 'smallyellow'" class="star-item-smallYellow" :class="itemclass" v-for="(itemclass, indexs) in itemclasses"
        :track-by="indexs"></span>
    </div>
</template>
<script>
    export default {
        name: 'dsStar',
        props: ['isShow', 'type', 'starCount'],
        data() {
            return {
                // score: this.starCount ? this.starCount : null
            }
        },
        mounted() {
        },
        methods: {
            stars(index) {
                // this.score = index + 1;
                this.$emit('starsIndex', index+1)
                this.$on('starsIndex', function (msg) {
                  console.log(msg)
                })
            }
        },
        computed: {
            itemclasses() {
                this.starCount > 5 ?  this.starCount = 5 : this.starCount;
                let result = [];
                let score = Math.floor(this.starCount * 2) / 2;
                let hashalf = score % 1 !== 0;
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                    if (this.type == 'smallred') {
                        result.push('on-smallR');
                    } else if (this.type == 'smallyellow') {
                        result.push('on-smallY');
                    } else {
                        result.push('on');
                    }
                }
                if (hashalf) {
                    if (this.type == 'smallred') {
                        result.push('half-smallR');
                    } else if (this.type == 'smallyellow') {
                        result.push('half-smallY');
                    } else {
                        result.push('half');
                    }
                }
                while (result.length < 5) {
                    if (this.type == 'smallred') {
                        result.push('off-smallR');
                    } else if (this.type == 'smallyellow') {
                        result.push('off-smallY');
                    } else {
                        result.push('off');
                    }
                }
                this.$emit('starnum', result);
                return result;
            }
        }
    }
</script>
<style lang="scss" scoped>
.star{
    text-align: center;
    .star-item-bigYellow {
        display: inline-block;
        width: .58rem;
        height: .54rem;
        margin-right: .25rem;
    }
    .star-item-smallYellow {
        display: inline-block;
        width: .23rem;
        height: .23rem;
        margin-right: .06rem;
    }
    .star-item-smallRed {
        display: inline-block;
        width: .25rem;
        height: .23rem;
        margin-right: .06rem;
    }
    .on {
        background: url('../../../assets/img/star_big_yellow.svg') no-repeat center;
        background-size: 100% 100%;
    }
    .half {
        background: url('../../../assets/img/star_big_yellow.svg') no-repeat center;
        background-size: 100% 100%;
    }
    .off {
        background: url('../../../assets/img/star_big_gray.svg') no-repeat center;
        background-size: 100% 100%;
    }
    .on-smallY {
        background: url('../../../assets/img/star_small_yellow.svg') no-repeat center;
        background-size: 100% 100%;
    }
    .half-smallY {
        background: url('../../../assets/img/star_small_yellow.svg') no-repeat center;
        background-size: 100% 100%;
    }
    .off-smallY {
        background: url('../../../assets/img/star_small_gray.svg') no-repeat center;
        background-size: 100% 100%;
    }
    .on-smallR {
        background: url('../../../assets/img/star_red1.svg') no-repeat center;
        background-size: 100% 100%;
    }
    .half-smallR {
        background: url('../../../assets/img/star_red2.png') no-repeat center;
        background-size: .25rem .25rem;
    }
    .off-smallR {
        background: url('../../../assets/img/star_red3.svg') no-repeat center;
        background-size: 100% 100%;
    }
}
</style>
