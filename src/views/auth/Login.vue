<template>
  <div>
    <h1>Login</h1>
    <div class="aler-success" v-if="is_success">
      <p>Login Success</p>
    </div>
    <ul class="errors" v-if="Object.keys(errors).length > 0">
      <li v-for="(error, index) in errors" :key="index" class="error">{{ error[0] }}</li>
    </ul>
    <form action="" class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" class="form-control" />
      </div>

      <Button @click="login()">Submit</Button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    username: '',
    password: '',
    is_success: false,
    errors: [],
  }),
  methods: {
    login() {
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);

      axios
        .post('http://bukubagus.test/v1/auth/login', formData)
        .then((res) => {
          console.log(res.data.token);
          const { token } = res.data;
          localStorage.setItem('token', token);

          this.$router.push('/book');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
