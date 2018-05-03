const { describe, it } = require("mocha");
const { expect } = require("chai");

const input = require("./fixtures/input.json");
const expected = require("./fixtures/output-telemetry.json");
const formatter = require("../lib/telemetry");

describe("telemetry formatter", () => {
    it("should match expected output", () => {
        const result = formatter(input);
        const json = JSON.stringify(expected, null, 4);

        expect(result).to.equal(json);
    });
});
