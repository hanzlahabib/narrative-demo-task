<template>
  <v-data-table
    :headers="headers"
    :items="records"
    :items-per-page="5"
    class="elevation-2"
  >
    <template v-slot:item.Actions="{ item }">
      <render-actions
        :item="item"
        :actions="Actions"
        :id="item.id"
        class="actions"
      />
    </template>
  </v-data-table>
</template>

<script>
import { bus } from "../../main";
import RenderActions from "./RenderActions.vue";
export default {
  components: { RenderActions },
  props: ["records"],
  data() {
    return {
      Actions: [
        {
          type: "delete",
          handler: this.deleteRecord,
          icon: "mdi-delete",
          color: "red",
        },
        { type: "edit", handler: this.editRecord, icon: "mdi-pencil" },
      ],
      headers: [
        { text: "Name", value: "Name" },
        { text: "Max Bid Price", value: "MaxBidPrice" },
        { text: "Data Package Type", value: "DataPackageType" },
        { text: "Actions", value: "Actions", sortable: false },
      ],
    };
  },
  methods: {
    deleteRecord(id) {
      let remainingRecords = this.records.filter((each) => each.id !== id);
      this.$emit("storeRecords", remainingRecords);
      bus.$emit("activateDialog", null);
    },
    editRecord(record) {
      let records = this.records.map((each) => {
        if (each.id == record.id) {
          each = { ...record };
        }
        return each
      });
      this.$emit("storeRecords", records);
      bus.$emit("activateDialog", null);
    },
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  gap: 10px;
}
</style>