<template>
  <div class="app-container">
    <template v-if="!email || !protocol || !site || !token">
      <div style="text-align: center">
        <i
          class="fa-regular fa-circle-xmark"
          style="
            color: red;
            font-size: 25vw;
            animation: horizontal 4s ease infinite;
            padding: 5vw;
          "
        ></i>
        <div
          style="
            color: red;
            font-size: 2vw;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          Verification Failed
        </div>
      </div></template
    >
    <template v-else>
      <div style="text-align: center">
        <i
          class="fa-regular fa-circle-check"
          style="
            color: green;
            font-size: 25vw;
            animation: vertical 4s ease infinite;
            padding: 5vw;
          "
        ></i>
        <div
          style="
            color: green;
            font-size: 2vw;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          Verification successful!
        </div>
        <div
          style="
            color: green;
            font-size: 2vw;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          What would you like to do now?
        </div>
        <div
          style="
            color: blue;
            font-size: 2vw;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          Go to app.
        </div>
        <div
          style="
            color: black;
            font-size: 2vw;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          Close window.
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import Snackbar from './components/Snackbar.vue';

export default {
  name: 'App',

  components: {
    // Snackbar,
  },

  computed: {
    // ...Pinia.mapStores(useAccountStore),
    ...Pinia.mapWritableState(useAccountStore, [
      'loggedIn',
      'email',
      'protocol',
      'site',
      'token',
      'endPts',
    ]),
  },

  methods: {
    async verifyAccount() {
      try {
        const response = await fetch(this.endPts.verifyAccountURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            Email: this.email.toLowerCase(),
            Protocol: this.protocol.toLowerCase(),
            Site: this.site.toLowerCase(),
            Token: this.token,
          }),
        });
        const verifyAccountResJSON = await response.json();
        if (verifyAccountResJSON.success) {
        }
        console.log(verifyAccountResJSON);
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    const loaderElement = document.getElementById('loader-container');
    loaderElement.remove();
  },

  mounted() {},
};
</script>

<style>
.app-container {
  display: grid;
  place-items: center;
  height: 95vh;
}
</style>
