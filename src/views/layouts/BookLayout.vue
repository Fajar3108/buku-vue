<template>
  <div id="book" class="container">
    <router-view />
  </div>
</template>

<style>
#book {
  padding: 1rem;
}
.container {
  width: min(100%, 920px);
  margin: 0 auto;
  padding: 1rem 0;
}
#nav {
  text-align: center;
}
input {
  background-color: #fff;
}
</style>
