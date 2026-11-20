"""Cache public manufacturer pages for a reproducible specification audit.

python scripts/cache-tohnichi-sources.py --directory output/tohnichi-audit/html
Use --refresh to replace an existing snapshot. Requires curl on PATH.
"""

import argparse
import concurrent.futures
import hashlib
import json
import subprocess
from pathlib import Path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--directory", type=Path, default=Path("output/tohnichi-audit/html"))
    parser.add_argument("--refresh", action="store_true")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    products = json.loads((root / "data/tohnichi-specifications.json").read_text())["products"]
    args.directory.mkdir(parents=True, exist_ok=True)

    def fetch(item):
        slug, product = item
        destination = args.directory / f"{slug}.html"
        if args.refresh or not destination.exists():
            temporary = destination.with_suffix(".html.partial")
            subprocess.run(["curl", "-sSfL", "--retry", "2", "--max-time", "40", product["sourceUrl"],
                            "-o", str(temporary)], check=True)
            temporary.replace(destination)
        return {"slug": slug, "sourceUrl": product["sourceUrl"],
                "sourceSha256": hashlib.sha256(destination.read_bytes()).hexdigest()}

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        manifest = list(pool.map(fetch, products.items()))
    args.directory.parent.joinpath("source-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Cached {len(manifest)} official source pages in {args.directory}.")
