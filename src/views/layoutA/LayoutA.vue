<template>
    <div class="layout-a">
        <nav class="nav-bar">
            <div class="container-row-center" style="font-size: 1.3rem">
                <div style="margin-right: 18px">KnowledgeTrack</div>
                <md-button style="color: rgb(232, 131, 48)" @click="$router.push('/')">All Trainings</md-button>
            </div>
            <div class="container-row-center">
                <input @keyup.enter="keyword.trim() && $router.push(`/searchsession/${keyword}`)" placeholder="lcp" v-model="keyword" class="input" style="height: 100%" type="text">
                <div @click="keyword.trim() && $router.push(`/searchsession/${keyword}`)" class="button hover-opacity" style="padding: 5px 16px">Search</div>
                <div style="margin-left: 56px">Anfo</div>
            </div>
        </nav>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    data(){
        return {
            keyword: ''
        }
    }
}
</script>

<style lang="less" scoped>
.nav-bar{
    display: flex;
    justify-content: space-between;
    background: rgb(77, 93, 108);
    height: 40px;
    padding: 0 16px;
}
// .profile-image{
//     margin-left: 56px;
//     width: 28px;
//     height: 28px;
//     border-radius: 100%;
//     background: dimgray;
// }
.layout-a{
    max-width: 1000px;
    padding: 16px 0;
    margin: 0 auto;
}
</style>

<style lang="less">
.title{
    padding: 0 16px 16px;
    font-size: 2rem;
    margin: 24px 0 16px;
    border-bottom: 1px solid rgb(61, 87, 104);
}
</style>