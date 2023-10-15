<template>
  <div>
    <el-breadcrumb-item>
      <router-link to="/">
        <el-button icon="el-icon-caret-left">Back</el-button>
      </router-link>
    </el-breadcrumb-item>
    <el-row class="recipe-page">
      <el-col :span="8" v-for="recipe in recipes" :key="recipe.id">
        <el-card class="recipe-item">
          <img :src="recipe.image" class="recipe-item-image" />
          <div class="recipe-item-content">
            <h3 class="recipe-item-title">{{ recipe.title }}</h3>
            <p class="recipe-item-description">{{ recipe.description }}</p>
            <h4 class="recipe-item-ingredients-title">Ingredients:</h4>
            <ul class="recipe-item-ingredients">
              <li v-for="ingredient in recipe.ingredients" :key="ingredient">
                {{ ingredient }}
              </li>
            </ul>
            <h4 class="recipe-item-instructions-title">Instructions:</h4>
            <ol class="recipe-item-instructions">
              <li v-for="instruction in recipe.instructions" :key="instruction">
                {{ instruction }}
              </li>
            </ol>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [
        {
          id: 1,
          title: "Recipe 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "https://via.placeholder.com/400x200",
          ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
          instructions: ["Instruction 1", "Instruction 2", "Instruction 3"],
        },
        {
          id: 2,
          title: "Recipe 2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "https://via.placeholder.com/400x200",
          ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
          instructions: ["Instruction 1", "Instruction 2", "Instruction 3"],
        },
        {
          id: 3,
          title: "Recipe 3",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "https://via.placeholder.com/400x200",
          ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
          instructions: ["Instruction 1", "Instruction 2", "Instruction 3"],
        },
      ],
    };
  },
};
</script>

<style scoped>
.recipe-page {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: row;
}

.recipe-item {
  height: 650px;
}

.recipe-item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-item-content {
  padding: 20px;
}

.recipe-item-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.recipe-item-description {
  font-size: 16px;
  margin-bottom: 20px;
}

.recipe-item-ingredients-title,
.recipe-item-instructions-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.recipe-item-ingredients {
  list-style-type: none;
  padding: 0;
}

.recipe-item-ingredients li {
  font-size: 16px;
  margin-bottom: 10px;
}

.recipe-item-instructions {
  font-size: 16px;
}

.recipe-item-instructions li {
  margin-bottom: 10px;
}
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: none;
  border: 0px solid #dcdfe6;
  color: #606266;
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
