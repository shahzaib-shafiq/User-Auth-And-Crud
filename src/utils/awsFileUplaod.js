const fileUpload = require("express-fileupload");
app.use(fileUpload());
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: "us-east-1",
};

const s3Client = new S3Client(s3Config);

app.post("/upload/cloud", async (req, res) => {
  const file = req.files.file;
  const fileName = req.files.file.name;

  const bucketParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file.data,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    res.send(data);
  } catch (err) {
    console.log("Error", err);
  }
});
