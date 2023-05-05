import { DateTime } from "luxon";

export const state = () => ({
  isLoading: false,
  events: [
    {
      id: 1,
      title: "first event",
      description: "first event description",
      dates: [
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
      ],
      votes: [
        {
          id: 1,
          name: "Tom",
          vote: {
            1: 2,
            2: 2,
            3: 1,
          },
        },
        {
          id: 2,
          name: "Jon",
          vote: {
            1: 0,
            2: 2,
            3: 0,
          },
        },
        {
          id: 3,
          name: "Tim",
          vote: {
            1: 1,
            2: 2,
            3: null,
          },
        },
      ],
    },
  ],
});
export const getters = {
  events(state) {
    return state.events;
  },
  event: (state) => (id) => {
    return state.events.find((event) => event.id === Number(id));
  },
  lastEventId(state) {
    return state.events.slice(-1)[0];
  },
};

export const mutations = {
  // createEvent(state, title, description) {
  //   state.events = [...state.events, ]
  // },
  setEvent(state, event) {
    state.events = [...state.events, event];
  },
};

export const actions = {
  clearEvent(ctx) {
    ctx.commit("setEventId", "");
    ctx.commit("setTitle", "");
    ctx.commit("setDescription", "");
    ctx.commit("setDates", []);
    ctx.commit("setVotes", []);
  },
  setEvent(ctx, { id, title, description, dates, votes }) {
    ctx.commit("setEventId", id);
    title && ctx.commit("setTitle", title);
    description && ctx.commit("setDescription", description);
    dates && ctx.commit("setDates", dates);
    votes && ctx.commit("setVotes", votes);
  },
  createEvent(ctx, { id, title, description }) {
    ctx.commit("setEvent", {
      id,
      title,
      description,
      dates: [],
      votes: [],
    });
  },
};
