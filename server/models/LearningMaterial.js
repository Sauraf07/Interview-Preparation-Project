const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const LearningMaterial = sequelize.define(
  "LearningMaterial",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, defaultValue: "" },
    type: {
      type: DataTypes.ENUM("pdf", "notes", "video", "cheatsheet"),
      allowNull: false,
    },
    link: { type: DataTypes.STRING, defaultValue: "" },
    fileUrl: { type: DataTypes.STRING, defaultValue: "" },
    cloudinaryPublicId: { type: DataTypes.STRING, defaultValue: "" },
    category: { type: DataTypes.STRING, defaultValue: "general" },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
    uploadedBy: { type: DataTypes.INTEGER },
  },
  { timestamps: true },
);

module.exports = LearningMaterial;
