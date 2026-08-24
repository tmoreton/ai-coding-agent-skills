# {{projectName}}

A dependency-free Python HTTP service.

## Run

```bash
python3 -m venv .venv
.venv/bin/python -m app
```

The service listens on `http://127.0.0.1:8000` by default. Configure it with
`HOST`, `PORT`, and `LOG_LEVEL`.

## Verify

```bash
.venv/bin/python -m unittest discover -s tests -v
```
