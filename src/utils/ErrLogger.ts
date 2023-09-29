// @ts-ignore
import models = require("../models");
import moment from "moment";
import * as fs from "fs";
import * as path from "path";

type IErrorLogger = {
  error: [] | "" | any;
};

export const ErrLogger = async ({ error }: IErrorLogger) => {
  try {
    // await models.error.create({
    //   errordata: error.stack,
    // });
    console.log(error.stack);
  } catch (error: any) {
    console.log(error);
    fs.writeFile(
      path.join(
        __dirname,
        `../logs/${moment(Date.now()).format("yyyy-mm-dd-hh-mm-ss")}_error.txt`
      ),
      error.stack,
      (err) => {
        console.log(err);
      }
    );
  }
};
