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
