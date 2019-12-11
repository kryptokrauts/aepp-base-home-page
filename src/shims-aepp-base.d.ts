declare module 'aepp-base/src/store/plugins/persistState' {
  import { Store } from 'vuex';

  type StateReducer = (state: any) => object;
  type VuexPlugin = (store: Store<any>) => void;
  export default function (reducerLoad: StateReducer, reducerSave: StateReducer): VuexPlugin;
}

declare module 'aepp-base/src/store/plugins/ui/appsMetadata' {
  import { Store } from 'vuex';

  export default function (store: Store<any>): void;
}

declare module 'aepp-base/src/store/plugins/ui/languages' {
  import { Store } from 'vuex';
  import VueI18n from 'vue-i18n';

  export const i18n: VueI18n;

  export default function (store: Store<any>): void;
}
