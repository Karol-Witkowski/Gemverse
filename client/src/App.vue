<template>
  <main>
    <Navbar />
    <router-view />
  </main>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans:200,300,400,500,600,700&display=swap');

main {
  font-family: 'Josefin Sans', Arial, sans-serif;
  text-align: center;
}
</style>
