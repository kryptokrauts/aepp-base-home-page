<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
</style>

<style lang="scss">
html, body {
  height: 1px;
  min-height: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
