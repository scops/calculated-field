<template>
  <DefaultField :field="field" :errors="errors" :show-help-text="showHelpText">
    <template #field>
      <div class="flex flex-wrap items-stretch w-full relative">
        <div class="flex -mr-px">
          <span class="flex items-center leading-normal rounded rounded-r-none border border-r-0 border-60 px-3 whitespace-no-wrap bg-30 text-80 text-sm font-bold">
            {{ field.currency }}
          </span>
        </div>
        <input
          :id="field.name"
          :type="field.type"
          :dusk="field.attribute"
          class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 rounded-l-none form-control form-input form-input-bordered"
          :class="errorClasses"
          :placeholder="field.name"
          :value="formattedValue"
          v-bind="extraAttributes"
          @input="setFieldAndMessage"
          :disabled="isReadonly"
        />
      </div>
    </template>
  </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from "laravel-nova";
import numeral from "numeral";
import _ from "lodash";

export default {
  mixins: [FormField, HandlesValidationErrors],
  props: ["resourceName", "resourceId", "field"],
  created() {
    Nova.$on(this.field.listensTo, this.messageReceived);
  },
  beforeUnmount() {
    Nova.$off(this.field.listensTo, this.messageReceived);
  },
  data: () => ({
    calculating: false,
    field_values: {},
    amount: 0
  }),
  computed: {
    defaultAttributes() {
      return {
        type: 'number',
        min: this.field.min,
        max: this.field.max,
        step: this.field.step,
        pattern: this.field.pattern,
        placeholder: this.field.placeholder || this.field.name,
        class: this.errorClasses,
      }
    },
    extraAttributes() {
      const attrs = this.field.extraAttributes
      return { ...this.defaultAttributes, ...attrs }
    },
    formattedValue() {
      return this.moneyFormat(this.value, this.field.numberFormat);
    }
  },
  methods: {
    messageReceived(message) {
      this.field_values[message.field_name] = message.value;
      this.calculateValue();
    },
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
      this.amount = parsedValue;
      this.value = parsedValue;
    },
    calculateValue: _.debounce(function() {
      this.calculating = true;
      Nova.request()
        .post(
          `/scops/calculated-field/calculate/${this.resourceName}/${this.field.attribute}`,
          this.field_values
        )
        .then(response => {
          this.value = response.data.value;
          Nova.$emit(this.field.broadcastTo, {
            field_name: this.field.attribute,
            value: this.value
          });
          this.calculating = false;
        })
        .catch(() => { this.calculating = false; });
    }, 500),
    setInitialValue() { this.value = this.field.value || ""; },
    fill(formData) { formData.append(this.field.attribute, this.value || ""); },
    handleChange(value) { this.value = value; },
    moneyFormat(number, format) {
      if (!format) return number;
      return numeral(number).format(format);
    }
  }
};
</script>
