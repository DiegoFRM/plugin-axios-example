<template>
  <div class="App">
    <AppHeader />
    <Description />
    <div class="container">
      <div class="users">
        <Users
          :data="users"
          :loading="usersLoading"
          :errors="usersErrors" />
      </div>
      <div class="todos">
        <Todos
          :data="todos"
          :loading="todosLoading"
          :errors="todosErrors" />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import User from '@/models/User'
import Todo from '@/models/Todo'
import AppHeader from '@/components/AppHeader'
import Description from '@/components/Description'
import Users from '@/components/Users'
import Todos from '@/components/Todos'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    AppHeader,
    Description,
    Users,
    Todos,
    AppFooter
  },
  computed: {
    ...mapGetters({
      usersLoading: 'entities/users/loading',
      todosLoading: 'entities/todos/loading',
      usersErrors: 'entities/users/errors',
      todosErrors: 'entities/todos/errors',
    }),
    users() {
      return User.query()
      .withAll()
      .withAllRecursive()
      .all()
    },
    todos() {
      return Todo.query()
      .withAll()
      .withAllRecursive()
      .all()
    }
  },
  mounted () {
    User.$fetch()
    Todo.$fetch()
  },
}
</script>

<style scoped>
.App {
  padding: 96px 48px 128px;
}

.container {
  display: flex;
  margin: 0 auto;
  width: 960px;
}

.users {
  padding-right: 48px;
  width: calc(100% / 3);
}

.todos {
  width: calc((100% / 3) * 2);
}
</style>
