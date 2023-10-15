<template>
  <div v-if="loading" class="loading-container">
    <div class="loading-content">
      <p class="loading-text">Loading...</p>
    </div>
  </div>
</template>

<style>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
}

.loading-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-text {
  font-size: 20px;
  font-weight: bold;
}
</style>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>
