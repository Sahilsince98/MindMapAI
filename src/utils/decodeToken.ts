import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  [key: string]: any; // Adjust this to match your expected token structure
}
/**
 * Decodes a JWT token and returns the payload.
 * @param token - The JWT token to decode.
 * @returns The decoded payload as an object.
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    if (!token) {
      throw new Error("Token is required for decoding.");
    }
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token");
    return null;
  }
};
