/**
 * Schema.org Video Generator
 * Generuje schema markup dla filmów YouTube na stronie
 */

class SchemaGenerator {
  /**
   * Generuje VideoObject schema dla pojedynczego wideo
   * @param {Object} video - Obiekt z danymi wideo z YouTube API
   * @returns {Object} Schema.org VideoObject
   */
  static generateVideoSchema(video) {
    const videoId =
      video.id?.videoId || video.snippet?.resourceId?.videoId || video.id || "";
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    // Wyciągnij długość wideo w formacie ISO 8601
    const duration = video.contentDetails?.duration || "PT0S";

    // Data publikacji
    const uploadDate = video.snippet?.publishedAt || video.publishedAtRaw || new Date().toISOString();

    // Thumbnail (najwyższa jakość dostępna)
    const thumbnailUrl =
      video.thumbnail ||
      video.snippet?.thumbnails?.maxres?.url ||
      video.snippet?.thumbnails?.high?.url ||
      video.snippet?.thumbnails?.medium?.url ||
      video.snippet?.thumbnails?.default?.url;

    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.title || video.snippet?.title || "",
      description: video.snippet?.description || "",
      thumbnailUrl: thumbnailUrl,
      uploadDate: uploadDate,
      duration: duration,
      contentUrl: videoUrl,
      embedUrl: embedUrl,
      publisher: {
        "@type": "Organization",
        name: "Bruxa Gaming",
        logo: {
          "@type": "ImageObject",
          url: "https://bruxa-tomb-raider.vercel.app/assets/images/logo.png",
        },
      },
      author: {
        "@type": "Person",
        name: "Bruxa Gaming",
      },
      inLanguage: "pl-PL",
    };
  }

  /**
   * Wstrzykuje schema markup do DOM
   * @param {Object} schema - Schema.org object
   */
  static injectSchema(schema) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  /**
   * Generuje schema dla listy wideo (ItemList)
   * @param {Array} videos - Tablica obiektów wideo
   * @param {String} listName - Nazwa listy
   * @returns {Object} Schema.org ItemList
   */
  static generateVideoListSchema(videos, listName = "Tomb Raider Gameplays") {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: listName,
      description: `Lista ${videos.length} filmów z gameplay Tomb Raider`,
      itemListElement: videos.map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoObject",
          name: video.title || video.snippet?.title || "",
          url: `https://www.youtube.com/watch?v=${
            video.id?.videoId || video.snippet?.resourceId?.videoId || video.id || ""
          }`,
          thumbnailUrl: video.thumbnail || video.snippet?.thumbnails?.high?.url || "",
        },
      })),
    };
  }
}

// Export dla użycia w innych plikach
if (typeof module !== "undefined" && module.exports) {
  module.exports = SchemaGenerator;
}

// Export dla window (global scope)
if (typeof window !== "undefined") {
  window.SchemaGenerator = SchemaGenerator;
}
