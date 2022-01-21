<template>
  <v-container>
    <td v-for="action in actions" :key="action.name">
      <v-icon :color="action.color" class="pointer" @click="() => actionHandler(action)">{{action.icon}}</v-icon>
    </td>
  </v-container>
</template>

<script>
import {bus} from '../../main'
export default {
  props: ["item", 'actions', 'id'],
  methods: {
    actionHandler(action) {
      bus.$emit('activateDialog', {...action, dialog: true, record: this.item})
}
  }
}
</script>

<style lang="scss" scoped>
  .pointer {
      cursor: pointer;
  }
</style>>
