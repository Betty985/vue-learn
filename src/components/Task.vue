<template>
  <div :class="[task.reminder?'reminder':'','task']" @dblclick="$emit('toggle-reminder',task.id)">
    <h3>
      {{ task.text}}
      <i @click="onDelete(task.id)" class="fas fa-times">x</i>
    </h3>
    <p>{{task.day}}</p>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object
  },
  methods: {
    onDelete (id) {
      this.$emit('delete-task', id)
    }
  }
}
</script>

<style scope>
.fas {
  color: red;
  font-style: normal;
  /* font-family: "Font Awesome 5 Free";
  font-weight: 900;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-variant: normal;
  text-rendering: auto; */
  line-height:1
}
/* .fa-times:before {
    content: "\f00d"
} */
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left:5px solid green;
}
.task h3{
  display: flex;
  align-items: center;
  justify-content:space-between;
}
</style>
