<template>
    <el-form :ref="formName" :rules="rules" :model="form" label-width="80px" class="login-form">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pws">
            <el-input placeholder="请输入密码" v-model="form.pws" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePws">
            <el-input placeholder="请再次输入密码" v-model="form.rePws" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
            <el-upload
            ref="avatarUpload"
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload">
            <img v-if="avatar" :src="avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import userService from '../../service/api/user.service'
import { uploadImgToBase64 } from '../../utils/index'

export default {
    name: 'registerForm',
    data() {
        var validateRePws = (rule, value, callback) => {
            if (value !== this.form.pws) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            avatar: '',
            formName: 'loginForm',
            form: {
                name: '',
                pws: '',
                rePws: '',
                fileBlob: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                ],
                pws: [
                   { required: true, message: '请输入密码', trigger: 'blur' }, 
                   { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                rePws: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' }, 
                    { validator: validateRePws, trigger: 'blur' }
                ]
            },
            
        }
    },
    mounted() {
        let to = this.$route.query.redirect;
        if(to) {
            this.redirect = to;
        }
    },
    methods: {
        handleAvatarChange(file, fileList) {
            this.avatar = URL.createObjectURL(file.raw);
            uploadImgToBase64(file.raw).then(res=> {
                this.form.fileBlob = res.result;
            })
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        onSubmit(){
            this.$refs[this.formName].validate((valid) => {
                 if (valid) {
                    let { name, pws, fileBlob } = {...this.form };
                    this.$store.dispatch('user/register', {name, pws, fileBlob}).then(res=> {
                        this.$router.push('/');
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
  .avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>

