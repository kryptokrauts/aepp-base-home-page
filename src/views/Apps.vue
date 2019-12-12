<template>
  <MobilePage
    class="apps"
    fill="neutral"
    hide-tab-bar
  >
    <Guide :template="$t('app.list.featured-guide')" />

    <AeCard fill="maximum">
      <ListItem
        v-for="(app, idx) in aeternityApps"
        :key="`list-item-aeternity-app-${idx}`"
        :title="app.name"
        :subtitle="app.path"
        :to="getLink(app.path)"
        @click="getClickHandler(app.path)"
      >
        <img
          v-if="app.icon"
          slot="icon"
          :src="app.icon"
          :alt="app.name"
        >
      </ListItem>
    </AeCard>

    <template v-if="bookmarkedApps.length">
      <Guide :template="$t('app.list.bookmarked-guide')" />

      <div class="shortcuts">
        <AppShortcut
          v-for="(app, idx) in bookmarkedApps"
          :key="`app-shortcut-aeternity-app-${idx}`"
          v-bind="app"
          :to="getLink(app.path)"
          @click="getClickHandler(app.path)"
        />
      </div>
    </template>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import RpcClient from '@aeternity/aepp-sdk/es/rpc/client';
import { PROTOCOL_DEFAULT } from 'aepp-base/src/lib/constants';
import { aeternityAppsPaths } from 'aepp-base/src/lib/appsRegistry';
import MobilePage from 'aepp-base/src/components/mobile/Page.vue';
import Guide from 'aepp-base/src/components/Guide.vue';
import AppShortcut from 'aepp-base/src/components/AppShortcut.vue';
import AeCard from 'aepp-base/src/components/AeCard.vue';
import ListItem from 'aepp-base/src/components/ListItem.vue';

const pathsToMetadata = (paths, getters) => paths.map(path => ({
  ...getters['appsMetadata/get'](path),
  path,
}));

export default {
  components: {
    MobilePage,
    Guide,
    AppShortcut,
    AeCard,
    ListItem,
  },
  data: () => ({
    PROTOCOL_DEFAULT,
    wallet: null,
    bookmarkedAppsPaths: [],
  }),
  computed: mapState({
    aeternityApps: (state, getters) => pathsToMetadata(aeternityAppsPaths, getters),
    bookmarkedApps(state, getters) {
      return pathsToMetadata(this.bookmarkedAppsPaths, getters);
    },
  }),
  methods: {
    getClickHandler(path) {
      return this.wallet ? this.wallet.navigate(path) : undefined;
    },
    getLink(path) {
      return this.wallet ? undefined : `${PROTOCOL_DEFAULT}//${path}`;
    },
  },
  async mounted() {
    this.wallet = await RpcClient.compose({
      deepConfiguration: { Ae: { methods: ['navigate', 'bookmarkedApps', 'languageCode'] } },
    })();
    this.$store.commit('languages/setActiveCode', await this.wallet.languageCode());
    this.bookmarkedAppsPaths = await this.wallet.bookmarkedApps();
  },
};
</script>

<style lang="scss" scoped>
@import '~aepp-base/src/styles/functions';

.apps {
  .ae-card {
    margin-bottom: rem(24px);
  }

  .shortcuts {
    margin: rem(20px) rem(-10px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    grid-gap: 30px 10px;
    justify-items: center;
  }
}
</style>
