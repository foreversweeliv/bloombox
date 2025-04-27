export interface ReviewInput {
  productId: string;
  firstName: string;
  lastName: string;
  email: string;
  content: string;
  rating: number;
}

export interface Review {
  id: number;
  productId: string;
  firstName: string;
  lastName: string;
  email: string;
  content: string;
  rating: number;
  createdAt: string;
}

export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  
  if (!username || !domain) return email;
  
  const maskedUsername = username.length <= 3
    ? '*'.repeat(username.length)
    : username.substring(0, 1) + '*'.repeat(username.length - 2) + username.substring(username.length - 1);
  
  const domainParts = domain.split('.');
  const domainName = domainParts[0];
  const tld = domainParts.slice(1).join('.');
  
  const maskedDomain = domainName.length <= 3
    ? '*'.repeat(domainName.length)
    : domainName.substring(0, 1) + '*'.repeat(domainName.length - 2) + domainName.substring(domainName.length - 1);
  
  return `${maskedUsername}@${maskedDomain}.${tld}`;
} 