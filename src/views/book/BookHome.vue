<template>
  <div>
    <h1>List Book</h1>
    <table cellspacing="0">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Authors</th>
          <th>Average Rating</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.authors }}</td>
          <td>{{ book.average_rating }}</td>
          <td><router-link :to="`/book/${book.id}`">Details</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    books: [],
    reviews: [],
  }),
  mounted() {
    axios
      .get('http://bukubagus.test/v1/book', {
        params: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        this.books = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
