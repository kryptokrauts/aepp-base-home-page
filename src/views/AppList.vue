<template>
  <MobilePage
    class="app-list"
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
        :to="`/${app.path}`"
      >
        <img
          v-if="app.icon"
          slot="icon"
          :src="app.icon"
          :alt="app.name"
        >
        <LeftMore slot="right" />
      </ListItem>
    </AeCard>

    <template v-if="bookmarkedApps.length">
      <Guide :template="$t('app.list.bookmarked-guide')" />

      <div class="shortcuts">
        <AppShortcut
          v-for="(app, idx) in bookmarkedApps"
          :key="`app-shortcut-aeternity-app-${idx}`"
          v-bind="app"
          :to="app.url"
          @click="app.navigateTo"
        />
      </div>
    </template>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import { aeternityAppsPaths } from 'aepp-base/src/lib/appsRegistry';
import MobilePage from 'aepp-base/src/components/mobile/Page.vue';
import Guide from 'aepp-base/src/components/Guide.vue';
import AeCard from 'aepp-base/src/components/AeCard.vue';
import ListItem from 'aepp-base/src/components/ListItem.vue';
import { LeftMore } from 'aepp-base/src/components/icons';
import AppShortcut from 'aepp-base/src/components/AppShortcut.vue';

export default {
  components: {
    MobilePage, Guide, AeCard, ListItem, LeftMore, AppShortcut,
  },
  computed: mapState({
    aeternityApps: (state, { pathToApp }) => aeternityAppsPaths.map(p => pathToApp(p)),
    bookmarkedApps: ({ bookmarkedAppsPaths }, { pathToApp }) => bookmarkedAppsPaths
      .map(p => pathToApp(p)),
  }),
};
</script>

<style lang="scss" scoped>
@import '~aepp-base/src/styles/functions';

.app-list {
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
