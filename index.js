// const Storage = require("./src/core/storage.mjs");
// const AI = require("./src/core/ai/ai.mjs");
// const Models = require("./src/core/ai/models.mjs");
// const Computational = require("./src/core/math/computational.mjs");
// const Token = require("./src/core/math/token.mjs");

console.log("--- Starting ---");

import("./src/core/math/token.mjs").then(module => {
    console.log("--- Started ---");
    let equation = "(8.491*4.625)+(6^4/9)";
    console.log(`--- Equation: ${equation} ---`);
    let tokens = module.Token.tokenize(equation);
    console.log("--- Tokens Obtained ---");
    // console.log(tokens);
    let leveled = module.Token.levelize(tokens);
    console.log("--- Levelized Tokens Obtained ---");
    console.log(leveled);
    let bracket = module.Token.bracketize(leveled);
    console.log("--- Bracketized Tokens Obtained ---");
    console.log(bracket.map(b => {
        return b.toString();
    }));
    console.log(bracket);
    return module;
}).catch(e => console.error(e))
    .finally(data => {
        console.log("--- Finally ---");
        console.log(data);
        console.log("--- Final terminated ---");
    });

console.log("--- Process Terminated ---");