import unittest
from http import HTTPStatus

from app.server import response_for


class ResponseTests(unittest.TestCase):
    def test_health_response(self) -> None:
        status, payload = response_for("GET", "/health")

        self.assertEqual(status, HTTPStatus.OK)
        self.assertEqual(payload["status"], "ok")

    def test_unknown_route(self) -> None:
        status, payload = response_for("GET", "/missing")

        self.assertEqual(status, HTTPStatus.NOT_FOUND)
        self.assertEqual(payload, {"error": "not_found"})


if __name__ == "__main__":
    unittest.main()
