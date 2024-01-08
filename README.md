# token.mjs

    This module provides functionality for tokenizing and processing mathematical equations. The module includes classes for various types of tokens, such as operators, operands, and variables, as well as functions to load and process equations.

## Functions

![isDigit](./src/assets/images/isDigit.png)

- Determines if the given string represents a numeric digit or a decimal number.

![isDigit](./src/assets/images/isAlpha.png)

- Checks if the given string represents an alphabetic character.

![isDigit](./src/assets/images/LoadFile.png)

- Parses JSON content of equations and returns an object containing tokenized, leveled, and bracketized representations of each equation.

## Classes

![Bracket](./src/assets/images/bracket.png)

- Represents a bracket in a mathematical expression.

![Level](./src/assets/images/Level.png)

- Represents a level in the equation hierarchy, consisting of left operand, operator, and right operand. Additionally, includes a priority value indicating the precedence of the operator.

![Token](./src/assets/images/Token.png)

- Base class for all token types, with utility functions for string representation, binary, and hex conversions.

![Operator](./src/assets/images/Operator.png)

- Represents an operator token, such as +, -, *, /, %, !, (, ), ^, P, C.

![Operand](./src/assets/images/Operand.png)

- Represents an operand token, representing a numerical value.

![Variable](./src/assets/images/Variable.png)

- Represents a variable token, typically an alphabetic character.

## Static Methods

![Token.tokenize](./src/assets/images/tokenize.png)

- Tokenizes the input equation string, handling digits, operators, and variables.

![Token.levelize](./src/assets/images/levelize.png)

- Converts preprocessed token array into a leveled representation based on operator priorities.

![Token.bracketize](./src/assets/images/bracketize.png)

- Converts a leveled array into a bracketed representation, considering parentheses.

## Usage

```javascript
// Import the module
import * as Token from './token.mjs';

// Example usage
const equationString = "(2 + 3) * 4";
const tokens = Token.tokenize(equationString);
const leveledTokens = Token.levelize(tokens);
const bracketedTokens = Token.bracketize(leveledTokens);
console.log(bracketedTokens);
