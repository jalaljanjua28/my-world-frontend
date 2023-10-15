// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const cors = require("cors");
// eslint-disable-next-line no-undef
const { Storage } = require("@google-cloud/storage");

const app = express();
app.use(cors());
app.use(express.json());

const storage = new Storage();

async function getFileMetadata(bucketName, fileName) {
  const [metadata] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getMetadata();
  return metadata;
}
async function deleteFile(bucketName, fileId) {
  try {
    console.log(fileId);
    await storage.bucket(bucketName).file(fileId).delete();
    console.log(`File ${fileId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}
app.post("/File_id", async (req, res) => {
  const { fileName } = req.body; // Assuming the file name is sent in the JSON body

  if (!fileName) {
    return res.status(400).json({ error: "File name is required." });
  }

  try {
    const bucketName = "my-grocery-app";
    const metadata = await getFileMetadata(bucketName, fileName);
    const fileId = metadata.id;

    // Send the fileId to the client-side
    res.json({ fileId });
  } catch (error) {
    console.error("Error retrieving file metadata:", error);
    res.status(500).json({ error: "Error retrieving file metadata" });
  }
});
app.post("/deleteFile", async (req, res) => {
  const { fileId } = req.body;

  if (!fileId) {
    return res.status(400).json({ error: "File ID is required." });
  }

  try {
    const bucketName = "my-grocery-app"; // Replace with your bucket name
    await deleteFile(bucketName, fileId);
    res.json({ message: `File ${fileId} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Error deleting file." });
  }
});

// eslint-disable-next-line no-undef
exports.cloudFunction = app;
