<template>
  <div class="TodosList">
    <div class="loading" v-if="loading">💩</div>
    <div class="todo" :class="{ done: todo.completed }" :key="todo.id" v-for="todo in data">
      <button class="icon" @click="toggle(todo)">
        <CheckCircle class="svg check" />
      </button>
      <input
        disabled
        class="input"
        :value="todo.title"
        placeholder="Type in the title of the task!"
        @input="e => { update(todo.id, e.target.value) }">
      <Assignee :todo-id="todo.id" />
      <button class="icon" @click="destroy(todo.id)">
        <Trash class="svg" />
      </button>
    </div>
  </div>
</template>

<script>
import Todo from '@/models/Todo'
import CheckCircle from './icons/CheckCircle'
import Trash from './icons/Trash'
import Assignee from './TodosAssignee'

export default {
  components: {
    CheckCircle,
    Trash,
    Assignee
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    errors: {
      type: Array,
      required: true
    }
  },

  methods: {
    toggle (todo) {
      Todo.update({ id: todo.id, completed: !todo.completed })
    },

    update (id, title) {
     Todo.update({ id, title })
    },

    destroy (id) {
      Todo.delete(id)
    }
  }
}
</script>

<style scoped>
@import "styles/variables";

.todo {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--c-divider);
}

.todo:hover {
  background-color: #fafafa;
}

.todo:hover .svg {
  opacity: 1;
}

.todo.done {
  .input {
    text-decoration: line-through;
    color: var(--c-gray);
  }

  .icon .svg.check {
    fill: #38d2d8;
  }
}

.input {
  flex-grow: 1;
  border: 0;
  padding: 12px 24px 12px 0;
  width: 100%;
  background-color: transparent;
  transition: all .3s;
}

.icon {
  display: block;
  padding: 12px 24px;
}

.icon:hover .svg {
  fill: var(--c-black);
}

.icon:hover .svg.check {
  fill: var(--c-black);
}

.svg {
  width: 14px;
  height: 14px;
  opacity: 0;
  transform: translateY(2px);
  transition: all .3s;
  fill: var(--c-gray);
}

.svg.check {
  opacity: 1;
  fill: var(--c-gray-light);
}

.loading {
  font-size: 30px;
  text-align: center;
  margin: 20px;
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}

@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
