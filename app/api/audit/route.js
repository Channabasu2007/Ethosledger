import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { co2 } from "@tgwf/co2";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });
  const targetUrl = url.startsWith("http") ? url : `https://${url}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      executablePath: "C:\\Users\\Lenovo\\.cache\\puppeteer\\chrome\\win64-145.0.7632.76\\chrome-win64\\chrome.exe",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send("Performance.enable");

    // --- FIXED: Only count actual API calls (XHR/Fetch) ---
    await page.setRequestInterception(true);
    let totalBytes = 0;
    let apiCallsCount = 0;
    const detectedTrackers = new Map();
    const trackerKeywords = ["analytics", "pixel", "ads", "tracker", "doubleclick", "facebook", "connect", "tiktok"];

    page.on("request", (req) => {
      const resourceType = req.resourceType();
      
      // Only count XHR and Fetch requests (actual API calls)
      if (resourceType === 'xhr' || resourceType === 'fetch') {
        apiCallsCount++;
      }
      
      const reqUrl = req.url().toLowerCase();
      const isTracker = trackerKeywords.some((k) => reqUrl.includes(k));

      if (isTracker) {
        try {
          const host = new URL(reqUrl).hostname;
          if (!detectedTrackers.has(host)) {
            detectedTrackers.set(host, { name: host, category: "Surveillance" });
          }
        } catch (e) {}
      }
      req.continue();
    });

    page.on("response", async (res) => {
      try {
        const buffer = await res.buffer();
        totalBytes += buffer.length;
      } catch (e) {}
    });

    // --- FIXED: Accurate load time measurement ---
    const navigationStart = Date.now();
    
    await page.goto(targetUrl, { 
      waitUntil: "load",
      timeout: 30000 
    });

    const timingData = await page.evaluate(() => {
      const [entry] = performance.getEntriesByType("navigation");
      if (!entry) return null;
      
      return {
        loadTime: (entry.loadEventEnd / 1000).toFixed(2),
        domContentLoaded: (entry.domContentLoadedEventEnd / 1000).toFixed(2),
        ttfb: (entry.responseStart / 1000).toFixed(2)
      };
    });

    const fallbackLoadTime = ((Date.now() - navigationStart) / 1000).toFixed(2);
    const finalLoadTime = timingData?.loadTime && parseFloat(timingData.loadTime) > 0 
      ? timingData.loadTime 
      : fallbackLoadTime;

    // --- SEO ANALYSIS ---
    const seoData = await page.evaluate(() => {
      // Title
      const title = document.querySelector('title')?.innerText || '';
      
      // Meta Description
      const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
      
      // Meta Keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]')?.content || '';
      
      // Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]')?.content || '';
      const ogDesc = document.querySelector('meta[property="og:description"]')?.content || '';
      const ogImage = document.querySelector('meta[property="og:image"]')?.content || '';
      
      // Twitter Card tags
      const twitterCard = document.querySelector('meta[name="twitter:card"]')?.content || '';
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')?.content || '';
      
      // Canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')?.href || '';
      
      // Robots meta tag
      const robots = document.querySelector('meta[name="robots"]')?.content || '';
      
      // Headings structure
      const h1Count = document.querySelectorAll('h1').length;
      const h2Count = document.querySelectorAll('h2').length;
      const h1Text = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()).filter(Boolean);
      
      // Images without alt text
      const images = document.querySelectorAll('img');
      const totalImages = images.length;
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === '').length;
      
      // Links
      const allLinks = document.querySelectorAll('a');
      const totalLinks = allLinks.length;
      const internalLinks = Array.from(allLinks).filter(a => {
        try {
          return a.href && new URL(a.href).hostname === window.location.hostname;
        } catch { return false; }
      }).length;
      const externalLinks = totalLinks - internalLinks;
      const brokenLinks = Array.from(allLinks).filter(a => !a.href || a.href === '#' || a.href === 'javascript:void(0)').length;
      
      // Structured Data (JSON-LD)
      const structuredData = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .map(script => {
          try {
            return JSON.parse(script.innerText);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      
      // Language attribute
      const lang = document.documentElement.lang || '';
      
      // Viewport meta tag (mobile-friendly)
      const viewport = document.querySelector('meta[name="viewport"]')?.content || '';
      
      // Word count (content length indicator)
      const bodyText = document.body.innerText || '';
      const wordCount = bodyText.trim().split(/\s+/).filter(word => word.length > 0).length;
      
      // Favicon
      const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
      
      // HTTPS check
      const isHttps = window.location.protocol === 'https:';
      
      return {
        title: {
          content: title,
          length: title.length,
          exists: title.length > 0
        },
        metaDescription: {
          content: metaDesc,
          length: metaDesc.length,
          exists: metaDesc.length > 0
        },
        metaKeywords: {
          content: metaKeywords,
          exists: metaKeywords.length > 0
        },
        openGraph: {
          title: ogTitle,
          description: ogDesc,
          image: ogImage,
          exists: !!(ogTitle || ogDesc || ogImage),
          complete: !!(ogTitle && ogDesc && ogImage)
        },
        twitter: {
          card: twitterCard,
          title: twitterTitle,
          exists: !!(twitterCard || twitterTitle)
        },
        canonical: {
          url: canonical,
          exists: canonical.length > 0
        },
        robots: {
          content: robots,
          exists: robots.length > 0
        },
        headings: {
          h1Count,
          h2Count,
          h1Text,
          multipleH1: h1Count > 1,
          noH1: h1Count === 0
        },
        images: {
          total: totalImages,
          withoutAlt: imagesWithoutAlt,
          withAlt: totalImages - imagesWithoutAlt,
          altCoverage: totalImages > 0 ? ((totalImages - imagesWithoutAlt) / totalImages * 100).toFixed(1) : 100
        },
        links: {
          total: totalLinks,
          internal: internalLinks,
          external: externalLinks,
          broken: brokenLinks
        },
        structuredData: {
          exists: structuredData.length > 0,
          count: structuredData.length,
          types: structuredData.map(d => d['@type']).filter(Boolean)
        },
        language: {
          code: lang,
          exists: lang.length > 0
        },
        viewport: {
          content: viewport,
          exists: viewport.length > 0,
          isMobileFriendly: viewport.includes('width=device-width')
        },
        content: {
          wordCount
        },
        favicon: {
          exists: !!favicon
        },
        security: {
          isHttps
        }
      };
    });

    // Calculate SEO Score (0-100)
    let seoScore = 0;
    const issues = [];
    const suggestions = [];

    // Title (10 points)
    if (seoData.title.exists && seoData.title.length >= 30 && seoData.title.length <= 60) {
      seoScore += 10;
    } else if (!seoData.title.exists) {
      issues.push("Missing page title");
      suggestions.push("Add a descriptive title tag (30-60 characters)");
    } else if (seoData.title.length < 30) {
      issues.push("Title too short (" + seoData.title.length + " characters)");
      suggestions.push("Expand title to at least 30 characters");
      seoScore += 5;
    } else {
      issues.push("Title too long (" + seoData.title.length + " characters)");
      suggestions.push("Shorten title to under 60 characters");
      seoScore += 5;
    }

    // Meta Description (10 points)
    if (seoData.metaDescription.exists && seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160) {
      seoScore += 10;
    } else if (!seoData.metaDescription.exists) {
      issues.push("Missing meta description");
      suggestions.push("Add a meta description (120-160 characters)");
    } else if (seoData.metaDescription.length < 120) {
      issues.push("Meta description too short (" + seoData.metaDescription.length + " characters)");
      suggestions.push("Expand meta description to at least 120 characters");
      seoScore += 5;
    } else {
      issues.push("Meta description too long (" + seoData.metaDescription.length + " characters)");
      suggestions.push("Shorten meta description to under 160 characters");
      seoScore += 5;
    }

    // H1 Tags (10 points)
    if (seoData.headings.h1Count === 1) {
      seoScore += 10;
    } else if (seoData.headings.noH1) {
      issues.push("Missing H1 tag");
      suggestions.push("Add exactly one H1 tag to the page");
    } else if (seoData.headings.multipleH1) {
      issues.push("Multiple H1 tags detected (" + seoData.headings.h1Count + " found)");
      suggestions.push("Use only one H1 tag per page");
      seoScore += 5;
    }

    // Images Alt Text (10 points)
    const altCoverage = parseFloat(seoData.images.altCoverage);
    if (seoData.images.total === 0) {
      seoScore += 10; // No images, so no issues
    } else if (altCoverage === 100) {
      seoScore += 10;
    } else if (altCoverage >= 80) {
      seoScore += 7;
      issues.push(seoData.images.withoutAlt + " of " + seoData.images.total + " images missing alt text");
      suggestions.push("Add alt text to all images for accessibility and SEO");
    } else if (altCoverage >= 50) {
      seoScore += 5;
      issues.push(seoData.images.withoutAlt + " of " + seoData.images.total + " images missing alt text");
      suggestions.push("Add alt text to all images for accessibility and SEO");
    } else {
      issues.push(seoData.images.withoutAlt + " of " + seoData.images.total + " images missing alt text");
      suggestions.push("Add alt text to all images for accessibility and SEO");
      seoScore += 2;
    }

    // Canonical URL (5 points)
    if (seoData.canonical.exists) {
      seoScore += 5;
    } else {
      issues.push("Missing canonical URL");
      suggestions.push("Add a canonical link tag to prevent duplicate content issues");
    }

    // Open Graph (10 points)
    if (seoData.openGraph.complete) {
      seoScore += 10;
    } else if (seoData.openGraph.exists) {
      seoScore += 5;
      issues.push("Incomplete Open Graph tags");
      suggestions.push("Add complete Open Graph tags (og:title, og:description, og:image) for better social sharing");
    } else {
      issues.push("Missing Open Graph tags");
      suggestions.push("Add Open Graph tags for better social media sharing");
    }

    // Mobile Friendly (10 points)
    if (seoData.viewport.isMobileFriendly) {
      seoScore += 10;
    } else if (seoData.viewport.exists) {
      seoScore += 5;
      issues.push("Viewport not optimized for mobile");
      suggestions.push("Use viewport meta tag: width=device-width, initial-scale=1");
    } else {
      issues.push("Missing viewport meta tag");
      suggestions.push("Add viewport meta tag for mobile responsiveness");
    }

    // Structured Data (10 points)
    if (seoData.structuredData.exists) {
      seoScore += 10;
    } else {
      issues.push("No structured data found");
      suggestions.push("Add schema.org structured data (JSON-LD) for rich snippets");
    }

    // Language (5 points)
    if (seoData.language.exists) {
      seoScore += 5;
    } else {
      issues.push("Missing language attribute");
      suggestions.push("Add lang attribute to <html> tag (e.g., <html lang='en'>)");
    }

    // Content Length (10 points)
    if (seoData.content.wordCount >= 300) {
      seoScore += 10;
    } else if (seoData.content.wordCount >= 150) {
      seoScore += 5;
      issues.push("Content is thin (" + seoData.content.wordCount + " words)");
      suggestions.push("Add more quality content (aim for 300+ words)");
    } else {
      issues.push("Very thin content (" + seoData.content.wordCount + " words)");
      suggestions.push("Add substantial content (aim for 300+ words)");
    }

    // Links (5 points)
    if (seoData.links.broken === 0 && seoData.links.internal >= 3) {
      seoScore += 5;
    } else if (seoData.links.broken > 0) {
      issues.push(seoData.links.broken + " broken or empty links found");
      suggestions.push("Fix or remove broken links");
      seoScore += 2;
    } else if (seoData.links.internal < 3) {
      issues.push("Few internal links (" + seoData.links.internal + " found)");
      suggestions.push("Add more internal links to improve site navigation");
      seoScore += 3;
    }

    // HTTPS (5 points)
    if (seoData.security.isHttps) {
      seoScore += 5;
    } else {
      issues.push("Site not using HTTPS");
      suggestions.push("Enable HTTPS for security and SEO benefits");
    }

    // Favicon (5 points)
    if (seoData.favicon.exists) {
      seoScore += 5;
    } else {
      issues.push("Missing favicon");
      suggestions.push("Add a favicon for better branding");
    }

    // Determine grade
    let grade = 'F';
    if (seoScore >= 90) grade = 'A';
    else if (seoScore >= 80) grade = 'B';
    else if (seoScore >= 70) grade = 'C';
    else if (seoScore >= 60) grade = 'D';

    // Capture CPU metrics
    await new Promise((r) => setTimeout(r, 2000));
    const { metrics } = await client.send("Performance.getMetrics");
    const cpuTaskDuration = metrics.find((m) => m.name === "TaskDuration")?.value * 1000 || 0;
    const cpuPercent = Math.min(100, (cpuTaskDuration / 3000) * 100).toFixed(1);

    // --- FINAL CALCULATION ---
    const mb = totalBytes / (1024 * 1024);
    const co2Emissions = new co2({ model: "swd" }).perByte(totalBytes);

    return NextResponse.json({
      url: targetUrl,
      metrics: {
        totalWeight: mb.toFixed(2),
        co2: co2Emissions.toFixed(3),
        loadTime: finalLoadTime,
        trackerCount: detectedTrackers.size,
        apiCalls: apiCallsCount,
        cpuUsage: cpuPercent,
      },
      seo: {
        score: Math.min(100, seoScore),
        grade: grade,
        issues: issues,
        suggestions: suggestions,
        details: seoData
      },
      killList: Array.from(detectedTrackers.values()),
      timeline: [
        { year: "2020", size: (mb * 0.45).toFixed(2) },
        { year: "2026", size: mb.toFixed(2) },
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (browser) await browser.close();
  }
}