/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import { update, mergeWith } from 'lodash-es';
import Vue from 'vue';
import Vuex from 'vuex';
import RpcClient from '@aeternity/aepp-sdk/es/rpc/client';
import persistStatePlugin from 'aepp-base/src/store/plugins/persistState';
import appsMetadataPlugin from 'aepp-base/src/store/plugins/ui/appsMetadata';
import languagesPlugin from 'aepp-base/src/store/plugins/ui/languages';
import { PROTOCOL_DEFAULT } from 'aepp-base/src/lib/constants';

Vue.use(Vuex);

interface Wallet {
  navigate: (url: string) => Promise<void>,
  bookmarkedApps: () => Promise<string[]>,
  languageCode: () => Promise<string>,
}

interface State {
  wallet: Wallet | null,
  bookmarkedAppsPaths: string[],
}

export default new Vuex.Store<State>({
  plugins: [
    persistStatePlugin(
      (state: object) => state,
      ({
        languages,
        appsMetadata: { cachedManifests = undefined } = {},
      }: any) => ({
        languages,
        appsMetadata: { cachedManifests },
      }),
    ),
    appsMetadataPlugin,
    languagesPlugin,
  ],
  state: {
    wallet: null,
    bookmarkedAppsPaths: [],
  },
  getters: {
    getUrlSet: ({ wallet }) => (path: string) => ({
      url: wallet ? undefined : `${PROTOCOL_DEFAULT}//${path}`,
      navigateTo: () => (wallet ? wallet.navigate(path) : undefined),
    }),
    pathToApp: ({ wallet }, getters) => (path: string) => ({
      ...getters['appsMetadata/get'](path),
      path,
      ...getters.getUrlSet(path),
    }),
  },
  mutations: {
    syncState(state, remoteState) {
      const customizer = (objValue: object, srcValue: object): any => {
        if (!Array.isArray(srcValue)) return undefined;
        if (!Array.isArray(objValue)) return srcValue;
        return srcValue.map((el, idx) => (
          el && typeof el === 'object' ? mergeWith({}, objValue[idx], el, customizer) : el
        ));
      };
      Object.entries(mergeWith({}, state, remoteState))
        .forEach(([name, value]) => Vue.set(state, name, value));
    },
    setWallet(state, wallet) {
      state.wallet = wallet;
    },
    setBookmarkedAppsPaths(state, bookmarkedAppsPaths) {
      state.bookmarkedAppsPaths = bookmarkedAppsPaths;
    },
  },
  actions: {
    async init({ state, commit }) {
      commit(
        'setWallet',
        await RpcClient.compose({
          deepConfiguration: { Ae: { methods: ['navigate', 'bookmarkedApps', 'languageCode'] } },
        })(),
      );
      commit('languages/setActiveCode', await state.wallet!.languageCode());
      commit('setBookmarkedAppsPaths', await state.wallet!.bookmarkedApps());
    },
  },
});
