export interface AuthResult {
  access_token: string;
  user: {
    id: any;
    correo: any;
    nombre: any;
    apellido: any;
    tipo: any;
    userType: any;
  };
}

export interface ValidatedUser {
  id: number;
  correo: string;
  nombre: string;
  apellido: string;
  tipo: string;
  userType: 'usuario' | 'lector';
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: AuthResult;
}

export interface EmailValidationRequest {
  email: string;
}

export interface EmailValidationResponse {
  success: boolean;
  message: string;
  data?: AuthResult;
}