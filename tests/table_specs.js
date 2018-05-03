const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs");
const normalizeNewline = require("normalize-newline");

const input = require("./fixtures/input.json");
const formatter = require("../lib/table");

const filePathToExpectedCsv = "./tests/fixtures/output-table.txt"; // Working directory at runtime is the root.

describe("table formatter", () => {
    it("should match expected output", () => {
        const result = formatter(input);
        const expected = fs.readFileSync(filePathToExpectedCsv, "utf8");

        expect(normalizeNewline(result)).to.equal(normalizeNewline(expected));
    });
});
