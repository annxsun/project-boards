<template>
  <el-dialog
  title="移动所有列表"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form :ref="formName" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="移动至" prop="name">
      <el-select v-model="form.name" placeholder="请选择任务列表" >
        <el-option v-for="taskListName in taskListNameArray" :key="taskListName.id" :label="taskListName.name" :value="taskListName.id"></el-option>
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
import taskService from '../../service/api/task.service'

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
          if(this.$refs[this.formName]){
            this.$refs[this.formName].resetFields();
          }
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
              taskService.taskListMvALL({fromId: this.taskListId, toId: this.form.name}).then(res =>{
                this.$emit('close', {refresh: true});
                this.resetForm();
                this.form.name = '';
              });
            }
        });
      }
  }
};
</script>