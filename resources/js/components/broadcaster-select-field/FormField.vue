<template>
  <DefaultField :field="field" :errors="errors" :show-help-text="showHelpText">
    <template #field>
      <SelectControl
        :id="field.attribute"
        :dusk="field.attribute"
        @change="handleChange"
        :value="value"
        class="w-full form-control form-select"
        :class="errorClasses"
        :options="field.options"
        :disabled="isReadonly"
      >
        <option value="" selected :disabled="!field.nullable">
          {{ placeholder }}
        </option>
      </SelectControl>
    </template>
  </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'

export default {
  mixins: [HandlesValidationErrors, FormField],
  data: () => ({
    selectedOption: null,
    search: '',
  }),
  created() {
    if (this.field.value) {
      this.selectedOption = (this.field.options || []).find(
        v => v.value == this.field.value
      )
    }
  },
  methods: {
    fill(formData) {
      formData.append(this.field.attribute, this.value)
    },
    handleChange(e) {
      this.value = e.target.value
      if (this.field) {
        Nova.$emit(this.field.attribute + '-change', this.value);
        Nova.$emit(this.field.broadcastTo, {
          field_name: this.field.attribute,
          value: this.value
        });
      }
    },
  },
  computed: {
    placeholder() {
      return this.field.placeholder || this.__('Choose an option')
    },
  },
}
</script>
