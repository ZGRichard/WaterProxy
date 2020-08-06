const express = require("express");
import { createConnection } from 'typeorm';

const { push } = require("./push");

(async () => {
  await createConnection();

  const app = express();
  const port = 8080;

  app.use(express.json());

  app.get("/sync", (req, res) => {
    console.log("Pulling", Date.now());
    res.send(
      JSON.stringify({
        changes: {},
        timestamp: Date.now(),
      })
    );
  });
  app.post("/sync", push);

  app.listen(port, () =>
    console.log(`WaterProxy listening at http://localhost:${port}`)
  );
})();
