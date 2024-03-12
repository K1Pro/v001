<template>
  <template
    v-if="
      (!email || !password || !link || !appName || !verified) &&
      verified !== 'verifying'
    "
  >
    <div class="icon-container">
      <i class="fa-regular fa-circle-xmark fail-verify-icon fadeIn"></i>
    </div>
    <div class="text-container">
      <div>
        <div class="fail-verify-text fadeIn">
          {{ appName ? appName + ' verification' : 'Verification' }} Failed
        </div>
        <p></p>
        <div class="fail-verify-text fadeIn">
          <a href="javascript:close()" @click="">Close window</a>
        </div>
      </div>
    </div>
  </template>

  <template v-else-if="verified === true">
    <div class="icon-container">
      <i class="fa-regular fa-circle-check success-verify-icon fadeIn"></i>
    </div>

    <div class="text-container">
      <div>
        <div class="success-verify-text fadeIn">
          {{ appName }} verification successful!
        </div>
        <p></p>
        <div v-if="redirect" class="success-verify-text fadeIn">
          <a :href="link + '?session_id=' + sessionID + '&token=' + token">
            Go to the {{ appName }} app</a
          >
        </div>
        <div class="success-verify-text">
          <a href="javascript:close()" @click="">Close window</a>
        </div>
      </div>
    </div>
  </template>

  <template v-else> </template>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      verified: 'verifying',
      redirect: false,
      token: null,
      sessionID: null,
    };
  },

  computed: {
    // ...Pinia.mapStores(useAccountStore),
    ...Pinia.mapWritableState(useAccountStore, [
      'loggedIn',
      'email',
      'password',
      'link',
      'appName',
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
            Password: this.password,
            Referer: this.link.toLowerCase(),
            AppName: this.appName,
          }),
        });
        const verifyAccountResJSON = await response.json();
        const loaderElement = document.getElementById('loader-container');
        setTimeout(function () {
          loaderElement.remove();
        }, 3000);
        if (verifyAccountResJSON.success) {
          this.verified = true;
          this.redirect = verifyAccountResJSON.data.redirect ? true : false;
          this.token = verifyAccountResJSON.data.accesstoken;
          this.sessionID = verifyAccountResJSON.data.session_id;
        } else {
          this.verified = false;
          this.redirect = false;
          this.token = null;
          this.sessionID = null;
        }
        console.log(verifyAccountResJSON);
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    if (this.email && this.password && this.link && this.appName) {
      this.verifyAccount();
    } else {
      this.verified = false;
    }
  },
};
</script>

<style>
.icon-container {
  display: grid;
  place-items: center;
  height: 95vh;
  padding: 0px;
  margin: 0px;
  position: absolute;
  top: 0px;
  width: 100vw;
}
.text-container {
  display: grid;
  place-items: center;
  height: 50vh;
  text-align: center;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  padding: 0px;
  margin: 0px;
}
.fail-verify-icon {
  color: red;
  font-size: 150px;
  /* animation-delay: -10s;
  animation: horizontal 4s ease infinite; */
  /* padding: 5vw; */
}
.fail-verify-text {
  color: red;
  font-size: 20px;
}
.success-verify-icon {
  color: green;
  font-size: 150px;
  /* animation-delay: -10s;
  animation: vertical 4s ease infinite; */
  /* padding: 5vw; */
}
.success-verify-text {
  color: green;
  font-size: 20px;
}
</style>
