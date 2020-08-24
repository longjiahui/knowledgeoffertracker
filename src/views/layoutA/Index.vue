<template>
    <div>
        <div class="title">
            Knowledge Offer Track
        </div>
        <div class="session-type-group">
                <div
                    @click="$router.push(`sessionList/${t.toLowerCase()}`)"
                    v-for="(t, i) in ['Technology', 'UserStory', 'Business', 'Others']"
                    :key="i"
                    class="session-type hover-opacity">
                    <md-ripple>
                        <div class="session-type-content container-column-center">
                            <div>
                                <i :class="['iconfont', `icon-${['A', 'B', 'C', 'D'][i]}`]"></i>
                            </div>
                            <div>
                                {{t}}
                            </div>
                        </div>
                    </md-ripple>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.session-type-group{
    display: flex;
    flex-wrap: wrap;
    .session-type{
        width: 440px;
        margin-right: 3%;
        margin-bottom: 3%;
        position: relative;
        .session-type-content{
            position: absolute;
            width: 100%;
            height: 100%;
            background:rgb(77, 93, 108);
            font-size: 2rem;
            &>div:first-child{
                margin-bottom: 16px;
                &>i{
                    font-size: 2rem;
                }
            }
        }
        &::after{
            content: '';
            display: block;
            padding-top: 70%;
        }
    }
}
</style>