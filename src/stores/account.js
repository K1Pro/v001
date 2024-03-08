const useAccountStore = Pinia.defineStore('account', {
  state: () => {
    return {
      sessionID: '',
      loggedIn: false,
      email: email,
      protocol: protocol,
      site: site,
      token: token,
      endPts: {
        verifyAccountURL: verifyaccount_url,
      },
    };
  },
  actions: {},
  getters: {},
});
