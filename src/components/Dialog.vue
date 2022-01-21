<template>
  <v-dialog class="" v-model="actionDialog.dialog" max-width="290">
    <v-container v-if="actionDialog.type === 'delete'">
      <v-card class="confirmCard">
        <h3>Are you sure?</h3>
        <v-container class="actionBtns">
          <nio-button
            variant="primary"
            size="normal"
            @click="() => actionDialog.handler(actionDialog.record.id)"
            >Delete</nio-button
          >
          <nio-button variant="secondary " size="normal" @click="closeDialog"
            >Cancel</nio-button
          >
        </v-container>
      </v-card>
    </v-container>
    <v-container v-if="['create', 'edit'].includes(actionDialog.type)">
      <Form :actionDialog="actionDialog" />
    </v-container>
  </v-dialog>
</template>

<script>
import { bus } from "../main";
import Form from "./Form.vue";
export default {
  components: { Form },
  props: ["actionDialog"],
  methods: {
    closeDialog() {
      bus.$emit("activateDialog", null);
    },
  },
  beforeDestroy() {
    this.closeDialog();
  },
};
</script>
<style scoped>
.actionBtns {
  display: flex;
  justify-content: space-between;
}
.confirmCard {
  padding: 10px;
}
</style>