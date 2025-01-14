# Basic Interactive Calculator

This project is a **Simple Calculator** implemented in **JavaScript**, designed to evaluate basic mathematical expressions. It supports addition, subtraction, multiplication, division, and parentheses for grouping.

## Features

- **Arithmetic Operations**: Supports `+`, `-`, `*`, and `/`.
- **Parentheses**: Handles expressions with grouping, e.g., `(3 + 5) * 2`.
- **Error Handling**:
  - Detects mismatched parentheses.
  - Identifies invalid characters in the input.
  - Displays error messages to guide the user.
- **Interactive UI**:
  - Buttons for numbers, operators, and clear/backspace functionalities.
  - Dynamic display updates for user inputs and results.

## Project Structure

### JavaScript Code Explanation

1. **Tokenization**:

   - The `tokenizeInput` function converts the user input string into an array of tokens (numbers, operators, and parentheses).
   - Skips invalid characters and whitespace.
   - Throws an error for unexpected characters.

2. **Expression Parsing**:

   - Implements operator precedence using recursive parsing functions:
     - `parseNumberOrGroup`: Handles numbers and parenthetical groups.
     - `parseMultiplicationAndDivision`: Processes `*` and `/` with higher precedence.
     - `parseAdditionAndSubtraction`: Processes `+` and `-` with lower precedence.

3. **Calculation**:

   - The `calculate` function combines tokenization and parsing to compute the result.
   - Handles errors gracefully and sets a global `isError` flag for UI handling.

4. **UI Interactions**:
   - Event listeners are attached to buttons for:
     - Appending input values.
     - Clearing or backspacing the display.
     - Evaluating the entered expression.

### Code Sample

```javascript
const tokenizeInput = (input) => {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];
    if (/\d/.test(char)) {
      let number = char;
      while (i + 1 < input.length && /\d|\./.test(input[i + 1])) {
        number += input[++i];
      }
      tokens.push(number);
    } else if (/[+\-*/()]/.test(char)) {
      tokens.push(char);
    } else if (/\s/.test(char)) {
    } else {
      throw new Error(`Invalid character: ${char}`);
    }
    i++;
  }

  return tokens;
};
```
