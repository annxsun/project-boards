<template>
  <el-dialog
  :title="title"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form :ref="formName" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="列表名称" prop="name">
        <el-input v-model="form.name"></el-input>
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
      title: {
          type: String,
          default: '添加一列',
      },
      dialogVisible: {
          type: Boolean,
          default: false,
      },
      taskListName: {
          type: String,
          default: '',
      },
      taskListId: {
        type: String,
        default: '',
      },
  },
  data() {
    return {
      formName: 'taskListAddForm',
      form: {
        name: '',
      },
      rules: {
        name: [
            { required: true, message: '请输入新的任务列表名称', trigger: 'change' },
        ]
      }
    }
  },
  watch: {
    taskListName: {
        immediate: true, 
        handler (val) {
            this.form.name = val;
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
        this.resetForm();
        this.$emit('close');
    },
    sure() {
      this.$refs[this.formName].validate((valid) => {
          if(!valid) return;
          if(this.taskListId) {
              taskService.taskListUpdateName({id: this.taskListId, name: this.form.name}).then(res =>{
                  this.$emit('close', {refresh: true});
                  this.resetForm();
              });
          }
          if(!this.taskListId) {
              taskService.taskListAdd(this.form).then(res=> {
                  this.$emit('close', {refresh: true});
                  this.resetForm();
            });
          }
          
      });
    }
  }
};
</script>