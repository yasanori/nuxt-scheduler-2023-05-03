<template>
  <v-container>
    <v-btn
      fixed
      elevation="2"
      fab
      large
      bottom
      right
      color="primary"
      nuxt
      to="/event/create"
    >
      <v-icon color="white"> mdi-plus </v-icon>
    </v-btn>
    <event-list />
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
