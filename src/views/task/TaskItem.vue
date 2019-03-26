<template>
    <div class="task-item" 
    v-drap="{className:'drap-element', data: {task:task, taskListId: taskListId}, drapTag: 'task-item'}"
    :class="{'bug': task.type === 'bug', 
                          'duplicate': task.type === 'duplicate', 
                          'enhancement': task.type === 'enhancement',
                          'good-first-issue': task.type === 'good first issue', 
                          'help-wanted': task.type === 'help wanted',
                          'invalid': task.type === 'invalid', 
                          'question': task.type === 'question'}">
        <div class="level-wrapper" 
        :class="{'bug': task.type === 'bug', 
                 'duplicate': task.type === 'duplicate', 
                 'enhancement': task.type === 'enhancement',
                 'good-first-issue': task.type === 'good first issue', 
                 'help-wanted': task.type === 'help wanted',
                 'invalid': task.type === 'invalid', 
                 'question': task.type === 'question'}">
            <i class="el-icon-warning"></i>
        </div>
        <div class="content-wrapper">
            <div class="content">
                <a class="title">{{task.title}}</a>
                <el-dropdown>
                    <i class="event-element el-icon-more"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  @click.native="editTaskItem"><i class="el-icon-edit"></i>编辑</el-dropdown-item>
                        <el-dropdown-item  @click.native="deleteTaskItem"><i class="el-icon-delete"></i>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="issue-info" v-if="task.taskIndex !=='' && task.assign && task.assign.length !== '0'">
                {{task.taskIndex}} opened by {{task.creater}}
            </div>
            <div class="issue-assign">
                <span class="type"
                 v-if="task.type !==''"
                 :class="{'bug': task.type === 'bug', 
                          'duplicate': task.type === 'duplicate', 
                          'enhancement': task.type === 'enhancement',
                          'good-first-issue': task.type === 'good first issue', 
                          'help-wanted': task.type === 'help wanted',
                          'invalid': task.type === 'invalid', 
                          'question': task.type === 'question'}">{{task.type}}</span>
                <div class="avatar">
                    <img src="../../assets/unassigned.svg" />
                    <img src="../../assets/unassigned.svg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskItem',
    props: {
        taskListId: {
            type: String,
            default: ''
        },
        task: {
           type: Object,
           default: function() {
               return {
                   title: '' ,
                   taskIndex: '',
                   type: '',
                   assign: [],
               }
           }
        },
    },
    methods: {
        editTaskItem() {
            this.$emit('editTaskItem');
        },
        deleteTaskItem() {
           this.$emit('deleteTaskItem'); 
        }
    }
}
</script>

<style lang="scss">
.task-item {
    display: flex;
    justify-content: space-between;
    border-left: 5px solid green;
    border-bottom: 1px solid #ccc;
    padding: 8px 10px;
    &.bug {
        border-left: 5px solid red;
    }
    &.duplicate {
        border-left: 5px solid blue;
    }
    &.enhancement {
        border-left: 5px solid green;
    }
    &.good-first-issue {
       border-left: 5px solid salmon;
    }
    &.help-wanted {
        border-left: 5px solid skyblue;
    }
    &.invalid {
        border-left: 5px solid goldenrod;
    }
    &.question {
        border-left: 5px solid hotpink;
    }
    .level-wrapper {
        margin-right: 10px;
        &.bug {
            color: red;
        }
        &.duplicate {
            color: blue;
        }
        &.enhancement {
            color: green;
        }
        &.good-first-issue {
            color: salmon;
        }
        &.help-wanted {
            color: skyblue
        }
        &.invalid {
            color: goldenrod;
        }
        &.question {
            color: hotpink;
        }
    }
    .content-wrapper {
        flex: 1;
        .content {
            display: flex;
            justify-content: space-between;
            .desc {
                font-size: 14px;
                /* color: #0366d6; */
                /* font-weight: 600; */
                text-decoration: none;
                margin-right: 10px;
                &:hover {
                    cursor: pointer;
                    text-decoration: underline;  
                }
            }
        }
        .issue-info {
            font-size: 12px;
            color: #586069;
            margin: 5px 0px 8px 0px;
        }
        .issue-assign {
            display: flex;
            justify-content: space-between;
            .type {
                display: block;
                font-size: 10px;
                height: 20px;
                line-height: 18px;
                padding: 0px 5px;
                &.bug {
                    background-color: red;
                }
                &.duplicate {
                    background-color: blue;
                }
                &.enhancement {
                    background-color: green;
                }
                &.good-first-issue {
                    background-color: salmon;
                }
                &.help-wanted {
                    background-color: skyblue
                }
                &.invalid {
                    background-color: goldenrod;
                }
                &.question {
                    background-color: hotpink;
                }
            }
            .avatar {
                height: 20px;
                img {
                    height: inherit;
                }
            }
        }
    }
}
</style>