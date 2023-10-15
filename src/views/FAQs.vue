<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>
        <router-link to="/">
          <el-button icon="el-icon-caret-left">Back</el-button>
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-header style="margin-top: 50px">FAQs</el-header>
      <el-main>
        <el-collapse v-model="activeName">
          <el-collapse-item
            v-for="(item, index) in faqs"
            :key="index"
            :title="item.question"
            :name="index"
          >
            {{ item.answer }}
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      faqs: [
        {
          question: "What is Element UI?",
          answer:
            "Element UI is a Vue-based UI library that provides a set of high-quality UI components.",
        },
        {
          question: "How to install Element UI?",
          answer:
            "You can install Element UI using npm: npm install element-ui.",
        },
        {
          question: "What are the features of Element UI?",
          answer:
            "Element UI has a wide range of UI components such as Button, Input, Dialog, Tabs, Table, etc.",
        },
      ],
    };
  },
};
</script>
<style></style>
