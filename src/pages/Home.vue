<template>
  <v-app>
    <Header />
    <v-container class="container">
      <Table :records="currentRecords" @storeRecords="storeRecords" />
      <!-- Handle different types of dialogs -->
      <Dialog :actionDialog="actionDialog" />
    </v-container>
  </v-app>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { bus } from "../main";
import { getLocalStorageItem, addLocalStorageItem } from "../utils/helpers";
import Dialog from "../components/Dialog.vue";
import Table from "../components/Tables/Table.vue";
import Header from "../components/Header.vue";

export default {
  name: "Home",
  components: {
    Table,
    Dialog,
    Header,
  },
  data() {
    return {
      appTitle: "Narrative Buy Data",
      dialog: false,
      selectedRecord: null,
      currentRecords: JSON.parse(getLocalStorageItem("records")) || [],
      menuItems: [
        { title: "Create", icon: "mdi-plus", handler: this.handleCreateDialog },
      ],
      actionDialog: {dialog: false, type: null, handler: () => {}},
    };
  },
  methods: {
    submit(value) {
      let newRecord = { ...value, id: uuidv4() };
      let allRecords = [...this.currentRecords, { ...newRecord }];
      addLocalStorageItem("records", JSON.stringify(allRecords));
      this.currentRecords = allRecords;
    },

    handleCreateDialog() {
      this.actionDialog = {
        ...this.actionDialog,
        dialog: true,
        type: "create",
      };
    },

    storeRecords(records) {
      addLocalStorageItem("records", JSON.stringify(records));
      console.log(records);
      this.currentRecords = records;
    },
  },

  created() {
    bus.$on("activateDialog", (actionData) => {
      this.actionDialog = actionData
        ? actionData
        : { ...this.actionDialog, dialog: false, record: {} };
    });

    bus.$on("submit", this.submit);
  },
  beforeDestroy() {
    // tearing down event listerns
    bus.$off(["activateDialog", "submit"]);
  },
};
</script>
<style lang="scss" scoped>
.buttonContainer {
  gap: 10px;
  margin: 10px;
  padding: 10px;
}
.container {
  margin-top: 100px;
}
.logo {
  color: #fff;
}
</style>>
