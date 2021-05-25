<template>
  <div>
    <router-link to="/book">&#10092;&#10092; Back</router-link>
    <h1>Book Detail</h1>

    <table cellspacing="0">
      <tr>
        <th>Title</th>
        <td>{{ book.title }}</td>
      </tr>
      <tr>
        <th>ISBN</th>
        <td>{{ book.isbn }}</td>
      </tr>
      <tr>
        <th>Pages</th>
        <td>{{ book.pages }}</td>
      </tr>
      <tr>
        <th>Authors</th>
        <td>{{ book.authors }}</td>
      </tr>
      <tr>
        <th>Average Rating</th>
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

          ({{ book.average_rating.toFixed(2) }})
        </td>
      </tr>
      <tr>
        <th>Total Reviews</th>
        <td>{{ book.total_reviews }}</td>
      </tr>
      <tr>
        <th>Total Rating</th>
        <td>{{ book.total_rating }}</td>
      </tr>
      <tr>
        <th>Star</th>
        <td>
          <ul>
            <li>
              <img src="../../assets/star.svg" />
              {{ (book.ratings.star_1 || 0.0).toFixed(2) }}%
            </li>
            <li>
              <img
                src="../../assets/star.svg"
                v-for="(star, index) in 2"
                :key="randomId() + index"
              />
              {{ (book.ratings.star_2 || 0.0).toFixed(2) }}%
            </li>
            <li>
              <img
                src="../../assets/star.svg"
                v-for="(star, index) in 3"
                :key="randomId() + index"
              />
              {{ (book.ratings.star_3 || 0.0).toFixed(2) }}%
            </li>
            <li>
              <img
                src="../../assets/star.svg"
                v-for="(star, index) in 4"
                :key="randomId() + index"
              />
              {{ (book.ratings.star_4 || 0).toFixed(2) }}%
            </li>
            <li>
              <img
                src="../../assets/star.svg"
                v-for="(star, index) in 5"
                :key="randomId() + index"
              />
              {{ (book.ratings.star_5 || 0.0).toFixed(2) }}%
            </li>
          </ul>
        </td>
      </tr>
    </table>

    <div class="add-rating">
      <div class="stars" @mouseout="leaveStar()">
        <div class="star" @mouseout="leaveStar()">
          <img
            src="../../assets/star.svg"
            v-for="(star, index) in activeStar"
            :key="randomId() + index"
            @mouseover="hoverStar(index)"
            @mouseout="leaveStar()"
            @click="submitRating(index)"
            class="active"
          />
          <img
            src="../../assets/star_gray.svg"
            v-for="(star, index) in 5 - activeStar"
            :key="randomId() + index"
            @mouseout="leaveStar()"
            @mouseover="hoverStar(index)"
          />
        </div>
      </div>
    </div>

    <div class="reviews">
      <h2>Reviews</h2>
      <form action="">
        <div class="form-group">
          <textarea
            cols="30"
            rows="5"
            class="form-control"
            placeholder="Put your review here"
            v-model="reviewInput"
          ></textarea>
          <div class="error-message" v-if="errors.review">
            <i>* {{ errors.review[0] }}</i>
          </div>
          <Button @click="submitReview()">Send</Button>
        </div>
      </form>
      <div class="review" v-for="(review, index) in book.reviews" :key="index">
        <p>{{ review.review }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  data: () => ({
    book: {
      ratings: {},
      average_rating: 0.0,
    },
    reviewInput: '',
    basePath: 'v1/book',
    errors: [],
    activeStar: 0,
  }),
  components: {
    Button,
  },
  mounted() {
    this.getBook();
  },
  methods: {
    getBook() {
      const id = this.$route.params.book_id;
      this.$axios
        .get(`${this.basePath}/${id}`, {
          params: {
            token: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.book = res.data;
        })
        .catch((err) => console.log(err));
    },
    submitReview() {
      const formData = new FormData();
      const id = this.$route.params.book_id;
      formData.append('review', this.reviewInput);
      this.$axios
        .post(`${this.basePath}/${id}/review`, formData, {
          params: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.getBook();
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
    randomId() {
      return this.$nanoid();
    },
    hoverStar(index) {
      this.activeStar = index + 1;
    },
    leaveStar() {
      this.activeStar = 0;
    },
    submitRating(index) {
      const formData = new FormData();
      formData.append('rating', index + 1);
      const id = this.$route.params.book_id;
      this.$axios
        .post(`${this.basePath}/${id}/rating`, formData, {
          params: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.getBook();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
ul li {
  padding: 0.5rem;
}
.reviews {
  padding: 1rem 0;
}
.reviews h2 {
  margin-bottom: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group textarea {
  background-color: #fff;
  color: #303030;
  padding: 1rem;
}
.review {
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  border: 1px solid #000;
}
.error-message {
  padding: 1rem 0;
  color: #f00;
  font-size: 0.875rem;
}
.add-rating {
  margin-top: 1rem;
}
.add-rating .stars {
  display: flex;
  width: 100%;
  padding: 1rem 0;
  justify-content: center;
}
.add-rating .stars .star img {
  width: 100px;
  cursor: pointer;
}
</style>
