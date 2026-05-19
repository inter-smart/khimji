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
  validateNotOnlyInvisibleChars,
} from "./validateFunctions";

const createCareerFormSchema = (t) =>
  z.object({
    name: z
      .string()
      .transform((val) => val?.trim() || "")
      .refine(validateNotEmpty, t("nameRequired"))
      .refine(validateNotOnlyWhitespace, t("nameWhitespace"))
      .refine((val) => val.length >= 2, t("nameMinLength"))
      .refine((val) => val.length <= 255, t("nameTooLong"))
      .refine(validateSecurity, t("nameInvalidChars"))
      .refine(validateNotOnlySpecialChars, t("nameSpecialChars"))
      .refine((val) => !/\d/.test(val), t("nameNoNumbers"))
      .refine(
        (val) => /^[a-zA-ZÀ-ſĀ-ɏḀ-ỿ\s'\-]+$/u.test(val),
        t("nameLettersOnly")
      ),

    phone_number: z
      .string()
      .transform((val) => val?.trim() || "")
      .refine(validateNotEmpty, t("phoneRequired"))
      .refine(validateNotOnlyWhitespace, t("phoneWhitespace"))
      .refine(validateSecurity, t("phoneInvalidChars"))
      .refine((val) => {
        const cleaned = val.replace(/[\s\(\)\-\+]/g, "");
        return cleaned.length >= 5 && cleaned.length <= 15;
      }, t("phoneLength"))
      .refine((val) => {
        const cleaned = val.replace(/[\s\(\)\-\+]/g, "");
        return /^\d+$/.test(cleaned) && !/^0+$/.test(cleaned);
      }, t("phoneInvalidDigits"))
      .refine((val) => /^[\d\s\(\)\-\+]+$/.test(val), t("phoneFormat")),

    email: z
      .string()
      .email(t("emailInvalid"))
      .transform((val) => val?.trim().toLowerCase() || "")
      .refine(validateNotEmpty, t("emailRequired"))
      .refine(validateNotOnlyWhitespace, t("emailWhitespace"))
      .refine(validateSecurity, t("emailSecurityChars"))
      .refine((val) => val.length <= 256, t("emailTooLong"))
      .refine((val) => val.includes("@"), t("emailAtSymbol"))
      .refine((val) => {
        const parts = val.split("@");
        return parts.length === 2 && parts[1].length > 0;
      }, t("emailDomain")),

    message: z
      .string()
      .optional()
      .transform((val) => val?.trim() || "")
      .refine((val) => !val || validateNotEmpty(val), t("messageRequired"))
      .refine((val) => !val || validateNotOnlyWhitespace(val), t("messageWhitespace"))
      .refine((val) => !val || validateSingleCharacter(val), t("messageMinLength"))
      .refine((val) => !val || validateMessageLength(val), t("messageTooLong"))
      .refine((val) => !val || validateSecurity(val), t("messageSecurityChars"))
      .refine((val) => !val || validateNotOnlyInvisibleChars(val), t("messageInvisibleChars"))
      .refine((val) => !val || validateNotOnlySpecialChars(val), t("messageSpecialChars")),

    resume: z
      .any()
      .refine((files) => files?.length === 1, t("resumeRequired"))
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, t("resumeSize"))
      .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), t("resumeType")),
  });

const createQuestionFormSchema = (t) =>
  z.object({
    name: z
      .string()
      .transform((val) => val?.trim() || "")
      .refine(validateNotEmpty, t("nameRequired"))
      .refine(validateNotOnlyWhitespace, t("nameWhitespace"))
      .refine((val) => val.length >= 2, t("nameMinLength"))
      .refine((val) => val.length <= 255, t("nameTooLong"))
      .refine(validateSecurity, t("nameInvalidChars"))
      .refine(validateNotOnlySpecialChars, t("nameSpecialChars"))
      .refine((val) => !/\d/.test(val), t("nameNoNumbers"))
      .refine(
        (val) => /^[a-zA-ZÀ-ſĀ-ɏḀ-ỿ\s'\-]+$/u.test(val),
        t("nameLettersOnly")
      ),

    phone_number: z
      .string()
      .transform((val) => val?.trim() || "")
      .refine(validateNotEmpty, t("phoneRequired"))
      .refine(validateNotOnlyWhitespace, t("phoneWhitespace"))
      .refine(validateSecurity, t("phoneInvalidChars"))
      .refine((val) => {
        const cleaned = val.replace(/[\s\(\)\-\+]/g, "");
        return cleaned.length >= 5 && cleaned.length <= 15;
      }, t("phoneLength"))
      .refine((val) => {
        const cleaned = val.replace(/[\s\(\)\-\+]/g, "");
        return /^\d+$/.test(cleaned) && !/^0+$/.test(cleaned);
      }, t("phoneInvalidDigits"))
      .refine((val) => /^[\d\s\(\)\-\+]+$/.test(val), t("phoneFormat")),

    email: z
      .string()
      .email(t("emailInvalid"))
      .transform((val) => val?.trim().toLowerCase() || "")
      .refine(validateNotEmpty, t("emailRequired"))
      .refine(validateNotOnlyWhitespace, t("emailWhitespace"))
      .refine(validateSecurity, t("emailSecurityChars"))
      .refine((val) => val.length <= 256, t("emailTooLong"))
      .refine((val) => val.includes("@"), t("emailAtSymbol"))
      .refine((val) => {
        const parts = val.split("@");
        return parts.length === 2 && parts[1].length > 0;
      }, t("emailDomain")),

    message: z
      .string()
      .transform((val) => val?.trim() || "")
      .refine(validateNotEmpty, t("questionRequired"))
      .refine(validateNotOnlyWhitespace, t("questionWhitespace"))
      .refine(validateSingleCharacter, t("questionMinLength"))
      .refine(validateMessageLength, t("questionTooLong"))
      .refine(validateSecurity, t("questionSecurityChars"))
      .refine(validateNotOnlySpecialChars, t("questionSpecialChars"))
      .refine(validateNotOnlyInvisibleChars, t("questionInvisibleChars")),
  });

export { createCareerFormSchema, createQuestionFormSchema };
