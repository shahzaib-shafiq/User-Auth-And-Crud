const MultipleItems = require("../Models/Images_model");
const express = require("express");
exports.multipleImagesItem = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    res.send("Files uploaded successfully.");
  } catch (error) {}
};
