<template>
    <div>
        <a class="register" @click="goRegister">注册</a>
        <el-form :ref="formName" :rules="rules" :model="form" label-width="80px" class="login-form">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pws">
                <el-input placeholder="请输入密码" v-model="form.pws" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import userService from '../../service/api/user.service'

export default {
    name: 'login',
    data() {
        return {
            redirect: '/task',
            formName: 'loginForm',
            form: {
                name: 'admin',
                pws: '123456',
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                ],
                pws: [
                   { required: true, message: '请输入密码', trigger: 'blur' }, 
                   { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        let to = this.$route.query.redirect;
        if(to) {
            this.redirect = to;
        }
    },
    methods: {
        goRegister() {
            this.$router.push('/register');
        },
        onSubmit(){
            this.$refs[this.formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('user/login', this.form).then(res=> {
                        this.$router.push(this.redirect);
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
    position: fixed;
    top: 5px;
    right: 20px;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
}
.login-form {
    width: 400px;
    margin: auto;
    margin-top: 150px;
}
</style>

