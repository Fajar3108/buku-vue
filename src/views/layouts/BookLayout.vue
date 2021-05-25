<template>
  <div id="book" class="container">
    <div class="header">
      <h3>Books</h3>
      <Button @click="logout" class="logout-btn">Logout</Button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      const token = localStorage.getItem('token');

      this.$axios
        .post('/v1/auth/logout', '', {
          params: { token },
        })
        .then(() => {
          localStorage.removeItem('token');
          this.$router.push('/auth/login?message=1');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
#book {
  padding: 1rem;
}
.container {
  width: min(100%, 920px);
  margin: 0 auto;
  padding: 1rem 0;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
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
