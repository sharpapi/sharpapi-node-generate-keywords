![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Keywords & Tags Generator API for Node.js

## 🏷️ Extract keywords and generate tags from text — powered by SharpAPI AI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-generate-keywords.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-generate-keywords)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-generate-keywords.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Keywords & Tags Generator** uses advanced AI to extract relevant keywords and generate tags from text content. Perfect for SEO, content categorization, and metadata generation.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Examples](#examples)
6. [License](#license)

---

## Requirements

- Node.js >= 16.x
- npm or yarn

---

## Installation

### Step 1. Install the package via npm:

```bash
npm install @sharpapi/sharpapi-node-generate-keywords
```

### Step 2. Get your API key

Visit [SharpAPI.com](https://sharpapi.com/) to get your API key.

---

## Usage

```javascript
const { SharpApiGenerateKeywordsService } = require('@sharpapi/sharpapi-node-generate-keywords');

const apiKey = process.env.SHARP_API_KEY; // Store your API key in environment variables
const service = new SharpApiGenerateKeywordsService(apiKey);

const text = `
Cloud computing has revolutionized how businesses operate by providing on-demand access
to computing resources. Companies can now scale their infrastructure automatically based
on demand, reducing costs and improving efficiency.
`;

async function generateKeywords() {
  try {
    // Submit keyword generation job
    const statusUrl = await service.generateKeywords(text);
    console.log('Job submitted. Status URL:', statusUrl);

    // Fetch results (polls automatically until complete)
    const result = await service.fetchResults(statusUrl);
    const keywords = result.getResultJson();

    console.log('Generated keywords:', keywords);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateKeywords();
```

---

## API Documentation

### Methods

#### `generateKeywords(text: string, maxKeywords?: number, language?: string): Promise<string>`

Extracts keywords and generates tags from the provided text.

**Parameters:**
- `text` (string, required): The text content to analyze
- `maxKeywords` (number, optional): Maximum number of keywords to return (default: 10)
- `language` (string, optional): The language of the text (default: 'English')

**Returns:**
- Promise<string>: Status URL for polling the job result

**Example:**
```javascript
const statusUrl = await service.generateKeywords(articleText, 15, 'English');
const result = await service.fetchResults(statusUrl);
```

### Response Format

The API returns extracted keywords with relevance scores:

```json
{
  "keywords": [
    {
      "keyword": "cloud computing",
      "relevance": 0.95,
      "occurrences": 3
    },
    {
      "keyword": "on-demand access",
      "relevance": 0.88,
      "occurrences": 2
    },
    {
      "keyword": "computing resources",
      "relevance": 0.82,
      "occurrences": 2
    }
  ],
  "tags": [
    "cloud-computing",
    "infrastructure",
    "scalability",
    "business-technology"
  ]
}
```

---

## Examples

### Basic Keyword Extraction

```javascript
const { SharpApiGenerateKeywordsService } = require('@sharpapi/sharpapi-node-generate-keywords');

const service = new SharpApiGenerateKeywordsService(process.env.SHARP_API_KEY);

const blogPost = `
Artificial intelligence is transforming healthcare through predictive analytics,
personalized treatment plans, and automated diagnostics. Machine learning algorithms
can now detect diseases earlier than traditional methods.
`;

service.generateKeywords(blogPost, 8)
  .then(statusUrl => service.fetchResults(statusUrl))
  .then(result => {
    const data = result.getResultJson();
    console.log('🔑 Top Keywords:');
    data.keywords.forEach((kw, index) => {
      console.log(`${index + 1}. ${kw.keyword} (relevance: ${kw.relevance})`);
    });
    console.log('\n🏷️ Suggested Tags:', data.tags.join(', '));
  })
  .catch(error => console.error('Generation failed:', error));
```

### SEO Keyword Analysis

```javascript
const service = new SharpApiGenerateKeywordsService(process.env.SHARP_API_KEY);

const productDescription = `
Professional noise-canceling wireless headphones with 40-hour battery life.
Features advanced Bluetooth 5.0 technology, premium sound quality, and
comfortable over-ear design. Perfect for travel, work, and entertainment.
`;

const statusUrl = await service.generateKeywords(productDescription, 12);
const result = await service.fetchResults(statusUrl);
const keywordData = result.getResultJson();

// Filter high-relevance keywords for SEO
const seoKeywords = keywordData.keywords
  .filter(kw => kw.relevance >= 0.8)
  .map(kw => kw.keyword);

console.log('High-value SEO keywords:', seoKeywords);
```

### Content Categorization

```javascript
const service = new SharpApiGenerateKeywordsService(process.env.SHARP_API_KEY);

const articles = [
  { id: 1, content: 'Article about web development...' },
  { id: 2, content: 'Article about digital marketing...' },
  { id: 3, content: 'Article about machine learning...' }
];

const categorized = await Promise.all(
  articles.map(async (article) => {
    const statusUrl = await service.generateKeywords(article.content, 5);
    const result = await service.fetchResults(statusUrl);
    const data = result.getResultJson();

    return {
      id: article.id,
      category: data.tags[0], // Primary category
      keywords: data.keywords.slice(0, 3).map(kw => kw.keyword),
      tags: data.tags
    };
  })
);

console.log('Categorized content:', categorized);
```

---

## Use Cases

- **SEO Optimization**: Generate keywords for meta tags and content optimization
- **Content Categorization**: Auto-tag articles, products, and documents
- **Search Enhancement**: Improve search functionality with extracted keywords
- **Metadata Generation**: Automatically create metadata for CMS systems
- **Topic Modeling**: Identify main topics and themes in text
- **Content Discovery**: Enable better content recommendations
- **Analytics**: Track keyword trends and content themes

---

## Keyword Types

The generator identifies various keyword types:

- **Single Keywords**: Individual important terms
- **Key Phrases**: Multi-word expressions (2-4 words)
- **Named Entities**: People, places, organizations
- **Technical Terms**: Industry-specific terminology
- **Action Words**: Verbs and action-oriented phrases
- **Topic Tags**: High-level categorical tags

---

## API Endpoint

**POST** `/content/keywords`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsVX)
- [Product Page](https://sharpapi.com/en/catalog/ai/content-marketing-automation/keywords-tags-generator)

---

## Related Packages

- [@sharpapi/sharpapi-node-summarize-text](https://www.npmjs.com/package/@sharpapi/sharpapi-node-summarize-text) - Text summarization
- [@sharpapi/sharpapi-node-seo-tags](https://www.npmjs.com/package/@sharpapi/sharpapi-node-seo-tags) - SEO tags generation
- [@sharpapi/sharpapi-node-product-categories](https://www.npmjs.com/package/@sharpapi/sharpapi-node-product-categories) - Product categorization
- [@sharpapi/sharpapi-node-client](https://www.npmjs.com/package/@sharpapi/sharpapi-node-client) - Full SharpAPI SDK

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

---

## Support

- **Documentation**: [SharpAPI.com Documentation](https://sharpapi.com/documentation)
- **Issues**: [GitHub Issues](https://github.com/sharpapi/sharpapi-node-client/issues)
- **Email**: contact@sharpapi.com

---

**Powered by [SharpAPI](https://sharpapi.com/) - AI-Powered API Workflow Automation**
