<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>
        <router-link to="/">
          <el-button icon="el-icon-caret-left">Back</el-button>
        </router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>Health Page</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>Allergy Information</h2>
    <el-card>
      <div>
        <div
          v-if="AllergyInformation.length === 0"
          style="
            padding: 20px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            margin-bottom: 10px;
          "
        >
          Loading...
        </div>
        <div v-else-if="AllergyInformation.length > 0">
          <div
            v-for="item in AllergyInformation"
            :key="item.id"
            style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px"
          >
            <div style="font-weight: bold">{{ item["Food Item"] }}</div>
            <div>{{ item["Allergy Information"] }}</div>
          </div>
        </div>
        <div
          v-else
          style="
            padding: 20px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            margin-bottom: 10px;
          "
        >
          No allergy information available.
        </div>
      </div>
    </el-card>
    <el-divider></el-divider>
    <div>
      <h2>Food Handling Advice</h2>
      <el-main>
        <el-loading
          v-if="loading"
          text="Loading..."
          :fullscreen="false"
        ></el-loading>

        <div v-if="error">
          <el-alert title="Error" type="error" show-icon>
            Error fetching advice
          </el-alert>
        </div>
        <div v-if="advice && advice.length > 0">
          <el-card v-for="(item, index) in advice" :key="index">
            <div slot="header">
              <strong>Food Items:</strong> {{ item["Food Item"] }}
            </div>
            <p>
              <strong>Handling Advice:</strong> {{ item["Handling Advice"] }}
            </p>
          </el-card>
        </div>
        <div v-if="advice && advice.length === 0 && !loading">
          <el-alert title="No Advice" type="info" show-icon>
            No health advice available.
          </el-alert>
        </div>
      </el-main>
    </div>
    <el-divider></el-divider>
    <div>
      <h2>Healthier Eating Alternatives</h2>
      <el-main>
        <el-loading
          v-if="loading"
          text="Loading..."
          :fullscreen="false"
        ></el-loading>

        <div v-if="error">
          <el-alert title="Error" type="error" show-icon>
            Error fetching healthier alternatives
          </el-alert>
        </div>

        <div v-if="alternatives && alternatives.length > 0">
          <el-card v-for="(item, index) in alternatives" :key="index">
            <div slot="header">
              <strong>Food Item:</strong> {{ item["Food Item"] }}
            </div>
            <p>
              <strong>Healthy Alternative:</strong>
              {{ item["Healthy Alternative"] }}
            </p>
          </el-card>
        </div>

        <div v-if="alternatives && alternatives.length === 0 && !loading">
          <el-alert title="No Alternatives" type="info" show-icon>
            No healthier alternatives available.
          </el-alert>
        </div>
      </el-main>
    </div>
    <el-divider></el-divider>
    <div>
      <h2>Healthy Eating Advice</h2>
      <el-main>
        <el-loading
          v-if="loading"
          text="Loading..."
          :fullscreen="false"
        ></el-loading>

        <div v-if="error">
          <el-alert title="Error" type="error" show-icon>
            Error fetching healthy eating advice
          </el-alert>
        </div>

        <div v-if="eating_advice">
          <el-card>
            <div slot="header">
              <strong>Healthy Eating Advice:</strong>
            </div>
            <p>{{ eating_advice }}</p>
          </el-card>
        </div>

        <div v-if="!eating_advice && !loading">
          <el-alert title="No Advice" type="info" show-icon>
            No healthy eating advice available.
          </el-alert>
        </div>
      </el-main>
    </div>
    <el-divider></el-divider>
    <div>
      <h2>Healthy Items Usage</h2>
      <el-main>
        <el-loading
          v-if="loading"
          text="Loading..."
          :fullscreen="false"
        ></el-loading>

        <div v-if="error">
          <el-alert title="Error" type="error" show-icon>
            Error fetching healthy items usage suggestions
          </el-alert>
        </div>

        <div v-if="suggestions && suggestions.length > 0">
          <el-card v-for="(item, index) in suggestions" :key="index">
            <div slot="header">
              <strong>{{ item["Food Item"] }}</strong>
            </div>
            <p><strong>Suggestion:</strong> {{ item.Suggestion }}</p>
          </el-card>
        </div>

        <div v-if="!suggestions && !loading">
          <el-alert title="No Suggestions" type="info" show-icon>
            No healthy items usage suggestions available.
          </el-alert>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AllergyInformation: [],
      advice: [],
      eating_advice: "", // Updated property name
      alternatives: [],
      suggestions: [],
      loading: false,
      error: false,
    };
  },
  mounted() {
    // Call the API endpoints to get data
    this.getAllergyInformation();
    this.getAdvice();
    this.getHealthierAlternatives();
    this.getHealthyEatingAdvice();
    this.getHealthyItemsUsage();
    // this.getNutritionalAnalysis();
    // this.getHealthyItems();
    // this.getHealthAdvice();
  },
  methods: {
    async getAllergyInformation() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8081/allergy-information-using-json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data:", data); // Log the received data

        this.AllergyInformation = data.allergy_information_list || [];
        console.log("Allergy_Information", this.AllergyInformation);
      } catch (error) {
        console.error("Error fetching allergy information:", error);
      }
    },
    async getAdvice() {
      try {
        // Make the API request
        const response = await fetch(
          "http://127.0.0.1:8081/food-handling-advice-using-json"
        );

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Check if the response contains the expected property
        if (data && data.Health_Advice) {
          this.advice = data.Health_Advice;
        } else {
          this.advice = [];
          console.error("Health_Advice not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching advice:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    async getHealthierAlternatives() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8081/healthier-alternatives-using-json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        // Corrected property name here
        if (data && data.Food_Suggestions_With_Alternatives) {
          this.alternatives = data.Food_Suggestions_With_Alternatives;
          console.log("Food_Suggestions_With_Alternatives", this.alternatives);
        } else {
          this.alternatives = [];
          console.error("Healthy_alternatives not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching healthier alternatives:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    async getHealthyEatingAdvice() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8081/healthy-eating-advice-using-json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Healthy_Eating_Advice) {
          this.eating_advice = data.Healthy_Eating_Advice;
          console.log("Healthy_Eating_Advice", this.eating_advice);
        } else {
          this.eating_advice = "";
          console.error("Healthy_Eating_Advice not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching healthy eating advice:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    async getHealthyItemsUsage() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8081/healthy-items-usage-using-json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Healthy_Items_Usage) {
          this.suggestions = data.Healthy_Items_Usage;
          console.log("Healthy_Items_Usage", this.suggestions);
        } else {
          this.suggestions = [];
          console.error("Healthy_Items_Usage not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching healthy items usage suggestions:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
.el-button {
  border: 0px solid;
}
h2 {
  display: flex;
  justify-content: space-around;
}
.el-breadcrumb {
  font-size: 14px;
  line-height: 3;
}
</style>
