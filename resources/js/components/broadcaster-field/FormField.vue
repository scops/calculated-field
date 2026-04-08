<template>
  <DefaultField :field="field" :errors="errors">
    <template #field>
      <input
        :id="field.name"
        :type="field.type"
        class="w-full form-control form-input form-input-bordered"
        :class="errorClasses"
        :placeholder="field.name"
        :value="formattedValue"
        @input="setFieldAndMessage"
      />
    </template>
  </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from "laravel-nova";
import numeral from "numeral";

export default {
  mixins: [FormField, HandlesValidationErrors],
  props: ["resourceName", "resourceId", "field"],
  methods: {
    setFieldAndMessage(el) {
      const rawValue = el.target.value;
      let parsedValue = rawValue;
      if (this.field.type === "number") {
        parsedValue = Number(rawValue);
      }
      Nova.$emit(this.field.broadcastTo, {
        field_name: this.field.attribute,
        value: parsedValue
      });
      this.value = parsedValue;
    },
    setInitialValue() {
      this.value = this.field.value ?? "";
    },
    fill(formData) {
      formData.append(this.field.attribute, this.value || "");
    },
    handleChange(value) {
      this.value = value;
    },
    moneyFormat(number, format) {
      if (!format) return number;
      return numeral(number).format(format);
    }
  },
  computed: {
    formattedValue() {
      return this.moneyFormat(this.value, this.field.numberFormat);
    }
  }
};
</script>
