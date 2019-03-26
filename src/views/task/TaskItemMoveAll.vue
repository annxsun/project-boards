<template>
  <el-dialog
  title="移动所有列表"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form :ref="formName" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="移动至" prop="name">
      <el-select v-model="form.name" placeholder="请选择任务列表" >
        <el-option v-for="taskListName in taskListNameArray" :key="taskListName" :label="taskListName" :value="taskListName"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="sure">确 定</el-button>
  </span>
</el-dialog>  
</template>


<script>
  export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
        taskListId: {
            type: String,
            default: ''
        },
        taskListNameArray: {
            type: Array,
        }
    },
    data() {
      return {
        formName:'mvALLform',
        form: {
            name: ''
        },
        rules: {
            name: [
                { required: true, message: '请输入其选择将要移动的任务列表', trigger: 'change' },
            ]
        }
      }
    },
    methods: {
        resetForm() {
            this.$refs[this.formName].resetFields();
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                this.resetForm();
                this.$emit('close');
            })
            .catch(_ => {});
        },
        close() {
            this.$emit('close');
            this.form.name = '';
            this.resetForm();
        },
        sure() {
          this.$refs[this.formName].validate((valid) => {
              if (valid) {
                // TODO
                this.$emit('close');
                this.resetForm();
                this.form.name = '';
              }
          });
        }
    }
  };
</script>