import assert from "node:assert/strict";
import test from "node:test";
import { routeRequest } from "../src/app.js";

test("returns service health", () => {
  const response = routeRequest("GET", "/health");

  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(response.body), {
    status: "ok",
    service: "{{projectName}}"
  });
});

test("returns 404 for an unknown route", () => {
  const response = routeRequest("GET", "/missing");

  assert.equal(response.status, 404);
  assert.deepEqual(JSON.parse(response.body), { error: "not_found" });
});
