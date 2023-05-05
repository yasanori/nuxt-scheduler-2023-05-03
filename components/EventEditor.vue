<template>
  <v-container class="space-y-16">
    <div class="text-h3 transition-swing" v-text="event.title" />
    <v-row align-content="center" justify="center" class="space-x-12">
      <!-- 日付選択 -->
      <v-date-picker
        v-model="date"
        no-title
        bottom
        color="primary"
        :min="minDate"
      />
      <!-- 時刻選択 -->
      <v-time-picker
        v-model="time"
        format="24hr"
        :allowed-minutes="(m) => m % 5 === 0"
      />
    </v-row>
    <v-card class="p-8">
      <v-row align="center" justify="center">
        <v-card-title>
          {{ date }}
          {{ time }}
        </v-card-title>

        <v-btn @click="addDate">Create</v-btn>
      </v-row>
    </v-card>

    <v-col>
      <!-- 日時選択解除 -->
      <v-list class="overflow-y-auto" max-height="75vh">
        <div v-if="event.dates.length === 0">Click Calendar to add date!</div>
        <date-list-item
          v-for="date in event.dates"
          :key="date.id"
          :date="date.from"
          @onRemove="removeDate(date.id)"
        />
      </v-list>
    </v-col>
  </v-container>
</template>

<script>
import { DateTime } from "luxon";

export default {
  model: {},
  props: {},
  data() {
    return {
      time: "12:00",
      date: DateTime.now().toFormat("yyyy-MM-dd"),
      minDate: DateTime.now().toFormat("yyyy-MM-dd"),
    };
  },
  computed: {
    id() {
      return this.$store.getters.lastEventDateId + 1;
    },
    event() {
      return this.$store.getters.event(this.$route.params.id);
    },
    eventId() {
      return this.$route.params.id;
    },
  },
  methods: {
    addDate() {
      const dateTime = DateTime.fromISO(this.date).set({
        hour: this.time.split(":")[0],
        minute: this.time.split(":")[1],
      });
      console.log(this.time);
      const date = { id: Number(this.id), from: dateTime };
      this.$store.dispatch("addEventDate", {
        eventId: Number(this.eventId),
        date,
      });
    },
    removeDate(id) {
      this.$store.dispatch("removeEventDate", {
        eventId: this.$route.params.id,
        dateId: id,
      });
    },
  },
};
</script>

<style scoped></style>
