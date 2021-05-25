<template>
  <div id="auth" class="container">
    <div id="nav">
      <router-link to="/auth/register">register</router-link> |
      <router-link to="/auth/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#auth {
  padding: 1rem;
}
.container {
  width: min(100%, 720px);
  margin: 0 auto;
  padding: 1rem 0;
}
#nav {
  text-align: center;
}
input {
  background-color: #fff;
}
h1 {
  margin-bottom: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-control {
  padding: 0.3rem 0.5rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
}
.errors,
.alert-success {
  padding: 1rem;
  color: #fff;
  margin-bottom: 1.5rem;
  list-style: none;
}
.errors {
  background-color: red;
}
.error {
  margin-bottom: 0.5rem;
}
.alert-success {
  background: green;
}
</style>
