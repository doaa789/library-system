<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Library System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/cart">Cart</v-btn>
      <v-btn text to="/checkout">CheckOut</v-btn>

      <!-- Profile Dropdown -->
      <v-menu offset-y right>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="goToHome">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToHistory">
            <v-list-item-title>Borrowing History</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-col class="text-center">&copy; 2024 Library System</v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    goToHistory() {
      this.$router.push('/history');
    }
  }
};
</script>


