<template>
    <v-container>
      <v-row>

        <v-col>
          <v-row>
              <v-col class="text-h6"> List of selected books</v-col>
              <v-col class="text-h6">Total number : {{ cart.length }}</v-col>
          </v-row>
        </v-col>

        <v-col v-for="book in cart" :key="book.id" cols="12">
          <v-card>
            <v-row>
              <v-col>
                <v-img :src="book.image" height="100px"></v-img>
              </v-col>
              <v-col>
                <v-card-title>{{ book.title }}</v-card-title>
                <v-card-subtitle>{{ book.author }}</v-card-subtitle>
                <v-card-text>{{ book.description }}</v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col>
          <v-select
              v-model="selectedPeriod"
              :items="borrowingPeriods"
              label="Borrowing Period"
            ></v-select>
            <v-card-text>Return Date: {{ getReturnDate(selectedPeriod) }}</v-card-text>
        </v-col>

      </v-row>

      <v-checkbox v-model="agreed" label="Agree to terms and conditions"></v-checkbox>
      <v-btn  class="bg-primary" :disabled="!agreed" @click="checkout">Proceed to Checkout</v-btn>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedPeriod: null, // Selected borrowing period
        cart: JSON.parse(localStorage.getItem('cart')) || [], // Cart items from local storage
        borrowingPeriods: ['1 week', '2 weeks', '1 month'], // Available borrowing periods
        agreed: false, // Agreement checkbox state
      };
    },
    methods: {
      getReturnDate(period) {
        if (!period) return ''; // Return empty if no period is selected
  
        const today = new Date();
        let daysToAdd = 0; // Days to add based on selected period
  
        switch (period) {
          case '1 week':
            daysToAdd = 7;
            break;
          case '2 weeks':
            daysToAdd = 14;
            break;
          case '1 month':
            daysToAdd = 30;
            break;
        }
  
        today.setDate(today.getDate() + daysToAdd); // Calculate return date
        const returnDate = today;

        // Only update selectedPeriod in the cart if it's not null
        if (this.selectedPeriod) {
          const updatedCart = this.cart.map(book => ({
            ...book,
            selectedPeriod: this.selectedPeriod // Update selected period for each book
          }));
          localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to local storage
        }
        
        return returnDate.toDateString(); // Return formatted date
      },
      checkout() {
        this.$router.push('/checkout'); // Navigate to checkout page
      },
      
    },
  };
  </script>