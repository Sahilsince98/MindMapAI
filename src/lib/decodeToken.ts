// decodeToken.ts
import {jwtDecode,JwtPayload} from "jwt-decode";
interface TokenData {
  id: string;         // User ID (from the token)
  username?: string;  // Example of another field that might be in the token
  email?: string;     // Example: Email, if it's part of the token payload
  exp?: number;       // Example: Expiration date, if it's part of the token
}
// Function to decode JWT
const decodeToken = (token: string): JwtPayload | null => {
  if (!token) {
    return null;
  }
  try {
    // Decoding the token without verifying it
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};

export default decodeToken;
