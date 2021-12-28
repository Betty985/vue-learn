<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask" title="Task Tracker"></Header>
    <div v-show="showAddTask">
    <AddTask @add-task="addTask" :showAddTask="showAddTask"/>
    </div>
    <Tasks :tasks="tasks" @delete-task="deleteTask" @toggle-reminder="toggleReminder"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask
  },
  data () {
    return {
      tasks: [],
      showAddTask: false
    }
  },
  methods: {
    toggleAddTask () {
      this.showAddTask = !this.showAddTask
    },
    addTask (task) {
      this.tasks = [...this.tasks, task]
    },
    deleteTask (id) {
      if (confirm('are you sure?')) {
        this.tasks = this.tasks.filter((task) => task.id !== id)
      }
    },
    toggleReminder (id) {
      this.tasks = this.tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task)
    }
  },
  created () {
    this.tasks = [
      {
        id: 1,
        text: '5000字论文',
        day: '2021.1.7',
        reminder: true
      },
      {
        id: 2,
        text: '搜索引擎',
        day: '2021.1.4',
        reminder: true
      },
      {
        id: 3,
        text: '案例分析',
        day: '2021.1.1',
        reminder: true
      },
      {
        id: 4,
        text: 'xml实验设计',
        day: '2021.1.6',
        reminder: false
      },
      {
        id: 5,
        text: 'web站点',
        day: '2021.1.9',
        reminder: false
      }
    ]
  }
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Ponppins:wght@300;400&display=swap'); */

/* 全局样式 */
*{
  box-sizing: border-box;
  margin:0;
  padding:0;
}
body {
  font-family: 'Poppins',sans-serif;
}
.container{
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border:1px solid steelblue;
  padding:30px;
  border-radius: 5px;
}

.btn{
  display: inline-block;
  background: #000;
  color:#fff;
  border:none;
  padding:10px 20px;
  margin:5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus{
  outline: none;
}

.btn:active{
  transform: scale(0.98);
}
.btn-block{
  display: block;
  width:100%;
}
</style>
