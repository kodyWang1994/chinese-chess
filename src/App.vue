<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.resize()
    document.body.onresize = this.resize
  },
  methods: {
    resize () {
      let cWidth = document.body.clientWidth
      let width = cWidth / 750 * 100
      if (width > 100) {
        width = 100
      } else if (width < 32) {
        width = 32
      }
      document.querySelector('html').style.fontSize = width + 'px'
    }
  }
}
</script>

<style>
body {
  user-select: none;
  margin: 0;
  padding: 0;
}
</style>
