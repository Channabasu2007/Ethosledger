import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { co2 } from "@tgwf/co2";
import connect from '../../../lib/mongoose';
import Site from '../../../lib/models/Site';

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

    await page.setRequestInterception(true);
    let totalBytes = 0;
    let apiCallsCount = 0;
    const detectedTrackers = new Map();
    
    const trackerKeywords = [
      "analytics", "pixel", "ads", "tracker", "doubleclick", 
      "facebook", "connect", "tiktok", "gtag", "gtm", 
      "googletagmanager", "google-analytics", "gstatic"
    ];

    page.on("request", (req) => {
      const resourceType = req.resourceType();
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
      
      if ((resourceType === 'xhr' || resourceType === 'fetch') && !isTracker) {
        apiCallsCount++;
      }
      
      req.continue();
    });

    page.on("response", async (res) => {
      try {
        const buffer = await res.buffer();
        totalBytes += buffer.length;
      } catch (e) {}
    });

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
      const title = document.querySelector('title')?.innerText || '';
      const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
      const metaKeywords = document.querySelector('meta[name="keywords"]')?.content || '';
      
      const ogTitle = document.querySelector('meta[property="og:title"]')?.content || '';
      const ogDesc = document.querySelector('meta[property="og:description"]')?.content || '';
      const ogImage = document.querySelector('meta[property="og:image"]')?.content || '';
      
      const twitterCard = document.querySelector('meta[name="twitter:card"]')?.content || '';
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')?.content || '';
      
      const canonical = document.querySelector('link[rel="canonical"]')?.href || '';
      const robots = document.querySelector('meta[name="robots"]')?.content || '';
      
      const h1Count = document.querySelectorAll('h1').length;
      const h2Count = document.querySelectorAll('h2').length;
      const h1Text = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()).filter(Boolean);
      
      const images = document.querySelectorAll('img');
      const totalImages = images.length;
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === '').length;
      
      const allLinks = document.querySelectorAll('a');
      const totalLinks = allLinks.length;
      const internalLinks = Array.from(allLinks).filter(a => {
        try {
          return a.href && new URL(a.href).hostname === window.location.hostname;
        } catch { return false; }
      }).length;
      const externalLinks = totalLinks - internalLinks;
      const brokenLinks = Array.from(allLinks).filter(a => !a.href || a.href === '#' || a.href === 'javascript:void(0)').length;
      
      const structuredData = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .map(script => {
          try {
            return JSON.parse(script.innerText);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      
      const lang = document.documentElement.lang || '';
      const viewport = document.querySelector('meta[name="viewport"]')?.content || '';
      
      const bodyText = document.body.innerText || '';
      const wordCount = bodyText.trim().split(/\s+/).filter(word => word.length > 0).length;
      
      const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
      const isHttps = window.location.protocol === 'https:';
      
      return {
        title: { content: title, length: title.length, exists: title.length > 0 },
        metaDescription: { content: metaDesc, length: metaDesc.length, exists: metaDesc.length > 0 },
        metaKeywords: { content: metaKeywords, exists: metaKeywords.length > 0 },
        openGraph: {
          title: ogTitle, description: ogDesc, image: ogImage,
          exists: !!(ogTitle || ogDesc || ogImage),
          complete: !!(ogTitle && ogDesc && ogImage)
        },
        twitter: { card: twitterCard, title: twitterTitle, exists: !!(twitterCard || twitterTitle) },
        canonical: { url: canonical, exists: canonical.length > 0 },
        robots: { content: robots, exists: robots.length > 0 },
        headings: { h1Count, h2Count, h1Text, multipleH1: h1Count > 1, noH1: h1Count === 0 },
        images: {
          total: totalImages, withoutAlt: imagesWithoutAlt, withAlt: totalImages - imagesWithoutAlt,
          altCoverage: totalImages > 0 ? ((totalImages - imagesWithoutAlt) / totalImages * 100).toFixed(1) : 100
        },
        links: { total: totalLinks, internal: internalLinks, external: externalLinks, broken: brokenLinks },
        structuredData: {
          exists: structuredData.length > 0,
          count: structuredData.length,
          types: structuredData.map(d => d['@type']).filter(Boolean)
        },
        language: { code: lang, exists: lang.length > 0 },
        viewport: { content: viewport, exists: viewport.length > 0, isMobileFriendly: viewport.includes('width=device-width') },
        content: { wordCount },
        favicon: { exists: !!favicon },
        security: { isHttps }
      };
    });

    // Calculate SEO Score
    let seoScore = 0;
    const issues = [];
    const suggestions = [];

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

    const altCoverage = parseFloat(seoData.images.altCoverage);
    if (seoData.images.total === 0) {
      seoScore += 10;
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

    if (seoData.canonical.exists) seoScore += 5;
    else { issues.push("Missing canonical URL"); suggestions.push("Add a canonical link tag to prevent duplicate content issues"); }

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

    if (seoData.structuredData.exists) seoScore += 10;
    else { issues.push("No structured data found"); suggestions.push("Add schema.org structured data (JSON-LD) for rich snippets"); }

    if (seoData.language.exists) seoScore += 5;
    else { issues.push("Missing language attribute"); suggestions.push("Add lang attribute to <html> tag (e.g., <html lang='en'>)"); }

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

    if (seoData.security.isHttps) seoScore += 5;
    else { issues.push("Site not using HTTPS"); suggestions.push("Enable HTTPS for security and SEO benefits"); }

    if (seoData.favicon.exists) seoScore += 5;
    else { issues.push("Missing favicon"); suggestions.push("Add a favicon for better branding"); }

    let grade = 'F';
    if (seoScore >= 90) grade = 'A';
    else if (seoScore >= 80) grade = 'B';
    else if (seoScore >= 70) grade = 'C';
    else if (seoScore >= 60) grade = 'D';

    // --- CPU METRICS ---
    await new Promise((r) => setTimeout(r, 3000));
    
    const { metrics } = await client.send("Performance.getMetrics");
    const cpuTaskDuration = metrics.find((m) => m.name === "TaskDuration")?.value * 1000 || 0;
    const cpuPercent = Math.min(100, (cpuTaskDuration / 10000) * 100).toFixed(1);

    // --- FIXED CO2 CALCULATION ---
    const mb = totalBytes / (1024 * 1024);
    
    // Use the @tgwf/co2 library for accurate calculation
    const co2Instance = new co2({ model: "swd" });
    const co2Grams = co2Instance.perByte(totalBytes);

    // Calculate sustainability score based on actual CO2
    let sustainabilityScore;
    if (co2Grams <= 0.5) {
      sustainabilityScore = 100; // Excellent
    } else if (co2Grams <= 1.0) {
      sustainabilityScore = Math.round(100 - ((co2Grams - 0.5) / 0.5) * 20); // 100-80
    } else if (co2Grams <= 2.0) {
      sustainabilityScore = Math.round(80 - ((co2Grams - 1.0) / 1.0) * 30); // 80-50
    } else if (co2Grams <= 5.0) {
      sustainabilityScore = Math.round(50 - ((co2Grams - 2.0) / 3.0) * 40); // 50-10
    } else {
      sustainabilityScore = Math.max(0, Math.round(10 - ((co2Grams - 5.0) / 5.0) * 10)); // 10-0
    }

    // Detailed breakdown for transparency
    const sustainability = {
      source: 'tgwf_co2_library',
      model: 'swd',
      totalBytes: totalBytes,
      megabytes: Number(mb.toFixed(2)),
      co2Grams: Number(co2Grams.toFixed(3)),
      score: sustainabilityScore,
      // Additional context
      trackerPenalty: detectedTrackers.size * 0.02,
      apiCallPenalty: apiCallsCount * 0.01,
    };

    // Save to DB
    try {
      await connect();
      const host = new URL(targetUrl).hostname;
      const sitePayload = {
        url: targetUrl,
        host,
        title: seoData?.title?.content || '',
        score: Math.min(100, seoScore),
        scores: {
          sustainability: sustainabilityScore,
          seo: Math.min(100, seoScore)
        },
        metrics: {
          totalWeight: mb.toFixed(2),
          co2: co2Grams.toFixed(3),
          loadTime: finalLoadTime,
          trackerCount: detectedTrackers.size,
          apiCalls: apiCallsCount,
          cpuUsage: cpuPercent,
          sustainability,
        },
      };

      const existing = await Site.findOne({ url: targetUrl });
      if (existing) {
        Object.assign(existing, sitePayload);
        await existing.save();
      } else {
        await Site.create(sitePayload);
      }
    } catch (dbErr) {
      console.error('Failed to save audit result to DB:', dbErr?.message || dbErr);
    }

    return NextResponse.json({
      url: targetUrl,
      metrics: {
        totalWeight: mb.toFixed(2),
        co2: co2Grams.toFixed(3),
        loadTime: finalLoadTime,
        trackerCount: detectedTrackers.size,
        apiCalls: apiCallsCount,
        cpuUsage: cpuPercent,
        sustainability,
      },
      scores: {
        sustainability: sustainabilityScore,
        seo: Math.min(100, seoScore)
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