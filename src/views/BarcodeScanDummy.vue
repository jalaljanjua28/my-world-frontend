<template>
  <div></div>
</template>

<script>
import axios from "axios";

// Create a custom Axios instance with a progress event
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "http://127.0.0.1:8080"; // Set your API base URL

export default {
  data() {
    return {
      selectedFile: null,
    };
  },

  methods: {
    uploadImageProcessDummy(dummyFile = null) {
      const fileToUpload = dummyFile || this.selectedFile;
      console.log("File to upload:", fileToUpload);

      if (fileToUpload) {
        const formData = new FormData();
        formData.append("file", fileToUpload);

        // Use the custom Axios instance with a progress event
        axiosInstance
          .post("/image-process-upload-create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
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
            if (error.response) {
              console.log("Response Status:", error.response.status);
              console.log("Response Data:", error.response.data);
            } else {
              console.log("Error Message:", error.message);
            }
          });
      } else {
        this.$message.error("Please select a file to upload.");
      }
    },
    simulateUpload() {
      if (this.selectedFile) {
        // If a file is selected, upload it
        this.uploadImageProcessDummy(this.selectedFile);
      } else {
        // If no file is selected, simulate the upload with a dummy file
        const dummyFile = new File(["dummy content"], "dummy.jpg", {
          type: "image/jpeg",
        });
        console.log("Simulating upload with dummy file:", dummyFile);
        this.uploadImageProcessDummy(dummyFile);
        console.log("simulateUpload function called!");
      }
    },
  },
};
// Export the axiosInstance so that it can be used elsewhere
</script>

<style scoped></style>
