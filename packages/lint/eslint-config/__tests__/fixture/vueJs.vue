<script setup>

const a = computed(async () => { })

const test1 = Number.parseInt('123')

const test2 = 'red'
if('red' === test2) {
  console.log('red')
}

const test3 = .12;
</script>

<template>
  <div v-for="item in 10" v-if="item % 2 === 0">
    {{ item }}
  </div>
</template>

<style lang="scss" scoped>

</style>