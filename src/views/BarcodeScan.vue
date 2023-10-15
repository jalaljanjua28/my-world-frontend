<template>
  <div>
    <el-breadcrumb-item>
      <router-link to="/">
        <el-button icon="el-icon-caret-left">Back</el-button>
      </router-link>
    </el-breadcrumb-item>
    <br />
    <el-header>
      <h1 class="header-title">Upload / Process</h1>
    </el-header>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      ref="fileInput"
      :auto-upload="false"
      :on-change="onFileChange"
      accept="image/*"
    >
      <el-button slot="trigger" size="small" type="primary"
        >Select File</el-button
      >
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="uploadImageProcess"
        >Upload to Server</el-button
      >
      <div class="el-upload__tip" slot="tip">
        JPG/PNG files with a size less than 500kb
      </div>
    </el-upload>
    <div v-if="showStatus" class="status">Image Upload Processing...</div>
    <div v-if="completionStatus" class="status">
      Image Upload/Process Successful
    </div>
  </div>
</template>

<script>
import axios from "axios";

// Create a custom Axios instance with a progress event
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL =
  " https://my-world-app-7nnip2tiwq-as.a.run.app"; // Set your API base URL

export default {
  data() {
    return {
      selectedFile: null,
      showStatus: false,
      completionStatus: false,
      uploadProgress: 0,
    };
  },
  methods: {
    onFileChange(file) {
      // Update the selected file when the user selects a file
      this.selectedFile = file.raw;
    },
    uploadImageProcess() {
      if (this.selectedFile) {
        this.showStatus = true;
        this.completionStatus = false;
        this.uploadProgress = 0;

        const formData = new FormData();
        formData.append("file", this.selectedFile);

        // Use the custom Axios instance with a progress event
        axiosInstance
          .post("/image-process-upload-create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            },
          })
          .then((response) => {
            console.log(response.data);
            this.showStatus = false;
            this.completionStatus = true;
          })
          .catch((error) => {
            console.log(error);
            this.showStatus = false;
            this.completionStatus = false;
          });
      } else {
        this.$message.error("Please select a file to upload.");
      }
    },
  },
};
</script>

<style scoped>
.header-title {
  text-align: center;
  margin-top: 50px;
}
.status {
  margin-top: 10px;
  color: #2196f3;
  font-weight: bold;
}
.progress-label {
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
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
.el-button--success {
  color: #fff !important;
  background-color: green !important;
  border-color: green !important;
}
</style>
