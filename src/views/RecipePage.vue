<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>
        <router-link to="/">
          <el-button icon="el-icon-caret-left">Back</el-button>
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="recipes.length > 0" id="recipesContainer">
      <h2>Generated Recipes</h2>
      <div v-for="(recipe, index) in recipes" :key="index">
        <h3>Group of Items: {{ recipe["Group of Items"].join(", ") }}</h3>
        <p>Generated Recipe: {{ recipe["Generated Recipe"] }}</p>
      </div>
    </div>
    <el-button @click="fetchRecipes" class="fetch-button" type="success"
      >Fetch Recipes</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [],
    };
  },
  methods: {
    fetchRecipes() {
      fetch("http://127.0.0.1:8081/recipes-using-gpt")
        .then((response) => response.json())
        .then((data) => {
          this.recipes = data.recipes; // Corrected line
        })
        .catch((error) => console.error("Error fetching recipes:", error));
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
.fetch-button {
  margin-top: 30px !important;
}
/* .el-button--primary {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
} */
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  /* background: none; */
  border: 0px solid #dcdfe6;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  padding: 11px 10px;
}
</style>
