<template>
  <div style="display: grid">
    <!-- Ethical Eating Suggestions Section -->
    <el-button
      @click="getEthicalEatingSuggestions"
      type="primary"
      class="custom-button"
    >
      Get Suggestions
    </el-button>
    <el-divider></el-divider>
    <el-card
      v-for="(group, index) in ethicalEatingSuggestions"
      :key="index"
      class="group-card"
    >
      <div slot="header">
        <h3>Group {{ index + 1 }}</h3>
      </div>
      <p>
        <strong>Ingredients:</strong>
        {{ group["Group of Items"].join(", ") }}
      </p>
      <p>
        <strong>Ethical Eating Suggestions:</strong>
        {{ group["Ethical Eating Suggestions"] }}
      </p>
    </el-card>
    <el-alert v-if="error" title="Error" type="error">{{ error }}</el-alert>
    <!-- Jokes Section -->
    <el-button @click="getJokes" type="primary" class="custom-button">
      Get Jokes
    </el-button>
    <el-divider></el-divider>
    <div v-if="jokes.length > 0">
      <el-card v-for="(joke, index) in jokes" :key="index" class="joke-card">
        <div slot="header">
          <strong>{{ joke.Prompt }}</strong>
        </div>
        <p>{{ joke["Food Joke"] }}</p>
      </el-card>
    </div>
    <el-alert v-if="errorMessage" title="Error" type="error">{{
      errorMessage
    }}</el-alert>
    <!-- Fun Facts Section -->
    <el-button @click="getFunFacts" type="primary" class="custom-button">
      Get Fun Facts
    </el-button>
    <el-divider></el-divider>
    <div v-if="funFacts && funFacts.length > 0">
      <el-row :gutter="20" class="card-container">
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(fact, index) in funFacts"
          :key="index"
        >
          <el-card class="card" :body-style="{ height: 'auto' }">
            <div slot="header">
              <h3>{{ fact["Food Item"] }}</h3>
            </div>
            <p class="card-text">
              <strong>Fun Facts:</strong> {{ fact["Fun Facts"] }}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- Cooking Tips Section -->
    <el-button @click="getCookingTips" type="primary" class="custom-button">
      Get Cooking Tips
    </el-button>
    <el-divider></el-divider>
    <el-main>
      <el-loading
        v-if="loading"
        text="Loading..."
        :fullscreen="false"
      ></el-loading>
      <div v-if="error">
        <el-alert title="Error" type="error" show-icon>
          Error fetching cooking tips
        </el-alert>
      </div>
      <div v-if="cookingTips && cookingTips.length > 0">
        <el-card v-for="(tip, index) in cookingTips" :key="index">
          <div slot="header">
            <strong>{{ tip.Prompt }}</strong>
          </div>
          <p>{{ tip["Cooking Tip"] }}</p>
        </el-card>
      </div>
      <div v-if="!cookingTips && !loading">
        <el-alert title="No Cooking Tips" type="info" show-icon>
          No cooking tips available.
        </el-alert>
      </div>
    </el-main>
    <!-- Current Trends Section -->
    <el-button @click="getCurrentTrends" type="primary" class="custom-button">
      Get Current Trends
    </el-button>
    <el-divider></el-divider>
    <el-main>
      <el-loading
        v-if="loading"
        text="Loading..."
        :fullscreen="false"
      ></el-loading>
      <div v-if="error">
        <el-alert title="Error" type="error" show-icon>
          Error fetching current food trends
        </el-alert>
      </div>
      <div v-if="currentTrends && currentTrends.length > 0">
        <el-card v-for="(trend, index) in currentTrends" :key="index">
          <div slot="header">
            <strong>{{ trend.Prompt }}</strong>
          </div>
          <p>{{ trend["Fun Facts"] }}</p>
        </el-card>
      </div>
      <div v-if="!currentTrends && !loading">
        <el-alert title="No Fun Facts" type="info" show-icon>
          No current food trends available.
        </el-alert>
      </div>
    </el-main>
    <!-- Food Waste Reduction Suggestions Section -->
    <el-button
      @click="getFoodWasteReductionSuggestions"
      type="primary"
      class="custom-button"
    >
      Get Food Waste Reduction Suggestions
    </el-button>
    <el-divider></el-divider>
    <div
      v-if="
        foodWasteReductionSuggestions &&
        foodWasteReductionSuggestions.length > 0
      "
    >
      <el-row :gutter="20" class="card-container">
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(suggestion, index) in foodWasteReductionSuggestions"
          :key="index"
        >
          <el-card class="card" :body-style="{ height: 'auto' }">
            <div slot="header">
              <h3>Food Waste Reduction Prompt</h3>
            </div>
            <p class="card-text">
              <strong>Food Waste Reduction Suggestion:</strong>
              {{ suggestion["Food Waste Reduction Suggestion"] }}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- Mood Changer Section -->
    <el-button
      @click="getFoodSuggestions"
      type="primary"
      class="mood-changer custom-button"
    >
      Get Food Suggestions
    </el-button>
    <el-form :model="form" label-width="80px">
      <el-form-item label="User Mood">
        <el-input v-model="form.userMood"></el-input>
      </el-form-item>
      <el-form-item>
        <el-card v-if="foodSuggestions.length > 0">
          <h2 slot="header">Food Suggestions</h2>
          <el-list>
            <el-list-item
              v-for="(suggestion, index) in foodSuggestions"
              :key="index"
            >
              {{ suggestion["Food Suggestion"] }}
            </el-list-item>
          </el-list>
        </el-card>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jokes: [],
      errorMessage: "",
      funFacts: [],
      cookingTips: [],
      loading: false,
      error: false,
      currentTrends: [],
      form: {
        userMood: "",
      },
      foodSuggestions: [],
      ethicalEatingSuggestions: [],
      foodWasteReductionSuggestions: [],
    };
  },
  mounted() {
    // this.getFunFacts();
    // this.fetchCookingTips();
    // this.fetchCurrentTrends();
  },
  methods: {
    async getEthicalEatingSuggestions() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8081/ethical-eating-suggestion-using-json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.ethicalEatingSuggestions = data.Ethical_Eating_Suggestions;
        this.error = null;

        // Debugging: Log the data received
        console.log("Data Received:", data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        this.error = "Error fetching suggestions. Please try again.";
      }
    },
    getFoodSuggestions() {
      // Your API endpoint to initiate the GPT prompt
      const apiEndpoint = "http://127.0.0.1:8081/mood-changer-using-json";

      // Make a GET request to your API using fetch
      fetch(`${apiEndpoint}?user_mood=${this.form.userMood}`)
        .then((response) => response.json())
        .then((data) => {
          // Update the foodSuggestions with the API response
          this.foodSuggestions = data.food_suggestions_list;
        })
        .catch((error) => {
          console.error("Error fetching food suggestions:", error);
        });
    },
    async getFunFacts() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8081/get-fun-facts-using-json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Full Response:", data);
        this.funFacts = data.Fun_Facts || [];
      } catch (error) {
        console.error("Error fetching fun facts:", error);
        this.errorMessage = "Error fetching fun facts. Please try again.";
      }
    },

    async getCookingTips() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8081/cooking-tips-using-json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Cooking_Tips) {
          this.cookingTips = data.Cooking_Tips;
          console.log("Cooking Tips", this.cookingTips);
        } else {
          this.cookingTips = [];
          console.error("Cooking Tips not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching cooking tips:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async getJokes() {
      // Make a request to your backend endpoint
      fetch(" http://127.0.0.1:8081/jokes-using-json")
        .then((response) => response.json())
        .then((data) => {
          if (data.jokes) {
            this.jokes = data.jokes;
          } else {
            this.errorMessage = "Error retrieving jokes.";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Error retrieving jokes.";
        });
    },
    async getFoodWasteReductionSuggestions() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8081/food-waste-reduction-using-json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Full Response:", data);
        this.foodWasteReductionSuggestions =
          data.Food_Waste_Reduction_Suggestions || [];
      } catch (error) {
        console.error(
          "Error fetching food waste reduction suggestions:",
          error
        );
        this.errorMessage =
          "Error fetching food waste reduction suggestions. Please try again.";
      }
    },
    async getCurrentTrends() {
      try {
        this.loading = true;

        const response = await fetch(
          "http://127.0.0.1:8081/current-trends-using-json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Current_Trends) {
          this.currentTrends = data.Current_Trends;
          console.log("Current Trends", this.currentTrends);
        } else {
          this.currentTrends = [];
          console.error("Current Trends not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching current trends:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.custom-button {
  margin-bottom: 20px;
  background-color: #409eff; /* Button background color */
  color: #fff; /* Text color */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.custom-button:hover {
  background-color: #66b1ff; /* Button background color on hover */
}

.group-card,
.joke-card,
.card-container,
.card {
  margin-top: 20px;
}

.mood-changer {
  margin-top: 40px;
}
.el-button {
  margin-top: 20px;
}
</style>
