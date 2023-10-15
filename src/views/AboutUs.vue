<template>
  <div>
    <el-breadcrumb-item>
      <router-link to="/">
        <el-button icon="el-icon-caret-left">Back</el-button>
      </router-link>
    </el-breadcrumb-item>
    <el-container class="profile-page">
      <el-header>
        <h1 class="header-title">{{ companyName }}</h1>
      </el-header>
      <el-main>
        <el-row :gutter="20" style="margin-top: 30px">
          <el-col :span="12">
            <el-card class="profile-card">
              <div class="profile-card-header">
                <h2>About Us</h2>
              </div>
              <div class="profile-card-body">
                <p>{{ companyDescription }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="profile-card">
              <div class="profile-card-header">
                <h2>Contact Us</h2>
              </div>
              <div class="profile-card-body">
                <p>Phone: {{ companyPhone }}</p>
                <p>Email: {{ companyEmail }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="feedback-card">
              <div class="feedback-card-header">
                <h2>Leave a Feedback</h2>
              </div>
              <div class="feedback-card-body">
                <el-form
                  ref="feedbackForm"
                  :model="feedbackForm"
                  :rules="feedbackRules"
                >
                  <el-form-item label="Name" prop="name">
                    <el-input
                      v-model="feedbackForm.name"
                      placeholder="Name"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                    <el-input
                      v-model="feedbackForm.email"
                      placeholder="Email"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Message" prop="message">
                    <el-input
                      type="textarea"
                      v-model="feedbackForm.message"
                      placeholder="Message"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitFeedback"
                      >Submit</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyName: "My World",
      companyDescription:
        "We are a leading company in the field of technology, providing innovative solutions for our clients.",
      companyPhone: "051-215-3113",
      companyEmail: "info@acmeinc.com",
      feedbackForm: {
        name: "",
        email: "",
        message: "",
      },
      feedbackRules: {
        name: [
          {
            required: true,
            message: "Please input your name",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please enter a valid email address",
            trigger: "blur",
          },
        ],
        message: [
          {
            required: true,
            message: "Please input your message",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitFeedback() {
      this.$refs.feedbackForm.validate((valid) => {
        if (valid) {
          // Submit the feedback form
          console.log(this.feedbackForm);
        } else {
          console.log("Error: Invalid form");
        }
      });
    },
  },
};
</script>
<style scoped>
.el-col-12 {
  width: 100%;
}
.header-title {
  text-align: center;
  margin-top: 50px;
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
.el-button--primary {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}
</style>
