// Function to get text content from HTML (for accurate character count)
export const getTextContent = (html: string): string => {
  // Check if we're on the client side
  if (typeof window === 'undefined') return html;
  
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

// Function to count words from HTML content
export const getWordCount = (html: string): number => {
  const textContent = getTextContent(html);
  return textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
};
