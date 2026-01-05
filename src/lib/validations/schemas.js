import * as z from "zod";
import {
  validateNotOnlySpecialChars,
  validateNotEmpty,
  validateNotOnlyWhitespace,
  validateSecurity,
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES,
  validateSingleCharacter,
  validateMessageLength,
} from "./validateFunctions";

const careerFormSchema = z.object({
  name: z
    .string()
    .transform((val) => val?.trim() || "")
    .refine(validateNotEmpty, "Name is required")
    .refine(validateNotOnlyWhitespace, "Name cannot be only whitespace")
    .refine((val) => val.length >= 2, "Name must be at least 2 characters")
    .refine((val) => val.length <= 255, "Name is too long")
    .refine(validateSecurity, "Invalid characters detected")
    .refine(validateNotOnlySpecialChars, "Name cannot contain only special characters")
    .refine((val) => !/\d/.test(val), "Name cannot contain numbers")
    .refine(
      (val) => /^[a-zA-Z\u00C0-\u017F\u0100-\u024F\u1E00-\u1EFF\s'\-]+$/u.test(val),
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  phone_number: z
    .string()
    .transform((val) => val?.trim() || "")
    .refine(validateNotEmpty, "Phone number is required")
    .refine(validateNotOnlyWhitespace, "Phone number cannot be only whitespace")
    .refine(validateSecurity, "Invalid characters detected")
    .refine((val) => {
      const cleaned = val.replace(/[\s\(\)\-\+]/g, "");
      return cleaned.length >= 5 && cleaned.length <= 15;
    }, "Phone number must be between 5-15 digits")
    .refine((val) => {
      const cleaned = val.replace(/[\s\(\)\-\+]/g, "");
      return /^\d+$/.test(cleaned) && !/^0+$/.test(cleaned);
    }, "Phone number must contain valid digits and cannot be all zeros")
    .refine((val) => /^[\d\s\(\)\-\+]+$/.test(val), "Phone number contains invalid characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((val) => val?.trim().toLowerCase() || "")
    .refine(validateNotEmpty, "Email is required")
    .refine(validateNotOnlyWhitespace, "Email cannot be only whitespace")
    .refine(validateSecurity, "Invalid characters detected")
    .refine((val) => val.length <= 256, "Email is too long")
    .refine((val) => val.includes("@"), "Email must contain @ symbol")
    .refine((val) => {
      const parts = val.split("@");
      return parts.length === 2 && parts[1].length > 0;
    }, "Email must have a valid domain"),

  message: z
    .string()
    .optional()
    .transform((val) => val?.trim() || "")
    // Only run validations if value is not empty
    .refine((val) => !val || validateNotEmpty(val), "Message is required")
    .refine((val) => !val || validateNotOnlyWhitespace(val), "Message cannot be only whitespace")
    .refine((val) => !val || validateSingleCharacter(val), "Message must be at least 2 characters")
    .refine((val) => !val || validateMessageLength(val), "Message is too long (maximum 5000 characters)")
    .refine((val) => !val || validateSecurity(val), "Invalid characters or potential security risk detected")
    .refine((val) => !val || validateNotOnlySpecialChars(val), "Message cannot contain only special characters"),
  resume: z
    .any()
    .refine((files) => files?.length === 1, "Please upload your resume file")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only .pdf, .doc, and .docx files are allowed"),
});

const questionFormSchema = z.object({
  name: z
    .string()
    .transform((val) => val?.trim() || "")
    .refine(validateNotEmpty, "Name is required")
    .refine(validateNotOnlyWhitespace, "Name cannot be only whitespace")
    .refine((val) => val.length >= 2, "Name must be at least 2 characters")
    .refine((val) => val.length <= 255, "Name is too long")
    .refine(validateSecurity, "Invalid characters detected")
    .refine(validateNotOnlySpecialChars, "Name cannot contain only special characters")
    .refine((val) => !/\d/.test(val), "Name cannot contain numbers")
    .refine(
      (val) => /^[a-zA-Z\u00C0-\u017F\u0100-\u024F\u1E00-\u1EFF\s'\-]+$/u.test(val),
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  phone_number: z
    .string()
    .transform((val) => val?.trim() || "")
    .refine(validateNotEmpty, "Phone number is required")
    .refine(validateNotOnlyWhitespace, "Phone number cannot be only whitespace")
    .refine(validateSecurity, "Invalid characters detected")
    .refine((val) => {
      const cleaned = val.replace(/[\s\(\)\-\+]/g, "");
      return cleaned.length >= 5 && cleaned.length <= 15;
    }, "Phone number must be between 5-15 digits")
    .refine((val) => {
      const cleaned = val.replace(/[\s\(\)\-\+]/g, "");
      return /^\d+$/.test(cleaned) && !/^0+$/.test(cleaned);
    }, "Phone number must contain valid digits and cannot be all zeros")
    .refine((val) => /^[\d\s\(\)\-\+]+$/.test(val), "Phone number contains invalid characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((val) => val?.trim().toLowerCase() || "")
    .refine(validateNotEmpty, "Email is required")
    .refine(validateNotOnlyWhitespace, "Email cannot be only whitespace")
    .refine(validateSecurity, "Invalid characters detected")
    .refine((val) => val.length <= 256, "Email is too long")
    .refine((val) => val.includes("@"), "Email must contain @ symbol")
    .refine((val) => {
      const parts = val.split("@");
      return parts.length === 2 && parts[1].length > 0;
    }, "Email must have a valid domain"),

  message: z
    .string()
    .transform((val) => val?.trim() || "")
    // Only run validations if value is not empty
    .refine((val) => !val || validateNotEmpty(val), "Question is required")
    .refine((val) => !val || validateNotOnlyWhitespace(val), "Question cannot be only whitespace")
    .refine((val) => !val || validateSingleCharacter(val), "Question must be at least 2 characters")
    .refine((val) => !val || validateMessageLength(val), "Question is too long (maximum 5000 characters)")
    .refine((val) => !val || validateSecurity(val), "Invalid characters or potential security risk detected")
    .refine((val) => !val || validateNotOnlySpecialChars(val), "Question cannot contain only special characters"),
});

export { careerFormSchema, questionFormSchema };
