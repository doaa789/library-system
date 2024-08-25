<template>
  <v-container>
    <!-- Field to filter records by date -->
    <v-text-field v-model="filterDate" label="Filter by Date" type="date"></v-text-field>
    
    <!-- Table displaying the records -->
    <v-data-table :items="filteredHistory" :headers="headers">
      <!-- Column for the date -->
      <template v-for="(item, index) in filteredHistory" :key="index">
        <tr>
          <td>{{ item.date }}</td>
          <td>{{ item.totalBooks }}</td>
          <td>
            <v-chip :color="item.status === 'Borrowed' ? 'green' : 'blue'">
              {{ item.status }}
            </v-chip>
          </td>
          <td>
            <!-- Button to change the loan status to "Returned" -->
            <v-btn v-if="canMarkAsReturned(item)" @click="markAsReturned(item)">Mark as Returned</v-btn>
          </td>
          <td>
            <!-- Button to view borrowed books -->
            <v-btn @click="showBooksDialog(item.books)">View Books</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    
    <!-- Dialog to display details of borrowed books -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>Borrowed Books</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(book, index) in dialogBooks" :key="index">
              <v-list-item-content class="d-flex align-center justify-space-evenly">
                <v-img :src="book.image" alt="Book Image" max-width="80" />
                <div class="ml-2">
                  <v-list-item-title>title : {{ book.title }}</v-list-item-title>
                  <v-list-item-subtitle>author :{{ book.author }}</v-list-item-subtitle>
                  <v-list-item-subtitle>description : {{ book.description }}</v-list-item-subtitle>
                  <v-list-item-subtitle>selectedPeriod :{{ book.selectedPeriod }}</v-list-item-subtitle>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Retrieve borrowing history from local storage or set to an empty array
      borrowingHistory: JSON.parse(localStorage.getItem('borrowingHistory')) || [],
      filterDate: '', // Date filter
      dialog: false, // Dialog state
      dialogBooks: [], // Books displayed in the dialog
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Total Books', value: 'totalBooks' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: 'View Books', value: 'viewBooks', sortable: false },
      ],
    };
  },
  computed: {
    // Filter records by the selected date
    filteredHistory() {
      if (!this.filterDate) return this.borrowingHistory;
      return this.borrowingHistory.filter(item => item.date === this.filterDate);
    },
  },
  methods: {
    // Check if the loan status can be changed to "Returned"
    canMarkAsReturned(item) {
      const today = new Date();
      const returnDate = new Date(item.books[0].selectedPeriod);
      return today > returnDate && item.status === 'Borrowed';
    },
    // Change the loan status to "Returned"
    markAsReturned(item) {
      item.status = 'Returned';
      localStorage.setItem('borrowingHistory', JSON.stringify(this.borrowingHistory));
    },
    // Show dialog for borrowed books
    showBooksDialog(books) {
      this.dialogBooks = books;
      this.dialog = true;
    },
  },
};
</script>