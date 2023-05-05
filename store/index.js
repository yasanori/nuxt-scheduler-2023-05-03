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
  // eventsDates:()=>(eventId, )=>{},
  lastEventId(state) {
    return [...state.events]
      .sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      })
      .slice(-1)[0].id;
  },
  lastEventDateId(state) {
    return [...state.events]
      .flatMap((event) => event.dates)
      .sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      })
      .slice(-1)[0].id;
  },
};

export const mutations = {
  addEvent(state, event) {
    state.events = [...state.events, event];
  },
  setEvents(state, events) {
    state.events = events;
  },
};

export const actions = {
  createEvent(context, { id, title, description }) {
    context.commit("addEvent", {
      id,
      title,
      description,
      dates: [],
      votes: [],
    });
  },
  addEventDate({ commit, state, getters }, { eventId, date }) {
    const excludedEvents = state.events.filter((event) => event.id !== eventId);
    const targetEvent = getters.event(eventId);
    if (!targetEvent)
      return window.alert("対象のイベントが見つかりませんでした");
    const addedEventDates = [...targetEvent.dates, date];
    // 削除の前後でdateの数が一致している場合失敗のアラート表示
    if (targetEvent.dates.length === addedEventDates.length)
      return window.alert("作成できませんでした");
    commit("setEvents", [
      ...excludedEvents,
      {
        ...targetEvent,
        dates: addedEventDates,
      },
    ]);
  },
  removeEventDate({ commit, state }, { eventId, dateId }) {
    const excludedEvents = state.events.filter(
      (event) => event.id !== Number(eventId)
    );
    const targetEvent = state.events.find(
      (event) => event.id === Number(eventId)
    );
    if (!targetEvent)
      return window.alert("対象のイベントが見つかりませんでした");
    const removedEventDates = targetEvent.dates.filter(
      (date) => date.id !== Number(dateId)
    );
    // 削除の前後でdateの数が一致している場合失敗のアラート表示
    if (targetEvent.dates.length === removedEventDates.length)
      return window.alert("削除できませんでした");
    if (window.confirm("削除しますか？")) {
      commit("setEvents", [
        ...excludedEvents,
        {
          ...targetEvent,
          dates: removedEventDates,
        },
      ]);
    }
  },
};
