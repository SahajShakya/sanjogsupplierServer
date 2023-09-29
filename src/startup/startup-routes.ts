import express, { Express } from "express";
import multer from "multer";
import "dotenv/config";
import { ConstantRoutes } from "../constants/ConstantRoutes";
// import TestRoutes from "./../routes/TestRoutes";
import AuthRoutes from "./../routes/AuthRoutes";
// import UserRoutes from "../routes/UserRoutes";
export default (app: Express) => {
  // Routes
  const { baseUrl } = ConstantRoutes;
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(upload.array("files", 12));
  // BASE ==> "/"
  // BASE_PATH ==> "/api"

  // app.use(baseUrl, TestRoutes);

  app.use(baseUrl, AuthRoutes);

  // app.use(baseUrl, UserRoutes);

};
