<template>
  <v-card class="formContainer">
    <h4>{{actionDialog.type === 'create' ? 'Create new record': 'Update record'}}</h4>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <validation-provider v-slot="{ errors }" name="Name" rules="required">
          <v-text-field
            v-model="Name"
            :error-messages="errors"
            label="Name"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="MaxBidPrice">
          <v-text-field
            v-model="MaxBidPrice"
            :error-messages="errors"
            label="Max Bid Price"
            type="number"
          ></v-text-field>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="DataPackageType"
          rules="required"
        >
          <v-select
            v-model="DataPackageType"
            :items="items"
            :error-messages="errors"
            label="Data Package Type"
            data-vv-name="DataPackageType"
            required
          ></v-select>
        </validation-provider>
        <v-container class="actions">
          <v-btn class="mr-4" type="submit" :disabled="invalid">
            {{ actionDialog.type === "create" ? "Submit" : "Update" }}
          </v-btn>
          <v-btn @click="clear" v-if="actionDialog.type === 'create'">
            Clear
          </v-btn>
        </v-container>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import { bus } from "../main";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { getLocalStorageItem } from "../utils/helpers";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: ["actionDialog"], // intentionally not validating anything in props in all components
  data: () => ({
    Name: "",
    MaxBidPrice: "",
    DataPackageType: null,
    items: ["Device Location", "Device Behavior", "ID Mapping"],
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
      let record = {
        Name: this.Name,
        MaxBidPrice: this.MaxBidPrice,
        DataPackageType: this.DataPackageType,
      };

      if (this.actionDialog.type === "edit") {
        // merging prev record with new changes
        this.actionDialog.handler({ ...this.actionDialog.record, ...record });
      } else {
        bus.$emit("submit", record);
      }
      // closing dialog
      bus.$emit("activateDialog", null);
    },
    clear() {
      this.Name = "";
      this.MaxBidPrice = "";
      this.DataPackageType = null;
      this.$refs.observer.reset();
    },
    setUpdateValues() {
      if (this.actionDialog.record && this.actionDialog.type === "edit") {
        let records = JSON.parse(getLocalStorageItem("records")) || [];
        let currentRecord = records.filter(
          (record) => record.id === this.actionDialog.record.id
        );
        if (currentRecord.length) {
          currentRecord = currentRecord[0];
          this.Name = currentRecord.Name;
          this.MaxBidPrice = currentRecord.MaxBidPrice;
          this.DataPackageType = currentRecord.DataPackageType;
        }
      } else {
        this.clear();
      }
    },
  },
  created() {
    this.setUpdateValues();
  },
  beforeDestroy() {
    this.clear();
    bus.$emit("activateDialog", null);
  },
  watch: {
    actionDialog() {
      this.setUpdateValues();
    },
  },
};
</script>

<style scoped>
.formContainer {
  padding: 24px 12px;
}
.actions {
  display: flex;
  justify-content: space-between;
}
</style>