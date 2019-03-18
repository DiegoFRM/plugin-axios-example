<template>
  <div class="UsersList">
    <div class="loading" v-if="loading">💩</div>
    <div class="user" :key="user.id" v-for="user in data">
      <input
        disabled
        class="input"
        :value="user.name"
        placeholder="Type in user's name!"
        @input="e => { update(user.id, e.target.value) }">
      <p class="tasks">{{ user.todos.length }} Tasks</p>
      <button class="icon" @click="destroy(user.id)">
        <Trash class="trash" />
      </button>
    </div>
  </div>
</template>

<script>
import User from '@/models/User'
import Trash from './icons/Trash'

export default {
  components: {
    Trash
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
    destroy (id) {
      User.$delete({
        params: { id }
      })
    }
  }
}
</script>

<style scoped>
@import "styles/variables";
.user {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--c-divider);
}

.user:hover {
  background-color: #fafafa;
}

.user:hover .trash {
  opacity: 1;
}

.input {
  flex-grow: 1;
  border: 0;
  padding: 12px 24px;
  width: 100%;
  background-color: transparent;
  transition: all .3s;
}

.tasks {
  font-size: 12px;
  white-space: nowrap;
  color: var(--c-gray);
}

.icon {
  display: block;
  padding: 12px 24px;
}

.icon:hover .trash {
  fill: var(--c-black);
}

.trash {
  width: 14px;
  height: 14px;
  opacity: 0;
  transform: translateY(2px);
  transition: all .3s;
  fill: var(--c-gray);
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
