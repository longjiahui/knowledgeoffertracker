<template>
    <div class="session-list">
        <div class="title">{{typeDesc || ('search for ' + keyword)}}</div>
        <div class="container-row row-between auto-padding" style="margin-bottom: 16px">
            <div class="container-row-center" style="font-size: 1.3rem">
                <div style="margin-right: 24px">Sessions</div>
                <md-button style="color: rgb(232, 131, 48)" @click="state = 1, formData={}">AddSession</md-button>
            </div>
            <div class="container-row-center">
                <el-checkbox-group style="margin-right: 8px" v-model="levels" size="mini">
                    <el-checkbox-button key="all" label="All" ></el-checkbox-button>
                    <el-checkbox-button key="entry" label="Entry"></el-checkbox-button>
                    <el-checkbox-button key="intermediate" label="Intermediate"></el-checkbox-button>
                    <el-checkbox-button key="advanced" label="Advanced"></el-checkbox-button>
                </el-checkbox-group>
                <el-checkbox-group v-model="actions" size="mini">
                    <el-checkbox-button key="give" label="Give" ></el-checkbox-button>
                    <el-checkbox-button key="receive" label="Receive"></el-checkbox-button>
                </el-checkbox-group>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div key="0" class="session-group" v-if="state === 0">
                <div
                    v-for="(s, i) in sessions"
                    :key="i"
                    class="session hover-opacity">
                    <div class="name">{{s.name}}</div>
                    <div class="item">Action: {{s.action}}</div>
                    <div class="item">Learning Type: {{s.learningType}}</div>
                    <div class="item">Date: {{s.date}}</div>
                    <div class="item">Duration: {{s.duration}}</div>
                    <div class="item">Level: {{s.level}}</div>
                    <div class="item">Skill Source: {{s.skillSource}}</div>
                    <div class="item">Attendee: {{s.attendee}}</div>
                    <div class="op-button-group">
                        <md-button class="md-raised md-primary" @click="state = 1,formData = {...s, _id: '1'}">Edit</md-button>
                        <md-button class="md-raised md-primary" @click="handleDelete(s)">Delete</md-button>
                    </div>
                </div>
            </div>
            <div :key="formData._id?'1':'2'" class="auto-padding" style="font-size: 1.5rem;max-width: 500px" v-else-if="state === 1">
                <div style="margin: 24px 0">{{formData._id?'Edit':'Create'}} Session</div>
                <el-form>
                    <el-form-item label="Session Name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Action">
                        <div class="input-wrapper">
                            <el-select v-model="formData.action"></el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="Learning Type">
                        <div class="input-wrapper">
                            <el-select v-model="formData.learningType"></el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="Skill Source(if applicable)">
                        <el-input v-model="formData.skillSource"></el-input>
                    </el-form-item>
                    <el-form-item label="Date">
                        <div class="input-wrapper">
                            <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="Duration">
                        <el-input v-model="formData.duration"></el-input>
                    </el-form-item>
                    <el-form-item label="Attendee(if applicable)">
                        <el-input v-model="formData.attendee"></el-input>
                    </el-form-item>
                    <el-form-item label="Level">
                        <div class="input-wrapper">
                            <el-select v-model="formData.level"></el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="Comments">
                        <el-input type="textarea" resize="none" :rows="5" v-model="formData.Comments"></el-input>
                    </el-form-item>
                </el-form>
                <div class="button-group">
                    <md-button style="margin: 0;border-radius: 0;background: rgb(232, 131, 48);color: white" class="button">Save</md-button>
                    <md-button class="button" style="margin: 0;border-radius: 0;background: #4d5d6c;color: white" @click="state = 0">Cancel</md-button>
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang="less">
.session-list{
    .el-checkbox-button__inner{
        color: white;
        background: #4d5d6c;
        border: none;
    }
    .el-checkbox-button:first-child .el-checkbox-button__inner{
        border-left: none;
    }
    .el-checkbox-button.is-checked .el-checkbox-button__inner{
        box-shadow: none;
    }
    .el-form-item{
        margin-bottom: 8px;
    }
    .el-form-item__label{
        color: white;
        line-height: 32px;
    }
    .el-input__inner, .el-textarea__inner{
        border-radius: 0;
    }
    .el-select{
        width: 100%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
}
</style>
<style lang="less" scoped>
.title{
    font-size: 2rem;
}
.input-wrapper{
    clear: both;
}
.session{
    padding: 36px 24px;
    background: rgb(77, 93, 108);
    margin-bottom: 16px;
    position: relative;
    &:last-child{
        margin-bottom: 0;
    }
    .name{
        font-size: 1.2rem;
        margin-bottom: 8px;
    }
    .item{
        padding: 1px 0;
    }
    &:hover .op-button-group{
        opacity: 1;
        transform: none;
    }
    .op-button-group{
        position: absolute;
        top: 0;
        right: 0;
        padding: 36px 24px;
        display: flex;
        opacity: 0;
        transform: translateY(5px);
        transition: opacity .3s, transform .3s;
    }
    .button{
        font-size: 1.4rem;
        padding: 8px 16px;
        background: rgb(91, 155, 213);
        margin-right: 16px;
        &:last-child{
            margin-right: 0;
        }
        &.button-delete{
            background: rgba(232, 131, 48, 0.8);
        }
    }
}
.button-group{
    margin-top: 24px;
}
</style>

<script>
export default {
    props: {
        type: String,
        keyword: String
    },
    computed: {
        typeDesc(){
            return this.type?.[0].toUpperCase() + this.type?.slice(1)
        }
    },
    data(){
        return {
            sessions: [],
            /**
             * 0- list
             * 1- add
             */
            state: 0,

            formData: {

            },
            levels: [],
            actions: [],
        }
    },
    mounted(){
        this.refreshData()
    },
    methods: {
        handleDelete(s){
             this.$confirm(`Please confirm your delete operation`, 'Tips', {
                confirmButtonText: 'confirm',
                cancelButtonText: 'cancel',
                type: 'warning'
            })
        },
        refreshData(){
            this.sessions = [{
                name: 'Angular CLI',
                action: 'receive',
                learningType: 'E-learn',
                date: new Date(),
                duration: 4,
                level: 'entry',
                skillSource: 'Pluralsight',
                attendee: 'Yifan Cao',
            }, {
                name: 'Angular CLI',
                action: 'receive',
                learningType: 'E-learn',
                date: new Date(),
                duration: 4,
                level: 'entry',
                skillSource: 'Pluralsight',
                attendee: 'Yifan Cao',
            }, {
                name: 'Angular CLI',
                action: 'receive',
                learningType: 'E-learn',
                date: new Date(),
                duration: 4,
                level: 'entry',
                skillSource: 'Pluralsight',
                attendee: 'Yifan Cao',
            }]
        }
    }
}
</script>