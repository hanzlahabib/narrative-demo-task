<template>
  <v-app-bar app color="primary">
    <v-toolbar-title class="logo">
      {{ appTitle }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="buttonContainer">
      <v-btn
        text
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path"
        @click="item.handler"
      >
        <v-icon left dark small>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template><script>
import { bus } from "../main";

export default {
  name: "Header",
  components: {},
  data() {
    return {
      appTitle: "Narrative Buy Data",
      menuItems: [
        { title: "Create", icon: "mdi-plus", handler: this.handleCreateDialog },
      ],
    };
  },
  methods: {
    handleCreateDialog() {
      bus.$emit("activateDialog", { dialog: true, type: 'create' });
    },
  },
};
</script>
<style lang="scss" scoped>
.logo {
  color: #fff;
}
</style>>