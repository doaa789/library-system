<template>
    <v-container>
      <v-row>
        <v-col v-for="book in books" :key="book.id" cols="12" sm="3" md="3">
          <v-card class="mt-12">
            <v-img :src="book.image" height="200px" class="mx-auto"></v-img>
            <v-card-title class="text-center">{{ book.title }}</v-card-title>
            <v-card-subtitle class="text-center">{{ book.author }}</v-card-subtitle>
            <v-card-text class="text-center">{{ book.description }}</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn border="primary lg" class="text-primary" @click="addToCart(book)">Borrow Book</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn class="bg-primary" @click="goToCart">Go to Cart</v-btn>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        books: [
          // Book data with id, image, title, author, and description
          {
            id: 1,
            image: require('../assets/book1.jpg'),
            title: 'Book 1',
            author: 'Author 1',
            description: 'Description of book 1',
          },
          {
            id: 2,
            image: require('../assets/book2.jpg'),
            title: 'Book 2',
            author: 'Author 2',
            description: 'Description of book 2',
          },
          {
            id: 3,
            image: require('../assets/book3.jpg'),
            title: 'Book 3',
            author: 'Author 3',
            description: 'Description of book 3',
          },
          {
            id: 4,
            image: require('../assets/book4.jpg'),
            title: 'Book 4',
            author: 'Author 4',
            description: 'Description of book 4',
          },
          {
            id: 5,
            image: require('../assets/book5.png'),
            title: 'Book 5',
            author: 'Author 5',
            description: 'Description of book 5',
          }
          // add more books here
        ],
      };
    },
    methods: {
      // Adds a book to the cart in local storage
      addToCart(book) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ ...book, selectedPeriod: null }); 
        localStorage.setItem('cart', JSON.stringify(cart));
      },
      // Navigates to the cart page
      goToCart() {
        this.$router.push('/cart');
      },
    },
  };
  </script>