import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  places: any[]
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    places: []
  },
  mutations: {
    mutatePlaces (state, places) {
      state.places = places;
    }
  },
  actions: {
      storePlaces ({ commit, state }, places) {
        commit('mutatePlaces', places)
    }
  }
})