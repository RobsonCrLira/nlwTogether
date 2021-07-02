import { config } from "dotenv";
import { app } from "./app";

config();

app.listen(process.env.PORT, () =>
  console.log(
    `🔥 Server is running || http://localhost:${process.env.PORT}/nlw06 🔥`
  )
);
