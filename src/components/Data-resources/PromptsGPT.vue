<template>
  <div>
    <section class="section">
      <h2 class="section-header">Fun Facts</h2>
      <div v-if="funFacts.length > 0">
        <el-row
          :gutter="20"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            v-for="(fact, index) in funFacts"
            :key="index"
            style="margin-top: 10px; width: 100%"
          >
            <el-card class="card" :body-style="{ height: 'auto' }">
              <p class="card-text">
                <strong>Food Item:</strong> {{ fact["Food Item"] }}
              </p>
              <p class="card-text">
                <strong>Fun Facts:</strong> {{ fact["Fun Facts"] }}
              </p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>

    <section class="section">
      <h2 class="section-header">Cooking Tips</h2>
      <div v-for="tip in cookingTips" :key="tip.Prompt" class="tip">
        <h3>{{ tip.Prompt }}</h3>
        <p>{{ tip["Cooking Tip"] }}</p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-header">Current Trends</h2>
      <div v-for="fact in currentTrends" :key="fact.Prompt" class="trend">
        <h3>{{ fact.Prompt }}</h3>
        <p>{{ fact["Fun Facts"] }}</p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-header">Health Advice</h2>
      <div v-for="advice in healthAdvice" :key="advice.Prompt" class="advice">
        <h3>{{ advice.Prompt }}</h3>
        <p>{{ advice["Health Advice"] }}</p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-header">Specific Food Suggestions</h2>
      <div
        v-for="suggestion in specificFoodSuggestions"
        :key="suggestion['Food Item']"
        class="suggestion"
      >
        <h3>{{ suggestion["Food Item"] }}</h3>
        <p>{{ suggestion.Suggestion }}</p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-header">User Defined Dish Fun Facts</h2>
      <div>
        <el-card
          v-for="(fact, index) in funFacts"
          :key="index"
          class="fun-fact-card"
        >
          <div slot="header" class="fun-fact-header">{{ fact.Prompt }}</div>
          <div>{{ fact["Fun Facts"] }}</div>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookingTips: [],
      currentTrends: [],
      healthAdvice: [],
      specificFoodSuggestions: [],
      funFacts: [],
    };
  },
  mounted() {
    this.getFunFacts();
    this.fetchCookingTips();
    this.fetchCurrentTrends();
    this.fetchHealthAdvice();
    this.fetchSpecificFoodSuggestions();
    this.fetchUserDefinedDish();
  },
  methods: {
    async fetchUserDefinedDish() {
      try {
        const response = await fetch(
          "http://http://127.0.0.1:8081/user-defined-dish"
        ); // Replace with your server URL
        const data = await response.json();
        this.funFacts = data.user_defined;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    getFunFacts() {
      fetch("http://127.0.0.1:8081/get_fun_facts")
        .then((response) => response.json())
        .then((data) => {
          this.funFacts = data.fun_facts;
        })
        .catch((error) => console.error("Error fetching fun facts:", error))
        .finally(() => {});
    },
    async fetchCookingTips() {
      // Make an HTTP request to "/cooking-tips" endpoint and set the response to this.cookingTips
      const response = await fetch("http://127.0.0.1:8081/cooking-tips");
      const data = await response.json();
      this.cookingTips = data.cooking_tips;
    },
    async fetchCurrentTrends() {
      // Make an HTTP request to "/current-trends" endpoint and set the response to this.currentTrends
      const response = await fetch("http://127.0.0.1:8081/current-trends");
      const data = await response.json();
      this.currentTrends = data.current_trends;
    },
    async fetchHealthAdvice() {
      // Make an HTTP request to "/health-advice" endpoint and set the response to this.healthAdvice
      const response = await fetch("http://127.0.0.1:8081/health-advice");
      const data = await response.json();
      this.healthAdvice = data.health_advice;
    },
    async fetchSpecificFoodSuggestions() {
      // Make an HTTP request to "/specific-food-suggestion" endpoint and set the response to this.specificFoodSuggestions
      const response = await fetch(
        "http://127.0.0.1:8081/specific-food-suggestion"
      );
      const data = await response.json();
      this.specificFoodSuggestions = data.specific_food_suggestions;
    },
  },
};
</script>

<style scoped>
/* Your component-specific styles go here */

.section {
  margin-bottom: 30px;
}

.section-header {
  font-size: 35px;
  margin-bottom: 35px;
  color: mediumblue;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-text {
  margin: 0;
}

.tip,
.trend,
.advice,
.suggestion {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tip h3,
.trend h3,
.advice h3,
.suggestion h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.tip p,
.trend p,
.advice p,
.suggestion p {
  margin: 0;
  color: #555;
}
</style>
