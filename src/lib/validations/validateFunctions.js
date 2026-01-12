const SECURITY_PATTERNS = {
  xssPattern: /<[^>]*>?|javascript:|on\w+\s*=/gi,
  sqlInjectionPattern: /('|`|;|--|"|\b(DROP|DELETE|INSERT|UPDATE|SELECT|UNION|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
  scriptPattern: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  templateInjectionPattern: /\{\{.*?\}\}/g,
};

const validateSecurity = (value) => {
  if (typeof value !== "string") return true;

  return (
    !SECURITY_PATTERNS.xssPattern.test(value) &&
    !SECURITY_PATTERNS.sqlInjectionPattern.test(value) &&
    !SECURITY_PATTERNS.scriptPattern.test(value) &&
    !SECURITY_PATTERNS.templateInjectionPattern.test(value)
  );
};

const validateNotOnlySpecialChars = (value) => {
  if (typeof value !== "string") return true;
  return !/^[^a-zA-Z0-9\s]+$/.test(value.trim());
};

const validateNotEmpty = (value) => {
  if (typeof value !== "string") return false;
  return value.trim().length > 0;
};

const validateNotOnlyWhitespace = (value) => {
  if (typeof value !== "string") return false;
  return /\S/.test(value);
};

const validateMessageLength = (value) => {
  if (typeof value !== "string") return false;
  // Reject extremely long messages (adjust limit as needed)
  return value.length <= 5000;
};

const validateSingleCharacter = (value) => {
  if (typeof value !== "string") return true;
  // Reject single character messages (but allow 2+ characters)
  return value.trim().length >= 2;
};

const validateNotOnlyInvisibleChars = (value) => {
  if (typeof value !== "string") return true;

   return !value.includes("\\");
};



const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024); // Convert bytes → MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export {
  validateSecurity,
  validateNotOnlySpecialChars,
  validateNotEmpty,
  validateNotOnlyWhitespace,
  validateMessageLength,
  validateSingleCharacter,
  validateNotOnlyInvisibleChars,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_MB,
  ACCEPTED_FILE_TYPES,
};
