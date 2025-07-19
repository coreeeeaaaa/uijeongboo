/**
 * SAAAAHA Design System Preference Tracker
 * 
 * This module tracks and evolves design preferences based on user feedback
 * Other agents can read and apply these preferences
 */

class SaaaahaPreferenceTracker {
  constructor() {
    this.preferencesPath = './user-preferences.json';
    this.tokensPath = './design-tokens.json';
    this.version = '1.0.0';
  }

  /**
   * Load current preferences
   */
  async loadPreferences() {
    try {
      const fs = require('fs').promises;
      const data = await fs.readFile(this.preferencesPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Initialize with defaults if file doesn't exist
      return this.getDefaultPreferences();
    }
  }

  /**
   * Get default preferences based on established patterns
   */
  getDefaultPreferences() {
    return {
      version: this.version,
      lastUpdated: new Date().toISOString(),
      
      designPhilosophy: {
        core: "깔끔한 도형, 완벽한 원, 픽셀 깨짐 없음",
        inspirations: ["Apple Design", "Minimalism", "Geometric Precision"]
      },
      
      visualPreferences: {
        shapes: {
          circles: {
            quality: "perfect",
            antialiasing: "4x supersampling",
            edges: "smooth",
            distortion: "none"
          },
          corners: {
            style: "macOS rounded",
            radius: "20%"
          }
        },
        
        colors: {
          primary: "#32CD32", // Lime
          secondary: "#000000", // Black
          accent: "#FFFFFF", // White
          evolution: []
        },
        
        spacing: {
          philosophy: "mathematical precision",
          baseUnit: 8,
          iconPadding: "15%"
        }
      },
      
      technicalPreferences: {
        rendering: {
          antialiasing: true,
          supersampling: 4,
          algorithm: "Lanczos"
        },
        formats: {
          raster: ["PNG", "ICO", "ICNS"],
          vector: ["SVG"] // Future addition
        }
      },
      
      feedbackHistory: [],
      evolutionLog: []
    };
  }

  /**
   * Record user feedback and evolve preferences
   */
  async recordFeedback(feedback) {
    const preferences = await this.loadPreferences();
    
    // Add to feedback history
    preferences.feedbackHistory.push({
      timestamp: new Date().toISOString(),
      feedback: feedback,
      applied: false
    });
    
    // Analyze and apply feedback
    const evolution = this.analyzeFeedback(feedback, preferences);
    if (evolution) {
      preferences.evolutionLog.push(evolution);
      this.applyEvolution(evolution, preferences);
    }
    
    // Save updated preferences
    await this.savePreferences(preferences);
    
    return evolution;
  }

  /**
   * Analyze feedback and determine evolution
   */
  analyzeFeedback(feedback, currentPrefs) {
    const keywords = {
      colors: ['색', 'color', '컬러', '색상'],
      shapes: ['모양', 'shape', '도형', '원', 'circle'],
      quality: ['품질', 'quality', '퀄리티', '깨짐', 'pixelation'],
      spacing: ['간격', 'spacing', '여백', 'padding']
    };
    
    // Detect category
    let category = null;
    for (const [key, terms] of Object.entries(keywords)) {
      if (terms.some(term => feedback.toLowerCase().includes(term))) {
        category = key;
        break;
      }
    }
    
    if (!category) return null;
    
    return {
      timestamp: new Date().toISOString(),
      category: category,
      feedback: feedback,
      action: 'recorded for future evolution'
    };
  }

  /**
   * Apply evolution to preferences
   */
  applyEvolution(evolution, preferences) {
    // This is where specific preference updates would happen
    // Based on accumulated feedback patterns
    preferences.lastUpdated = new Date().toISOString();
  }

  /**
   * Save preferences
   */
  async savePreferences(preferences) {
    const fs = require('fs').promises;
    await fs.writeFile(
      this.preferencesPath,
      JSON.stringify(preferences, null, 2),
      'utf8'
    );
  }

  /**
   * Get current design recommendations for other agents
   */
  async getRecommendations() {
    const preferences = await this.loadPreferences();
    
    return {
      mustHave: [
        "Perfect circles with antialiasing",
        "No pixelation or edge distortion",
        "Lime color #32CD32",
        "Black background #000000",
        "15% padding for icons",
        "macOS style rounded corners (20%)"
      ],
      
      avoid: [
        "Jagged edges",
        "Color variations from specified hex",
        "Inconsistent spacing",
        "Low resolution rendering"
      ],
      
      technical: {
        rendering: preferences.technicalPreferences.rendering,
        formats: preferences.technicalPreferences.formats
      }
    };
  }
}

module.exports = SaaaahaPreferenceTracker;