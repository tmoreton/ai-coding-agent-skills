import { createServer } from "node:http";
import { requestHandler } from "./app.js";

const host = process.env.HOST ?? "127.0.0.1";
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const server = createServer(requestHandler);

server.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received, closing server`);
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
