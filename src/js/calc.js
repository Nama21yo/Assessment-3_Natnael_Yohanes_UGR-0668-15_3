let isError = false; // Tracks if there was an error in the last calculation

/**
 * Parses a mathematical expression represented by an array of tokens.
 * This function implements operator precedence using nested functions.
 */
const parseExpression = (tokens) => {
  let currentIndex = 0;

  // Gets the current token without advancing the index
  const currentToken = () => tokens[currentIndex];

  // Advances to the next token and returns the current one
  const nextToken = () => tokens[currentIndex++];

  // Parses numbers or grouped expressions (e.g., numbers inside parentheses)
  const parseNumberOrGroup = () => {
    const token = nextToken();
    if (token === "(") {
      const result = parseExpression();
      if (nextToken() !== ")") {
        throw new Error("Mismatched parentheses");
      }
      return result;
    } else if (!isNaN(token)) {
      // Converts valid number strings to floating-point numbers
      return parseFloat(token);
    } else {
      throw new Error(`Unexpected token: ${token}`);
    }
  };

  // Parses multiplication and division with higher precedence
  const parseMultiplicationAndDivision = () => {
    let value = parseNumberOrGroup();
    while (currentToken() === "*" || currentToken() === "/") {
      const operator = nextToken();
      const nextValue = parseNumberOrGroup();
      value = operator === "*" ? value * nextValue : value / nextValue;
    }
    return value;
  };

  // Parses addition and subtraction with lower precedence
  const parseAdditionAndSubtraction = () => {
    let value = parseMultiplicationAndDivision();
    while (currentToken() === "+" || currentToken() === "-") {
      const operator = nextToken();
      const nextValue = parseMultiplicationAndDivision();
      value = operator === "+" ? value + nextValue : value - nextValue;
    }
    return value;
  };

  // Start parsing with the lowest precedence level
  return parseAdditionAndSubtraction();
};
/**
 * Tokenizes the input string into an array of numbers, operators, and parentheses.
 */
const tokenizeInput = (input) => {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];
    if (/\d/.test(char)) {
      // Handle multi-digit numbers and decimals
      let number = char;
      while (i + 1 < input.length && /\d|\./.test(input[i + 1])) {
        number += input[++i];
      }
      tokens.push(number); // Add the complete number to tokens
    } else if (/[+\-*/()]/.test(char)) {
      tokens.push(char); // Add operators and parentheses to tokens
    } else if (/\s/.test(char)) {
      // Ignore whitespace
    } else {
      throw new Error(`Invalid character: ${char}`); // Error for unexpected characters
    }
    i++;
  }

  return tokens;
};
/**
 * Calculates the result of the given mathematical input string.
 */
const calculate = (input) => {
  try {
    const tokens = tokenizeInput(input); // Convert input string into tokens
    return parseExpression(tokens); // Parse and evaluate the tokens
  } catch (err) {
    isError = true; // Set error flag for handling in UI
    return `Error: ${err.message}`; // Return error message
  }
};
// Select all buttons and the display element
const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");

// Add event listeners to all buttons
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    const buttonValue = button.getAttribute("data-value");

    // Reset display if there was an error in the previous calculation
    if (isError) {
      display.value = "";
      isError = false;
    }

    // Clear the display when "C" (clear) button is clicked
    if (button.id === "clear") {
      display.value = "";
      isError = false;
      return;
    }

    // Calculate and display the result when "=" button is clicked
    if (button.id === "equals") {
      display.value = calculate(display.value);
      return;
    }

    // Handle backspace to remove the last character
    if (button.classList.contains("backspace")) {
      display.value = display.value.slice(0, -1);
      return;
    }

    // Append the button value to the display
    display.value += buttonValue;
  })
);
