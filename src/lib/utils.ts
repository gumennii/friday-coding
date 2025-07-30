/**
 * Format a phone number to US format (XXX-XXX-XXXX)
 * @param phoneNumber - The phone number to format (as string or number)
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(phoneNumber: string | number): string {
  // Convert to string and remove any non-digit characters
  const cleaned = phoneNumber.toString().replace(/\D/g, "");

  // Check if we have a valid 10-digit US phone number
  if (cleaned.length !== 10) {
    return phoneNumber.toString(); // Return original if not valid
  }

  // Format as XXX-XXX-XXXX
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

/**
 * Truncate text with ellipsis if it exceeds max length
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncating
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
