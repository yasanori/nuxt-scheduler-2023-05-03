<template>
  <v-container>
    <div class="text-h3 transition-swing" v-text="event.title" />
    <div class="ma-2 mb-5">
      <p
        v-for="(line, i) in description.split('\n')"
        :key="i"
        class="text-justify mb-0 transition-swing"
        v-text="line"
      />
    </div>
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th />
            <th v-for="user in event.votes" :key="user.id" class="text-center">
              <v-btn
                small
                color="accent"
                @click="openVoteDialog(user.id, user.name, user.vote)"
              >
                {{ user.name }}
              </v-btn>
            </th>
            <th>
              <v-btn small color="primary" @click="openVoteDialog()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="date in event.dates"
            :key="date.id"
            :class="{
              success: highlightScore.indexOf(scores[date.id]) === 0,
              accent: highlightScore.indexOf(scores[date.id]) === 1,
            }"
          >
            <td>{{ date.from.toFormat("yyyy/MM/dd") }}</td>
            <td>
              {{ date.from.toFormat("HH:mm") }} ~
              {{ date.to && date.to.toFormat("HH:mm") }}
            </td>
            <td v-for="user in event.votes" :key="user.id" class="text-center">
              <v-icon v-if="user.vote[date.id] === 0"> mdi-close </v-icon>
              <v-icon v-else-if="user.vote[date.id] === 1">
                mdi-triangle-outline
              </v-icon>
              <v-icon v-else-if="user.vote[date.id] === 2">
                mdi-circle-outline
              </v-icon>
              <div v-else>-</div>
            </td>
            <td />
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-fab-transition>
      <v-btn
        fixed
        elevation="2"
        fab
        large
        bottom
        right
        color="primary"
        @click="$router.push(`/event/${$route.params.id}/edit`)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-dialog
      v-model="showVoteDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar flat color="primary">
          <v-btn icon @click="closeVoteDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Vote</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn text> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">Date</th>
                  <th />
                  <th class="text-left">
                    <v-text-field
                      v-model="myName"
                      label="Name"
                      required
                      :rules="[
                        (val) =>
                          (val || '').length > 0 || 'This field is required',
                      ]"
                      counter
                      maxlength="10"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="date in dates" :key="date.id">
                  <td>{{ date.from.toFormat("yyyy/MM/dd") }}</td>
                  <td>
                    {{ date.from.toFormat("HH:mm") }} ~
                    {{ date.to && date.to.toFormat("HH:mm") }}
                  </td>
                  <td>
                    <v-chip-group
                      v-model="myVote[date.id]"
                      mandatory
                      active-class="primary"
                    >
                      <v-chip>
                        <v-icon>mdi-close</v-icon>
                      </v-chip>
                      <v-chip>
                        <v-icon>mdi-triangle-outline</v-icon>
                      </v-chip>
                      <v-chip>
                        <v-icon>mdi-circle-outline</v-icon>
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { DateTime } from "luxon";

export default {
  data() {
    return { showVoteDialog: false, myId: 0, myName: "", myVote: {} };
  },
  head() {
    return {
      title: `${this.title}`,
    };
  },
  computed: {
    event() {
      return this.$store.getters.event(this.$route.params.id);
    },
    eventId() {
      return this.$route.params.id;
    },
    title() {
      return "タイトル";
    },
    description() {
      return "sample";
    },
    dates() {
      return [
        {
          id: 1,
          from: DateTime.fromISO("2021-01-01").set({ hour: 15 }),
        },
        {
          id: 2,
          from: DateTime.fromISO("2021-01-02").set({ hour: 15 }),
        },
        {
          id: 3,
          from: DateTime.fromISO("2021-01-03").set({ hour: 15 }),
        },
      ];
    },
    votes() {
      return [];
    },
    scores() {
      const v = {};
      for (const date of this.dates) {
        v[date.id] = this.votes
          .map((u) => u.vote[date.id] || 0)
          .reduce((p, c) => p + c, 0);
      }
      return v;
    },
    highlightScore() {
      const highlights = Object.values(this.scores)
        .sort((a, b) => b - a)
        .slice(0, 2)
        .filter((score) => score !== 0);
      return highlights;
    },
  },
  methods: {
    openVoteDialog(id, name, vote) {
      this.myId = id || 0;
      this.myName = name || "";
      this.myVote = { ...vote };
      this.showVoteDialog = true;
    },
    closeVoteDialog() {
      this.showVoteDialog = false;
    },
  },
};
</script>

<style scoped></style>
