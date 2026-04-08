<template>
  <FormBelongsToField
    ref="belongsToField"
    :resource-name="resourceName"
    :resource-id="resourceId"
    :field="field"
    :via-resource="viaResource"
    :via-resource-id="viaResourceId"
    :via-relationship="viaRelationship"
    :shown-via-new-relation-modal="shownViaNewRelationModal"
    @field-changed="handleFieldChanged"
  />
</template>

<script>
export default {
  props: {
    resourceName: { type: String },
    resourceId: {},
    field: { type: Object, required: true },
    viaResource: { type: String },
    viaResourceId: {},
    viaRelationship: { type: String },
    shownViaNewRelationModal: { type: Boolean, default: false },
  },

  methods: {
    handleFieldChanged() {
      this.$nextTick(() => {
        const inner = this.$refs.belongsToField;
        if (inner && inner.selectedResourceId !== undefined) {
          Nova.$emit(this.field.attribute + '-change', inner.selectedResourceId);
          Nova.$emit(this.field.broadcastTo, {
            field_name: this.field.attribute,
            value: inner.selectedResourceId
          });
        }
      });
    },

    fill(formData) {
      const inner = this.$refs.belongsToField;
      if (inner && typeof inner.fill === 'function') {
        inner.fill(formData);
      }
    }
  },

  mounted() {
    const inner = this.$refs.belongsToField;
    if (inner && inner.selectedResourceId) {
      Nova.$emit(this.field.broadcastTo, {
        field_name: this.field.attribute,
        value: inner.selectedResourceId
      });
    }
  }
};
</script>
