<template>
  <v-container>
    <h2 class="text-4xl opacity-50">Create</h2>
    <v-card class="p-4">
      <!-- タイトル入力 -->
      <v-text-field
        v-model="title"
        label="Title"
        counter
        maxlength="25"
        required
        :rules="[(val) => (val || '').length > 0 || 'This field is required']"
      />
      <!-- 詳細入力 -->
      <v-textarea
        v-model="description"
        label="Description"
        counter
        maxlength="200"
      />
    </v-card>
    <div class="flex justify-center py-4">
      <v-btn @click="handleCreate">create</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return { title: "", description: "" };
  },
  computed: {
    eventId() {
      return this.$store.getters.lastEventId + 1;
    },
  },
  methods: {
    handleCreate() {
      this.$store.dispatch("createEvent", {
        id: this.eventId,
        title: this.title,
        description: this.description,
      });
    },
  },
};
</script>
