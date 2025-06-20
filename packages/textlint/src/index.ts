// LICENSE : MIT
"use strict";

/**
 * Command line interface
 */
export { cli } from "./cli.js";
/**
 * @deprecated use New APIs
 */
export { textlint } from "./textlint.js";

/**
 * TextLintEngine is a wrapper around `textlint` for linting **multiple** files
 * include formatter, detecting utils
 * You can see engine/textlint-engine-core.js for more detail
 * @deprecated use New APIs
 */
export { TextLintEngine } from "./DEPRECATED/textlint-engine.js";

/**
 * TextFixEngine is a wrapper around `textlint` for linting **multiple** files
 * include formatter, detecting utils
 * You can see engine/textlint-engine-core.js for more detail
 * @deprecated use New APIs
 */
export { TextFixEngine } from "./DEPRECATED/textfix-engine.js";

/**
 * Core API for linting a **single** text or file.
 * @deprecated use New APIs or @textlint/kernel
 */
export { TextLintCore } from "./DEPRECATED/textlint-core.js";

/* = New APIs */
/**
 * @see {https://textlint.org/docs/use-as-modules.html#new-apis}
 * @example
 *
 * ```js
 *  import { createLinter, loadTextlintrc, loadLinterFormatter } from "textlint";
 *  const descriptor = await loadTextlintrc();
 *  const linter = createLinter({
 *      descriptor
 *  });
 *  const results = await linter.lintFiles(["*.md"]);
 *  const formatter = await loadLinterFormatter({ formatterName: "stylish" })
 *  const output = formatter.format(results);
 *  console.log(output);
 *  ```
 */
export { createLinter, CreateLinterOptions } from "./createLinter.js";
export { loadTextlintrc, LoadTextlintrcOptions } from "./loader/TextlintrcLoader.js";
export { loadLinterFormatter, loadFixerFormatter } from "./formatter.js";
