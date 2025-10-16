/**
 * Simple Markdown to HTML converter
 * Supports basic markdown syntax for press releases
 */

/**
 * Convert markdown text to HTML
 * @param {string} markdown - Markdown text
 * @returns {string} HTML string
 */
export function markdownToHtml(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  let html = markdown;

  // Convert headers (# ## ### #### ##### ######)
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Convert bold text (**text** or __text__)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

  // Convert italic text (*text* or _text_)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Convert inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert blockquotes (> text)
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote><p>$1</p></blockquote>');

  // Convert unordered lists
  const unorderedListRegex = /^[\s]*[-*+]\s+(.+)$/gm;
  let listItems = [];
  let inList = false;
  
  html = html.replace(/^((?:[\s]*[-*+]\s+.+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(line => {
      const itemMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
      return itemMatch ? `<li>${itemMatch[1]}</li>` : '';
    }).filter(item => item);
    
    return `<ul>\n${items.join('\n')}\n</ul>`;
  });

  // Convert ordered lists
  html = html.replace(/^((?:[\s]*\d+\.\s+.+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(line => {
      const itemMatch = line.match(/^[\s]*\d+\.\s+(.+)$/);
      return itemMatch ? `<li>${itemMatch[1]}</li>` : '';
    }).filter(item => item);
    
    return `<ol>\n${items.join('\n')}\n</ol>`;
  });

  // Convert horizontal rules (--- or ***)
  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/^\*\*\*$/gm, '<hr>');

  // Convert line breaks to paragraphs
  // Split by double newlines to create paragraphs
  const paragraphs = html.split(/\n\s*\n/);
  html = paragraphs.map(paragraph => {
    paragraph = paragraph.trim();
    if (!paragraph) return '';
    
    // Don't wrap if it's already an HTML element
    if (paragraph.match(/^<(h[1-6]|ul|ol|blockquote|hr)/)) {
      return paragraph;
    }
    
    // Don't wrap if it's just HTML tags
    if (paragraph.match(/^<[^>]+>.*<\/[^>]+>$/)) {
      return paragraph;
    }
    
    return `<p>${paragraph}</p>`;
  }).filter(p => p).join('\n\n');

  // Clean up extra whitespace
  html = html.replace(/\n{3,}/g, '\n\n');
  html = html.trim();

  return html;
}

/**
 * Check if content is markdown (simple heuristic)
 * @param {string} content - Content to check
 * @returns {boolean} Whether content appears to be markdown
 */
export function isMarkdown(content) {
  if (!content || typeof content !== 'string') {
    return false;
  }

  // Check for common markdown patterns
  const markdownPatterns = [
    /^#+\s/m,           // Headers
    /\*\*.*?\*\*/,      // Bold
    /\*.*?\*/,          // Italic
    /\[.*?\]\(.*?\)/,   // Links
    /^>\s/m,            // Blockquotes
    /^[-*+]\s/m,        // Unordered lists
    /^\d+\.\s/m,        // Ordered lists
    /`.*?`/,            // Inline code
    /^---$/m,           // Horizontal rules
  ];

  return markdownPatterns.some(pattern => pattern.test(content));
}

/**
 * Convert content to HTML, detecting if it's markdown or HTML
 * @param {string} content - Content to convert
 * @returns {string} HTML string
 */
export function contentToHtml(content) {
  if (!content) return '';
  
  // If it already looks like HTML, return as-is
  if (content.includes('<p>') || content.includes('<h1>') || content.includes('<div>')) {
    return content;
  }
  
  // If it looks like markdown, convert it
  if (isMarkdown(content)) {
    return markdownToHtml(content);
  }
  
  // Otherwise, wrap in paragraph tags
  return `<p>${content}</p>`;
}