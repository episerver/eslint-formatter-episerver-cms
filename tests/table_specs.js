const { describe, it } = require("mocha");
const { expect } = require("chai");
const input = require("./fixtures/input.json");
const fs = require("fs");
const formatter = require("../lib/table");

const filePathToExpectedCsv = "./tests/fixtures/output-table.txt"; // Working directory at runtime is the root.

describe("table formatter", () => {
    it("should match expected output", () => {
        const result = formatter(input);
        const csv = fs.readFileSync(filePathToExpectedCsv, "utf8");

        expect(result).to.equal(csv);
    });
});
