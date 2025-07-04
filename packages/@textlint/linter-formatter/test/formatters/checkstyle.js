/**
 * @fileoverview Tests for checkstyle reporter.
 * @author Ian Christian Myers
 */

"use strict";
import formatter from "../../src/formatters/checkstyle.js";

import { describe, it } from "vitest";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as assert from "node:assert";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("formatter:checkstyle", function () {
    describe("when passed a single message", function () {
        const code = [
            {
                filePath: "foo.js",
                messages: [
                    {
                        message: "Unexpected foo.",
                        severity: 2,
                        line: 5,
                        column: 10,
                        ruleId: "foo"
                    }
                ]
            }
        ];

        it("should return a string in the format filename: line x, col y, Error - z for errors", function () {
            const result = formatter(code, { color: false });
            assert.equal(
                result,
                '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.js"><error line="5" column="10" severity="error" message="Unexpected foo. (foo)" source="eslint.rules.foo" /></file></checkstyle>'
            );
        });

        it("should return a string in the format filename: line x, col y, Warning - z for warnings", function () {
            code[0].messages[0].severity = 1;
            const result = formatter(code, { color: false });
            assert.equal(
                result,
                '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.js"><error line="5" column="10" severity="warning" message="Unexpected foo. (foo)" source="eslint.rules.foo" /></file></checkstyle>'
            );
        });
    });

    describe("when passed a message with XML control characters", function () {
        const code = [
            {
                filePath: "<>&\"'.js",
                messages: [
                    {
                        fatal: true,
                        message: "Unexpected <>&\"'.",
                        line: "<",
                        column: ">",
                        ruleId: "foo>"
                    }
                ]
            }
        ];

        it("should return a string in the format filename: line x, col y, Error - z", function () {
            const result = formatter(code, { color: false });
            assert.equal(
                result,
                '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="&lt;&gt;&amp;&quot;&apos;.js"><error line="&lt;" column="&gt;" severity="error" message="Unexpected &lt;&gt;&amp;&quot;&apos;. (foo&gt;)" source="eslint.rules.foo&gt;" /></file></checkstyle>'
            );
        });
    });

    describe("when passed a fatal error message", function () {
        const code = [
            {
                filePath: "foo.js",
                messages: [
                    {
                        fatal: true,
                        message: "Unexpected foo.",
                        line: 5,
                        column: 10,
                        ruleId: "foo"
                    }
                ]
            }
        ];

        it("should return a string in the format filename: line x, col y, Error - z", function () {
            const result = formatter(code, { color: false });
            assert.equal(
                result,
                '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.js"><error line="5" column="10" severity="error" message="Unexpected foo. (foo)" source="eslint.rules.foo" /></file></checkstyle>'
            );
        });
    });

    describe("when passed multiple messages", function () {
        const code = [
            {
                filePath: "foo.js",
                messages: [
                    {
                        message: "Unexpected foo.",
                        severity: 2,
                        line: 5,
                        column: 10,
                        ruleId: "foo"
                    },
                    {
                        message: "Unexpected bar.",
                        severity: 1,
                        line: 6,
                        column: 11,
                        ruleId: "bar"
                    }
                ]
            }
        ];

        it("should return a string with multiple entries", function () {
            const result = formatter(code, { color: false });
            assert.equal(
                result,
                '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.js"><error line="5" column="10" severity="error" message="Unexpected foo. (foo)" source="eslint.rules.foo" /><error line="6" column="11" severity="warning" message="Unexpected bar. (bar)" source="eslint.rules.bar" /></file></checkstyle>'
            );
        });
    });

    describe("when passed multiple files with 1 message each", function () {
        const code = [
            {
                filePath: "foo.js",
                messages: [
                    {
                        message: "Unexpected foo.",
                        severity: 2,
                        line: 5,
                        column: 10,
                        ruleId: "foo"
                    }
                ]
            },
            {
                filePath: "bar.js",
                messages: [
                    {
                        message: "Unexpected bar.",
                        severity: 1,
                        line: 6,
                        column: 11,
                        ruleId: "bar"
                    }
                ]
            }
        ];

        it("should return a string with multiple entries", function () {
            const result = formatter(code, { color: false });
            assert.equal(
                result,
                '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.js"><error line="5" column="10" severity="error" message="Unexpected foo. (foo)" source="eslint.rules.foo" /></file><file name="bar.js"><error line="6" column="11" severity="warning" message="Unexpected bar. (bar)" source="eslint.rules.bar" /></file></checkstyle>'
            );
        });
    });

    describe("when passing single message without rule id", function () {
        const code = [
            {
                filePath: "foo.js",
                messages: [
                    {
                        message: "Unexpected foo.",
                        severity: 2,
                        line: 5,
                        column: 10
                    }
                ]
            }
        ];

        it("should return a string in the format filename: line x, col y, Error - z for errors", function () {
            const result = formatter(code, { color: false });
            assert.equal(
                result,
                '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.js"><error line="5" column="10" severity="error" message="Unexpected foo." source="" /></file></checkstyle>'
            );
        });
    });
});
