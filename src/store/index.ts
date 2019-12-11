import { update, mergeWith } from 'lodash-es';
import Vue from 'vue';
import Vuex from 'vuex';
import persistStatePlugin from 'aepp-base/src/store/plugins/persistState';
import appsMetadataPlugin from 'aepp-base/src/store/plugins/ui/appsMetadata';
import languagesPlugin from 'aepp-base/src/store/plugins/ui/languages';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    persistStatePlugin(
      (state: object) => state,
      ({
        languages,
        appsMetadata: { cachedManifests } = {},
      }: {
        languages?: { activeCode: string },
        appsMetadata: { cachedManifests?: object }
      }) => ({
        languages,
        appsMetadata: { cachedManifests },
      }),
    ),
    appsMetadataPlugin,
    languagesPlugin,
  ],
  mutations: {
    syncState(state: object, remoteState: object) {
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
  },
});
