#!/usr/bin/env python3
"""Validate content/i18n.json and content/data.json for internal consistency.

Checks:
  1. Every i18n entry has exactly 2 non-empty string values [ko, en].
  2. Every data-i18n="..." key used in index.html exists in i18n.json.
  3. Every record in data.json's arrays has its required fields, non-empty.

Exit code 0 = clean, 1 = problems found (each printed on its own line).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
I18N_PATH = ROOT / "content" / "i18n.json"
DATA_PATH = ROOT / "content" / "data.json"
INDEX_PATH = ROOT / "index.html"

REQUIRED_FIELDS = {
    "pipeline": ["en", "ko"],
    "findings": ["ko", "en"],
    "publications": ["bracket", "year", "first", "title", "authors", "venue", "doi", "tag", "pdb"],
    "skills": ["ko", "en", "items"],
    "projects": ["name", "ko", "en", "tech"],
    "certs": ["ko", "en", "date"],
}


def fail(errors, msg):
    errors.append(msg)


def check_i18n(errors):
    i18n = json.loads(I18N_PATH.read_text(encoding="utf-8"))
    for key, value in i18n.items():
        if not isinstance(value, list) or len(value) != 2:
            fail(errors, f"i18n.json: '{key}' must be a 2-element [ko, en] array, got {value!r}")
            continue
        ko, en = value
        if not isinstance(ko, str) or not ko.strip():
            fail(errors, f"i18n.json: '{key}' has an empty/missing ko value")
        if not isinstance(en, str) or not en.strip():
            fail(errors, f"i18n.json: '{key}' has an empty/missing en value")
    return i18n


def check_index_keys(errors, i18n):
    html = INDEX_PATH.read_text(encoding="utf-8")
    used_keys = set(re.findall(r'data-i18n="([^"]+)"', html))
    for key in sorted(used_keys):
        if key not in i18n:
            fail(errors, f"index.html uses data-i18n=\"{key}\" but it's missing from i18n.json")


def check_data(errors):
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    for section, required in REQUIRED_FIELDS.items():
        records = data.get(section)
        if records is None:
            fail(errors, f"data.json: missing top-level key '{section}'")
            continue
        for i, record in enumerate(records):
            for field in required:
                if field not in record:
                    fail(errors, f"data.json: {section}[{i}] missing required field '{field}'")
                    continue
                value = record[field]
                if isinstance(value, str) and not value.strip():
                    fail(errors, f"data.json: {section}[{i}].{field} is an empty string")


def main():
    errors = []
    i18n = check_i18n(errors)
    if INDEX_PATH.exists():
        check_index_keys(errors, i18n)
    check_data(errors)

    if errors:
        print(f"validate_content.py: {len(errors)} problem(s) found:\n")
        for e in errors:
            print(f"  - {e}")
        return 1

    print("validate_content.py: content is consistent.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
