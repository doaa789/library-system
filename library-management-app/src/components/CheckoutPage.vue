<template>
  <v-container class="pa-4 d-flex justify-center" max-width="1000px">
    <v-card outlined class="w-100 mt-11">
      <v-stepper v-model="step" class="elevation-0">
        <!-- Header as Stepper with Circles -->
        <v-stepper-header class="header-height">
          <!-- Step 1 -->
          <v-stepper-step
            :complete="step > 1"
            :step="1"
            class="d-flex align-center step-item"
            :class="{ 'current-step': step === 1 }"
          >
            <v-avatar
              size="40"
              class="mr-3"
              :color="step >= 1 ? 'primary' : 'grey lighten-2'"
            >
              <span :class="step >= 1 ? 'white--text' : 'black--text'">{{ 1 }}</span>
            </v-avatar>
            Personal Info
          </v-stepper-step>
          <v-divider class="step-divider"></v-divider>
          <!-- Step 2 -->
          <v-stepper-step
            :complete="step > 2"
            :step="2"
            class="d-flex align-center step-item"
            :class="{ 'current-step': step === 2 }"
          >
            <v-avatar
              size="40"
              class="mr-3"
              :color="step >= 2 ? 'primary' : 'grey lighten-2'"
            >
              <span :class="step >= 2 ? 'white--text' : 'black--text'">{{ 2 }}</span>
            </v-avatar>
            Card Info
          </v-stepper-step>
          <v-divider class="step-divider"></v-divider>
          <!-- Step 3 -->
          <v-stepper-step
            :complete="step > 3"
            :step="3"
            class="d-flex align-center step-item"
            :class="{ 'current-step': step === 3 }"
          >
            <v-avatar
              size="40"
              class="mr-3"
              :color="step >= 3 ? 'primary' : 'grey lighten-2'"
            >
              <span :class="step >= 3 ? 'white--text' : 'black--text'">{{ 3 }}</span>
            </v-avatar>
            Summary
          </v-stepper-step>
        </v-stepper-header>

        <!-- Stepper Items -->
        <v-stepper-items>
          <!-- Step 1: Personal Information -->
          <v-stepper-content :step="1" v-if="step === 1">
            <v-card-text>
              <v-text-field
                v-model="personalInfo.name"
                label="Name"
                outlined
                dense
                :rules="[v => !!v || 'Name is required', v => /^[a-zA-Z\s]+$/.test(v) || 'Name must contain only letters']"
                class="my-2"
                placeholder="Enter your name"
              ></v-text-field>
              <v-text-field
                v-model="personalInfo.email"
                label="Email"
                outlined
                dense
                :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
                class="my-2"
                placeholder="Enter your email"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" @click="step++" :disabled="!isStep1Complete">Next</v-btn>
            </v-card-actions>
          </v-stepper-content>

          <!-- Step 2: Library Card Information -->
          <v-stepper-content :step="2" v-if="step === 2">
            <v-card-text>
              <v-text-field
                v-model="libraryCard.name"
                label="Full Name"
                outlined
                dense
                :rules="[v => !!v || 'Full Name is required', v => /^[a-zA-Z\s]+$/.test(v) || 'Full Name must contain only letters']"
                class="my-2"
                placeholder="Enter your full name"
              ></v-text-field>
              <v-text-field
                v-model="libraryCard.number"
                label="Library Card Number"
                outlined
                dense
                :rules="[v => !!v || 'Library Card Number is required', v => /^\d+$/.test(v) || 'Library Card Number must be numeric']"
                class="my-2"
                placeholder="Enter your library card number"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-space-between">
              <v-btn color="secondary" @click="step--">Previous</v-btn>
              <v-btn color="primary" @click="step++" :disabled="!isStep2Complete">Next</v-btn>
            </v-card-actions>
          </v-stepper-content>

          <!-- Step 3: Summary & Confirmation -->
          <v-stepper-content :step="3" v-if="step === 3">
            <v-card-text>
              <h3 class="summary-title">Summary</h3>
              <v-divider class="mb-3"></v-divider>
              <p><strong>Name:</strong> {{ personalInfo.name }}</p>
              <p><strong>Email:</strong> {{ personalInfo.email }}</p>
              <p><strong>Library Card:</strong> {{ libraryCard.number }}</p>
              <p><strong>Total Books:</strong> {{ cart.length }}</p>
              <v-list dense>
                <v-list-item v-for="(book, index) in cart" :key="index">
                  <v-list-item-content>
                    <span class="book-title">{{ book.title }}</span>
                    <span class="due-date"> - Due Date: {{ getReturnDate(book.selectedPeriod) }}</span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="justify-space-between">
              <v-btn color="secondary" @click="step--">Previous</v-btn>
              <v-btn color="success" @click="confirmBorrowing">Confirm</v-btn>
            </v-card-actions>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  setup() {
    const router = useRouter(); // Initialize router
    const step = ref(1); // Current step in the stepper
    const personalInfo = ref({ // Personal information object
      name: '',
      email: '',
    });
    const libraryCard = ref({ // Library card information object
      name: '',
      number: '',
    });
    const cart = ref(JSON.parse(localStorage.getItem('cart')) || []); // Cart items from local storage

    const getReturnDate = (period) => { // Function to calculate return date based on selected period
      if (!period) return '';

      const today = new Date();
      let daysToAdd = 0;

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

      const returnDate = new Date(today.setDate(today.getDate() + daysToAdd));
      return returnDate.toDateString(); // Return formatted date
    };

    const confirmBorrowing = () => { // Function to confirm borrowing books
      if (confirm('Do you want to confirm borrowing these books?')) {
        localStorage.setItem(
          'borrowingHistory',
          JSON.stringify([
            ...(JSON.parse(localStorage.getItem('borrowingHistory')) || []),
            {
              date: new Date().toDateString(),
              totalBooks: cart.value.length,
              books: cart.value,
              status: 'Borrowed',
            },
          ])
        );
        localStorage.removeItem('cart'); // Clear cart after borrowing
        router.push('/'); // Navigate to home page
        alert('Books borrowed successfully!'); // Alert user of success
      }
    };

    const isStep1Complete = computed(() => { // Check if step 1 is complete
      return personalInfo.value.name && personalInfo.value.email;
    });

    const isStep2Complete = computed(() => { // Check if step 2 is complete
      return libraryCard.value.name && libraryCard.value.number;
    });

    return {
      step,
      personalInfo,
      libraryCard,
      cart,
      getReturnDate,
      confirmBorrowing,
      isStep1Complete,
      isStep2Complete,
    };
  },
};
</script>

<style scoped>
.header-height {
  height: 100px; /* Increased height for better spacing */
  align-items: center; /* Center items vertically */
  padding: 16px 0; /* Added padding for top and bottom */
}

.step-item {
  transition: width 0.3s ease;
  min-width: 25%;
  justify-content: center;
  flex: 1; /* Allow step items to take up remaining space */
}

.current-step {
  flex: 2; /* Make the current step wider */
}

.step-divider {
  width: 2px; /* Decrease the width of the divider */
}

.summary-title {
  font-size: 1.5em; /* Increased font size for the title */
  font-weight: bold; /* Bold title */
  margin-bottom: 10px; /* Spacing below the title */
}

.book-title {
  font-weight: 600; /* Semi-bold for book title */
}

.due-date {
  color: grey; /* Grey color for due date */
  font-style: italic; /* Italic style for due date */
}
</style>