<template>
  <default-field :field="field" :errors="errors">
    <template slot="field">
      <input
        :id="field.name"
        :type="this.field.type"
        class="w-full form-control form-input form-input-bordered"
        :class="errorClasses"
        :placeholder="field.name"
        :value="value | moneyFormat(field.numberFormat)"
        @input="setFieldAndMessage"
      />
    </template>
  </default-field>
</template>

<script>
import { FormField, HandlesValidationErrors } from "laravel-nova";
import numeral from "numeral";

export default {
  mixins: [FormField, HandlesValidationErrors],

  props: ["resourceName", "resourceId", "field"],

  created() {
    Nova.$on(this.field.listensTo, this.messageReceived);
    this.field_values["resourceId"] = parseInt(this.resourceId);
  },

  data: () => ({
    calculating: false,
    field_values: {}
  }),

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

            // Broadcast if you need to
            Nova.$emit(this.field.broadcastTo, {
                field_name: this.field.attribute,
                value: this.value
            });

          this.calculating = false;
        })
        .catch(() => {
          this.calculating = false;
        });
    }, 500),

    /*
     * Set the initial, internal value for the field.
     */
    setInitialValue() {
      this.value = this.field.value || "";
    },

    /**
     * Fill the given FormData object with the field's internal value.
     */
    fill(formData) {
      formData.append(this.field.attribute, this.value || "");
    },

    /**
     * Update the field's internal value.
     */
    handleChange(value) {
      this.value = value;
    }
  },
  filters: {
    moneyFormat(number, format) {
      if (!format) {
        return number;
      }
      return numeral(number).format(format);
    }
  }
};
</script>
