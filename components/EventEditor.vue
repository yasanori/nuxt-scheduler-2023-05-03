<template>
  <v-container class="space-y-16">
    <div class="text-h3 transition-swing" v-text="event.title" />
    <v-row align-content="center" justify="center" class="space-x-12">
      <!-- 日付選択 -->
      <v-date-picker
        no-title
        bottom
        color="primary"
        @change="addDate"
        :min="minDate"
      />
      <!-- 時刻選択 -->
      <v-time-picker
        v-model="time"
        format="24hr"
        :allowed-minutes="(m) => m % 5 === 0"
      />
    </v-row>
    <v-col>
      <!-- 日時選択解除 -->
      <v-list class="overflow-y-auto" max-height="75vh">
        <div v-if="dates.length === 0">Click Calendar to add date!</div>
        <date-list-item
          @onRemove="removeDate"
          v-for="date in dates"
          :key="date.id"
          :date="date.from"
        />
      </v-list>
    </v-col>
  </v-container>
</template>

<script>
import { DateTime } from "luxon";

export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: { type: Object, required: true },
  },
  data() {
    return {
      title: "",
      description: "",
      time: "19:00",
      minDate: DateTime.now().toFormat("yyyy-MM-dd"),
      dates: [{ id: 1, from: DateTime.now() }],
    };
  },
  computed: {
    event() {
      return this.$store.getters.event(this.$route.params.id);
    },
  },
  methods: {
    addDate(date) {
      const time = DateTime.fromFormat(this.time, "HH:mm");
      const formattedDate = DateTime.formatISO(date).set({
        hour: time.hour,
        minute: time.minute,
      });
      this.dates = [...this.dates, { id: +new Date(), from: formattedDate }];
      this.changeEvent();
    },
    removeDate(id) {
      this.dates = this.dates.filter((d) => d.id !== id);
      this.changeEvent();
    },
  },
  watch: {},
};
</script>

<style scoped></style>
