import { app } from "./app";
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}/api`);
});
server.on("error", console.error);
app.listen(3001);
