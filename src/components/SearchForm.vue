<template>
  <div class="flex flex-col search-box justify-start items-start">
    <div>
      <h3><b>Search your prefered area based on a criteria</b></h3>
    </div>
    <div class="form w-100 mt-3">
      <div class="formGroup">
        <label>Topic *</label>
        <input id="topic" type="text" placeholder="Enter a topic" v-model="topic">
        <div v-if="topicErr" class="mt-3 error-text">{{ topicErr }}</div>
      </div>
      <div class="formGroup mt-10">
        <label> Location *</label>
        <input type="text" v:model="location" ref="location" />
        <div v-if="locationErr" class="mt-3 error-text">{{ locationErr }}</div>
      </div>
      <div class="formGroup mt-10">
        <label>Distance *</label>
        <input id="distance" type="number" placeholder="Enter a distance" v-model.number="distance">
        <div v-if="distanceErr" class="mt-3 error-text">{{ distanceErr }}</div>
      </div>
      <div class="mt-10">
        <button class="btn" @click="search">Search</button>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchForm',
  data() {
    return {
      topic: null,
      topicErr: null,
      location: null,
      locationErr: null,
      locationadded: null,
      distance: null,
      distanceErr: null,
      lat: null,
      lng: null,
      autocompleteService: null,
      placesService: null,
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
      this.locationadded = true;
      this.lat = placeLatLng.lat;
      this.lng = placeLatLng.lng
    },
    search() {
      // formValidation
      let formErr = false;

      if(!this.locationadded) {
        formErr = true;
        this.locationErr = 'Location is required **';
      }
      if(!this.topic) {
        formErr = true;
        this.topicErr = 'Topic is required **';
      }
      if(!this.distance) {
        formErr = true;
        this.distanceErr = 'Distance is required **';
      }
      if(formErr) return;

      var location = new window.google.maps.LatLng(this.lat, this.lng);

      const request = {
        query: this.topic,
        location: location,
        radius: this.distance,
      };

      this.placesService.textSearch(request, (results: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {          
          this.$store.dispatch('storePlaces', results);
          setTimeout(() => {
            this.$router.push('results');            
          }, 500);
        } else {
          this.$store.dispatch('storePlaces', []);
        }
      });
    },

  },
  watch: {
    'locationadded'(newValue) {
      if(newValue) {
        this.locationErr = null;
      } else {
        this.locationErr = 'Location is required';
      }
    },
    'topic'(newValue) {
      if(newValue) {
        this.topicErr = null;
      } else {
        this.topicErr = 'Tpoic is required';
      }
    },
    'distance'(newValue) {
      if(newValue) {
        this.distanceErr = null;
      } else {
        this.locationErr = 'Distance is required';
      }
    },
  }
});
</script>
