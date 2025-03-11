import { z } from "zod";

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ValidationErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

/**
 * Validates email format with standard pattern
 * @param email - Email string to validate
 * @returns Error message string or empty string if valid
 */
export function validateEmail(email: string): string {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "El email es requerido";
  if (!re.test(email)) return "Por favor, introduce un email válido";
  return "";
}

/**
 * Validates password meets security requirements
 * @param password - Password string to validate
 * @returns Error message string or empty string if valid
 */
export function validatePassword(password: string): string {
  if (!password) return "La contraseña es requerida";
  if (password.length < 6)
    return "La contraseña debe tener al menos 6 caracteres";
  return "";
}

/**
 * Validates password for login (only checks if empty)
 * @param password - Password string to validate
 * @returns Error message string or empty string if valid
 */
export function validateLoginPassword(password: string): string {
  if (!password) return "La contraseña es requerida";
  return "";
}

export function validateSignUpForm(data: SignUpFormData, acceptTerms: boolean): ValidationErrors {
  const errors: ValidationErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: ""
  };
  
  if (!data.firstName.trim()) {
    errors.firstName = "El nombre es requerido";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "El apellido es requerido";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "El email es requerido";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Por favor, introduce un email válido";
  }
  

  if (!data.password) {
    errors.password = "La contraseña es requerida";
  } else if (data.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  } 
  

  else if (!/[A-Z]/.test(data.password) || !/[0-9]/.test(data.password)) {
     errors.password = "La contraseña debe incluir al menos una mayúscula y un número";
  }
  
  if (!data.confirmPassword) {
    errors.confirmPassword = "Por favor, confirma tu contraseña";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }
  
  if (!acceptTerms) {
    errors.terms = "Debes aceptar los términos y condiciones";
  }
  
  return errors;
}

export function validatePasswordMatch(password: string, confirmPassword: string): string | null {
  if (confirmPassword && password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }
  return null;
}


export function getPasswordStrength(password: string) {
  if (!password) {
    return {
      color: "bg-gray-200",
      text: "",
      percentage: 0
    };
  }
  

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  
  let score = 0;
  if (hasMinLength) score++;
  if (hasUppercase) score++;
  if (hasLowercase) score++;
  if (hasNumbers) score++;
  if (hasSpecialChars) score++;
  
  let color = "bg-gray-200";
  let text = "";
  let percentage = 0;
  
  if (password.length > 0) {
    if (score < 2) {
      color = "bg-red-500";
      text = "Contraseña débil";
      percentage = 33;
    } else if (score < 4) {
      color = "bg-yellow-500";
      text = "Contraseña media";
      percentage = 67;
    } else {
      color = "bg-green-500";
      text = "Contraseña fuerte";
      percentage = 100;
    }
  }
  
  return { color, text, percentage };
}


export const signupSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(50),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres").max(50),
  email: z.string().email("Formato de email inválido"),
  password: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
  acceptNewsletter: z.boolean().optional().default(false),
});

export type SignupInput = z.infer<typeof signupSchema>;