<script setup lang="jsx">

const a = computed(async () => { })

const getDom = (index) => (<div>你好{index}</div>)
</script>

<template>
  <div v-for="item in 10" v-if="item % 2 === 0">
    {{ getDom(item) }}
  </div>
</template>

<style lang="scss" scoped>

</style>