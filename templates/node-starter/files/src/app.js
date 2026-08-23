const jsonResponse = (status, payload) => ({
  status,
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload)
});

export function routeRequest(method, url) {
  const path = new URL(url, "http://localhost").pathname;

  if (method === "GET" && path === "/health") {
    return jsonResponse(200, { status: "ok", service: "{{projectName}}" });
  }

  if (method === "GET" && path === "/") {
    return jsonResponse(200, {
      message: "{{projectName}} is running",
      endpoints: ["/", "/health"]
    });
  }

  return jsonResponse(404, { error: "not_found" });
}

export function requestHandler(request, response) {
  const result = routeRequest(request.method, request.url);
  response.writeHead(result.status, result.headers);
  response.end(result.body);
}
