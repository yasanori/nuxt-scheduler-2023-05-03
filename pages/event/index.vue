<template>
  <v-card class="mx-auto" max-width="1600">
    <v-card-title>Title</v-card-title>
    <v-list liens="one" v-if="events?.length > 0">
      <v-list-item
        v-for="event in events"
        :key="event.id + event.title"
        :title="event.title"
        link
        nuxt
        :to="`/event/${event.id}`"
      >
        <v-list-item-title>
          {{ event.title }}
        </v-list-item-title>
        <v-list-item-subtitle :maxlength="20">
          {{ event.description }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item>イベントはありません</v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  computed: {
    events() {
      return this.$store.getters.events;
    },
  },
};
</script>
