<template>
  <v-list-item align="start">
    <v-list-item-content>
      <v-list-item-title> {{ date.toFormat("yyyy/MM/dd") }} </v-list-item-title>
      <v-list-item-subtitle>
        {{ date.toFormat("HH:mm") }} ~
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-icon color="accent" @click="onRemove"> mdi-delete </v-icon>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { DateTime } from "luxon";
export default {
  props: {
    date: {
      type: DateTime,
      required: true,
    },
    onRemove: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
