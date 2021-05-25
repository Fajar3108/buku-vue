<template>
  <div>
    <h1>Register</h1>
    <div class="aler-success" v-if="is_success">
      <p>Register Success</p>
    </div>
    <ul class="errors" v-if="Object.keys(errors).length > 0">
      <li v-for="(error, index) in errors" :key="index" class="error">{{ error[0] }}</li>
    </ul>
    <form action="" class="register-form">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input v-model="first_name" type="text" id="first_name" class="form-control" />
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input v-model="last_name" type="text" id="last_name" class="form-control" />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" class="form-control" />
      </div>

      <Button @click="register()">Submit</Button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    is_success: false,
    errors: [],
  }),
  methods: {
    register() {
      const formData = new FormData();
      formData.append('first_name', this.first_name);
      formData.append('last_name', this.last_name);
      formData.append('username', this.username);
      formData.append('password', this.password);

      axios
        .post('http://bukubagus.test/v1/auth/register', formData)
        .then((response) => {
          console.log(response);
          this.is_success = true;
          this.errors = [];
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
          }
        });
    },
  },
};
</script>
