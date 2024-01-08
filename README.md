# token.mjs

    This module provides functionality for tokenizing and processing mathematical equations. The module includes classes for various types of tokens, such as operators, operands, and variables, as well as functions to load and process equations.

## Functions

### <span style="color: #2d7ad5;">isDigit</span>(<span style="color: #dcdcaa;">string</span>)

- Determines if the given string represents a numeric digit or a decimal number.

### `isAlpha(string)`

- Checks if the given string represents an alphabetic character.

### `LoadFile(file_content_str)`

- Parses JSON content of equations and returns an object containing tokenized, leveled, and bracketized representations of each equation.

## Classes

### `Bracket`

- Represents a bracket in a mathematical expression.

### `Level`

- Represents a level in the equation hierarchy, consisting of left operand, operator, and right operand. Additionally, includes a priority value indicating the precedence of the operator.

### `Token`

- Base class for all token types, with utility functions for string representation, binary, and hex conversions.

### `Operator`

- Represents an operator token, such as +, -, *, /, %, !, (, ), ^, P, C.

### `Operand`

- Represents an operand token, representing a numerical value.

### `Variable`

- Represents a variable token, typically an alphabetic character.

## Static Methods

### `Token.tokenize(eqStr)`

- Tokenizes the input equation string, handling digits, operators, and variables.

### `Token.levelize(preprocessedArr)`

- Converts preprocessed token array into a leveled representation based on operator priorities.

### `Token.bracketize(leveledArr)`

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
