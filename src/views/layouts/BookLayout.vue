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
  color: #000;
}
table {
  width: 100%;
  text-align: left;
}
table thead {
  background-color: #eee;
}
table td,
table th {
  padding: 0.5rem;
  border: 1px solid #aaa;
}
</style>
