const useAccountStore = Pinia.defineStore('account', {
  state: () => {
    return {
      sessionID: '',
      loggedIn: false,
      email: email,
      password: token,
      link: link,
      appName: app_name,
      endPts: {
        verifyAccountURL: verifyaccount_url + '/accounts',
      },
    };
  },
  actions: {},
  getters: {},
});
