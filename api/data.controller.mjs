// data.controller.mjs

import DataDAO from "../dao/dataDAO.js";

export default class DataController {
  static async getData(req, res, next) {
    try {
      const data = await DataDAO.getData();
      res.json(data);
    } catch (err) {
      console.error(`Error getting data: ${err}`);
      res.status(500).json({ error: err });
    }
  }

  static async addData(req, res, next) {
    try {
      const { temperature, humidity, value } = req.body;
      const result = await DataDAO.addData(temperature, humidity, value);
      if (result === 1) {
        res.json({ message: "Data added successfully" });
      } else {
        throw new Error("Failed to add data");
      }
    } catch (err) {
      console.error(`Error adding data: ${err}`);
      res.status(500).json({ error: err });
    }
  }
}