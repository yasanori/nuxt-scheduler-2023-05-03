<template>
  <v-dialog
    v-model="isShow"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar flat color="primary">
        <v-btn icon @click="onClose">
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
                    v-model="name"
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
</template>

<script>
export default {
  props: {
    vote: {
      type: Object,
      required: true,
    },
    isShow: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      name() {
        return this.props.vote.name;
      },
    };
  },
  computed: {},
};
</script>
