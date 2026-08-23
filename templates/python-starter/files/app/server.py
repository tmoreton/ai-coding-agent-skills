import json
import logging
import os
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any
from urllib.parse import urlparse

LOGGER = logging.getLogger("{{projectName}}")


def response_for(method: str, path: str) -> tuple[HTTPStatus, dict[str, Any]]:
    if method == "GET" and path == "/health":
        return HTTPStatus.OK, {"status": "ok", "service": "{{projectName}}"}
    if method == "GET" and path == "/":
        return HTTPStatus.OK, {
            "message": "{{projectName}} is running",
            "endpoints": ["/", "/health"],
        }
    return HTTPStatus.NOT_FOUND, {"error": "not_found"}


class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        status, payload = response_for("GET", urlparse(self.path).path)
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format_string: str, *args: object) -> None:
        LOGGER.info(format_string, *args)


def run() -> None:
    logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "8000"))
    server = ThreadingHTTPServer((host, port), RequestHandler)
    LOGGER.info("Listening on http://%s:%s", host, port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        LOGGER.info("Shutting down")
    finally:
        server.server_close()
