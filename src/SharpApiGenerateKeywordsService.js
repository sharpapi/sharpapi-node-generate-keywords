const { SharpApiCoreService, SharpApiJobTypeEnum } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for generating keywords from text using SharpAPI.com
 */
class SharpApiGenerateKeywordsService extends SharpApiCoreService {
  /**
   * Generates a list of unique keywords/tags based on the provided content.
   *
   * @param {string} text
   * @param {string|null} language
   * @param {number|null} maxQuantity
   * @param {string|null} voiceTone
   * @param {string|null} context
   * @returns {Promise<string>} - The status URL.
   */
  async generateKeywords(text, language = null, maxQuantity = null, voiceTone = null, context = null) {
    const data = { content: text };
    if (language) data.language = language;
    if (maxQuantity) data.max_quantity = maxQuantity;
    if (voiceTone) data.voice_tone = voiceTone;
    if (context) data.context = context;

    const response = await this.makeRequest('POST', SharpApiJobTypeEnum.CONTENT_KEYWORDS.url, data);
    return this.parseStatusUrl(response);
  }
}

module.exports = { SharpApiGenerateKeywordsService };