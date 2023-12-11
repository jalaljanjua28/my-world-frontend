<template>
  <div>
    <button @click="deleteAllItems">Delete All Items</button>
  </div>
</template>

<script>
export default {
  methods: {
    deleteAllItems() {
      // Make an HTTP POST request to your Flask backend
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/deleteAll/Master", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server if needed
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
      location.reload();
    },
  },
};
</script>
