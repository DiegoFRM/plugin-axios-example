<template>
  <div class="TodosAssignee">
    <IconUser class="user" />
    <select class="select" :class="{ selected: !!todo.assignee }" @change="update">
      <option class="option" value="">Choose assignee</option>
      <option
        class="option"
        :value="user.id"
        :selected="todo.userId == user.id"
        :key="user.id"
        v-for="user in users">
        {{ user.name }}
      </option>
    </select>
    <ChevronDown class="down" />
  </div>
</template>

<script>
import User from '@/models/User'
import Todo from '@/models/Todo'
import IconUser from '@/components/icons/User'
import ChevronDown from '@/components/icons/ChevronDown'

export default {
  components: {
    IconUser,
    ChevronDown
  },

  props: {
    todoId: { type: Number, required: true }
  },

  computed: {
    users () {
      return User.query()
        .withAll()
        .orderBy('name')
        .get()
    },

    todo () {
      return Todo.query()
        .withAll()
        .find(this.todoId)
    }
  },

  methods: {
    update (e) {
      Todo.update({
        id: this.todoId,
        userId: e.target.value
      })
    }
  }
}
</script>

<style scoped>
@import "styles/variables";

.TodosAssignee {
  position: relative;
  display: flex;
  align-items: center;
}

.user {
  width: 14px;
  height: 14px;
  fill: var(--c-gray);
}

.select {
  position: relative;
  z-index: 1;
  border: 0;
  padding-right: 16px;
  padding-left: 12px;
  color: var(--c-gray);
  background-color: transparent;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
}

.select.selected {
  color: var(--c-black);
}

.option {
  color: var(--c-gray-dark);
}

.down {
  position: absolute;
  top: 10px;
  right: 0;
  width: 8px;
  height: 8px;
  fill: var(--c-gray);
}
</style>
