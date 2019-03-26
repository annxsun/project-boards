<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
  <el-form :ref="formName" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="任务标题" prop="title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="任务时间" required>
    <el-col :span="11">
      <el-form-item prop="dateStart">
        <el-date-picker type="date" placeholder="选择开始日期" v-model="form.dateStart" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="dateEnd">
        <el-date-picker type="date" placeholder="选择结束日期" v-model="form.dateEnd" style="width: 100%;"></el-date-picker>
      </el-form-item>
   </el-col>
  </el-form-item>
  <el-form-item label="任务标签" prop="type">
    <el-select v-model="form.type" placeholder="请选择任务标签">
      <el-option label="bug" value="bug"></el-option>
      <el-option label="duplicate" value="duplicate"></el-option>
      <el-option label="enhancement" value="enhancement"></el-option>
      <el-option label="good first issue" value="good first issue"></el-option>
      <el-option label="help wanted" value="help wanted"></el-option>
      <el-option label="invalid" value="invalid"></el-option>
      <el-option label="question" value="question"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="任务分配" prop="assign">
    <el-select multiple  v-model="form.assign" placeholder="请选择分配人员">
      <el-option label="xsun28" value="xsun28"></el-option>
      <el-option label="xwei4" value="xwei4"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="任务描述">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="sure">确 定</el-button>
  </span>
</el-dialog>  
</template>


<script>
  export default {
    props: {
        title: {
            type: String,
            default: '添加任务',
        },
        dialogVisible: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            default: '',
        },
        task: {
          type: Object,
        }
    },
    data() {
        return {
            formName: 'taskItemAddForm',
            form: {
                id: '',
                title: '',
                dateStart: '',
                dateEnd: '',
                type: '',
                assign: [],
                desc: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                dateStart: [
                    { type: 'date', required: true, message: '请选择起始日期', trigger: 'change' }
                ],
                dateEnd: [
                    { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择任务标签', trigger: 'change' }
                ],
                assign: [
                    { type: 'array', required: true, message: '请至少选择一个任务分配人', trigger: 'change' }
                ],
            }
        }
    },
    watch: {
      task: {
          immediate: true, 
          handler (val) {
            this.form = {
                id: '',
                title: '',
                dateStart: '',
                dateEnd: '',
                type: '',
                assign: [],
                desc: ''
            }
            if(this.id !== '') {
                this.form = {...val};
            }
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
           this.$emit('close');
           this.resetForm();
          })
          .catch(_ => {});
      },
      cancel() {
          this.$emit('close');
          this.resetForm();
      },
      sure() {
          this.$refs[this.formName].validate((valid) => {
            if (valid) {
              // TODO
              this.$emit('close');
              this.resetForm();
            }
          });
          
      }
    }
  };
</script>

<style lang="scss" scoped>
.line {
    text-align: center;
}    
</style>
