import { Model } from '@vuex-orm/core'
import Todo from './Todo'

export default class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      username: this.string(''),
      email: this.string(''),
      address: this.attr({}),
      phone: this.string(''),
      website: this.string(''),
      company: this.attr({}),
      todos: this.hasMany(Todo, 'userId', 'id')
    }
  }
}
