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
        <tr v-for="(book, index) in books" :key="book.id">
          <td>{{ index + 1 }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.authors }}</td>
          <td>
            <img
              src="../../assets/star.svg"
              v-for="(star, index) in Math.floor(book.average_rating)"
              :key="randomId() + index"
            />
            <img
              src="../../assets/star_gray.svg"
              v-for="(star, index) in 5 - Math.floor(book.average_rating)"
              :key="randomId() + index"
            />

            ({{ parseFloat(book.average_rating).toFixed(2) }})
          </td>
          <td><router-link :to="`/book/${book.id}`">Details</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: () => ({
    books: [],
    reviews: [],
  }),
  mounted() {
    this.$axios
      .get('v1/book', {
        params: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        this.books = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    randomId() {
      return this.$nanoid();
    },
  },
};
</script>
