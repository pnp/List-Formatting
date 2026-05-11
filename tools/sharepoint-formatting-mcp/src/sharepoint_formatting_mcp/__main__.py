"""Entry point: `python -m sharepoint_formatting_mcp` or the installed script."""

from .server import run


def main() -> None:
    run()


if __name__ == "__main__":
    main()
