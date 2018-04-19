const { describe, it } = require("mocha");
const { expect } = require("chai");
const input = require("./fixtures/input.json");
const fs = require("fs");
const formatter = require("../lib/csv");

const filePathToExpectedCsv = "./tests/fixtures/output-csv.csv"; // Working directory at runtime is the root.

describe("csv formatter", () => {
    it("should match expected output", () => {
        const result = formatter(input);
        const csv = fs.readFileSync(filePathToExpectedCsv, "UTF-8");

        expect(result).to.equal(csv);
    });
});
