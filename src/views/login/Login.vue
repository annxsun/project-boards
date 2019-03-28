<template>
    <el-form :ref="formName" :rules="rules" :model="form" label-width="80px" class="login-form">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pws">
            <el-input placeholder="请输入密码" v-model="form.pws" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import userService from '../../service/api/user.service'

export default {
    name: 'login',
    data() {
        return {
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
    methods: {
        onSubmit(){
            this.$refs[this.formName].validate((valid) => {
                if (valid) {
                    userService.login(this.form).then(res=> {
                        sessionStorage.setItem('token', res.data);
                        this.$router.push('/task');
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.login-form {
    width: 400px;
    margin: auto;
    margin-top: 150px;
}
</style>

