<template>
  <div class="form p-10">
    <div class="formGroup">
      <label>Topic</label>
      <input id="topic" type="text" v-model="topic">
    </div>
    <div class="formGroup mt-10">
      <label> Location</label>
      <input type="text" v:model="location" ref="location" />
    </div>
    <div class="formGroup mt-10">
      <label>Distance</label>
      <input id="distance" type="number" v-model.number="distance">
    </div>
    <div class="mt-10">
      <button @click="search">Search</button>
    </div>
  </div>


  <!-- <ul v-if="places.length">
    <li v-for="place in places" :key="place.place_id">
      {{ place.name }}
    </li>
  </ul> -->
</template>

<script lang="ts">
import Mixin from '@/mixin/mixin';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchForm',
  mixins: [Mixin],
  data() {
    return {
      topic: '',
      location: '',
      distance: '',
      lat: null,
      lng: null,
      autocompleteService: null,
      placesService: null,
      places: []
    };
  },
  mounted() {
    window.checkAndAttachMapScript(this.initGoogleMaps);
    console.log(this.$refs.test);
  },
  methods: {
    initGoogleMaps() {
      this.initLocationSearch();
      this.autocompleteService = new window.google.maps.places.AutocompleteService();
      this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
      console.log(this.placesService);

    },
    searchLocation(autocomplete: any) {
      return new Promise((resolve) => {
        autocomplete.addListener("place_changed", function () {
          let place = autocomplete.getPlace();
          if (place && place.address_components) {
            console.log(place.geometry.location.lat());
            return resolve({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            })
          }
      });
      });
    },
    async initLocationSearch() {
      let autocomplete = new window.google.maps.places.Autocomplete(this.$refs.location as any);
      const placeLatLng: any = await this.searchLocation(autocomplete);
      this.lat = placeLatLng.lat;
      this.lng = placeLatLng.lng
    },
    search() {
      var location = new window.google.maps.LatLng(this.lat, this.lng);

      const request = {
        query: this.topic,
        location: location,
        radius: this.distance,
      };

      this.placesService.textSearch(request, (results: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          this.results = results;
        } else {
          this.results = [];
        }
      });
    },

  }
});
</script>
