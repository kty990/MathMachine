function isDigit(string) {
    try {
        let tmp = parseFloat(string);
        return !isNaN(tmp);
    } catch (e) {
        return false;
    }
}

function isAlpha(string) {
    let abet = ['abcdefghijklmnopqrstuvwxyz'];
    let cap_abet = abet.map(c => c.toUpperCase());
    return abet.indexOf(string) != -1 || cap_abet.indexOf(string) != -1;
}

export function LoadFile(file_content_str) {
    let json = JSON.parse(file_content_str);
    let equations = {}
    for (let equation of json) {
        let tokens = Token.tokenize(equation.join(""));
        let leveled = Token.levelize(tokens);
        let bracketed = Token.bracketize(leveled);
        equations[equation.join("")] = {
            tokens,
            leveled,
            bracketed
        }
    }
    return equations;
}

export class Bracket {
    constructor(value) {
        this.value = value;
    }

    toString() {
        return `${this.value}`;
    }
}

export class Level {
    constructor(left = null, operator = null, right = null) {
        this.left = left;
        this.op = operator;
        this.right = right;
        this.priority = 0;
    }

    toString() {
        return `L@${this.left}  O@${this.op}  R@${this.right}`;
    }
}

export class Token {
    value = "";
    constructor() { }

    toString() {
        return this.value;
    }

    toBinaryHex() {
        // Get the Unicode value of the character
        const unicodeValue = this.value.charCodeAt(0);

        // Convert Unicode value to binary and hex
        const binaryRepresentation = unicodeValue.toString(2);
        const hexRepresentation = unicodeValue.toString(16).toUpperCase();

        return { binary: binaryRepresentation, hex: hexRepresentation };
    }

    static preProcess(tokenArr) {

    }


    static tokenize(eqStr) {
        console.log(eqStr, typeof (eqStr));
        let tmp = [];
        let current = [];
        let errorIndex = 0;
        let todo = eqStr.replace(" ").split("");
        for (let char of todo) {
            if (isDigit(char) || char === ".") {
                current.push(char);
            } else if (!isAlpha(char) || char == "P" || char == "C") {
                if (current.length > 0) {
                    let result = current.join("");
                    if (result.endsWith(".")) {
                        throw `Unable to tokenize equation.\n\t- Index: ${errorIndex}\n\t- Invalid Value: ${result}`;
                    }
                    tmp.push(new Operand(result));
                    current = [];
                }
                tmp.push(new Operator(char));
            } else {
                tmp.push(new Variable(char));
            }
            errorIndex++;
        }
        if (current.length > 0) {
            let result = current.join("");
            if (result.endsWith(".")) {
                throw `Unable to tokenize equation.\n\t- Index: ${errorIndex}\n\t- Invalid Value: ${result}`;
            }
            tmp.push(new Operand(result));
            current = [];
        }
        return tmp; // Lets the data be handled from left to right.
    }

    /* Needs to be redone to take all operators and operands into account. Currently, some are missed. */
    static levelize(preprocessedArr) {
        let levels = [];
        const level_equate = {
            "^": 3,
            "*": 2,
            "/": 2,
            "+": 1,
            "-": 1
        }
        let i = 0;
        let currentLevel = new Level();
        for (const token of preprocessedArr) {
            console.log(token);
            if (token instanceof Operator) {
                if (token.value == "(" || token.value == ")") {
                    levels.push(token);
                    continue;
                }
                if (!currentLevel.left) levels.push(token);
                else currentLevel.op = token;
            } else if (token instanceof Operand || token instanceof Variable) {
                console.log("Else", currentLevel.left);
                if (!currentLevel.left) {
                    if (i + 1 == preprocessedArr.length) {
                        levels.push(token);
                    } else {
                        currentLevel.left = token;
                    }
                }
                else if (!currentLevel.op) throw "Invalid equation. Recieved back-to-back Operands, requires Operator to separate Operands.";
                else if (!currentLevel.right) {
                    currentLevel.right = token;
                    currentLevel.priority = level_equate[currentLevel.op.value] || 0;
                    levels.push(currentLevel);
                    currentLevel = new Level();
                } else throw `Something went wrong in\n\t(STATIC) Token.bracketize(preprocessedArr)`
            }
            console.log("next");
            i++;
        }
        if (currentLevel.left || currentLevel.op || currentLevel.right) {
            if (currentLevel.left) {
                levels.push(currentLevel.left);
            }
            if (currentLevel.op) {
                levels.push(currentLevel.op);
            }
            if (currentLevel.right) {
                levels.push(currentLevel.right);
            }
        }
        console.log("--- Levels ---");
        console.log(levels);
        return levels;
    }

    static bracketize(leveledArr) {
        const result = [];
        const stack = [];

        for (const item of leveledArr) {
            if (item instanceof Operator && item.value === '(') {
                stack.push([]);
            } else if (item instanceof Operator && item.value === ')') {
                const levels = stack.pop();
                result.push(new Bracket(levels));
            } else {
                if (stack.length > 0) {
                    stack[stack.length - 1].push(item);
                } else {
                    result.push(item);
                }
            }
        }

        return result;
    }



}

export class Operator extends Token {
    /**
     * An "Operator" is a token that represents an action to be taken on an "Operand".
     * 
     * Valid operators include: +, -, *, /, %, !, (, ) , ^, P, C
     * @param {String} value 
     */
    constructor(value) {
        super();
        this.value = value;
    }
}

export class Operand extends Token {
    /**
     * An "Operand" is a token that represents a numerical value.
     * @param {String} value 
     */
    constructor(value) {
        super();
        this.value = value;
    }
}

export class Variable extends Token {
    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super();
        this.value = value;
    }
}