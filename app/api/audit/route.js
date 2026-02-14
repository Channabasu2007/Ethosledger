import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { co2 } from '@tgwf/co2';
import { URL } from 'url';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Ensure protocol is present
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    let browser;

    try {
        const mainDomain = new URL(targetUrl).hostname.replace('www.', '');
        
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Recommended for deployment
        });

        const page = await browser.newPage();
        await page.setRequestInterception(true);

        // State for metrics
        let totalBytes = 0;
        const detectedTrackers = new Map(); // Store unique trackers by host
        const trackerKeywords = ['analytics', 'pixel', 'ads', 'tracker', 'metric', 'doubleclick', 'facebook', 'connect'];

        // Logic: Intercept requests to identify trackers and third-parties
        page.on('request', (req) => {
            const reqUrl = req.url();
            const reqUrlLower = reqUrl.toLowerCase();
            
            try {
                const requestHost = new URL(reqUrl).hostname.replace('www.', '');
                
                // A request is flagged if it matches keywords OR is a third-party domain
                const isTrackerKeyword = trackerKeywords.some(k => reqUrlLower.includes(k));
                const isThirdParty = requestHost !== mainDomain && !reqUrl.startsWith('data:');

                if (isTrackerKeyword || isThirdParty) {
                    if (!detectedTrackers.has(requestHost)) {
                        detectedTrackers.set(requestHost, {
                            host: requestHost,
                            url: reqUrl,
                            type: isTrackerKeyword ? 'tracker' : 'third-party'
                        });
                    }
                }
            } catch (e) { /* Skip malformed URLs */ }
            
            req.continue();
        });

        // Logic: Monitor responses to calculate total page weight
        page.on('response', async (res) => {
            try {
                const buffer = await res.buffer();
                totalBytes += buffer.length;
            } catch (e) { /* Ignore redirects/failed buffers */ }
        });

        const startTime = Date.now();
        await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        const loadTime = (Date.now() - startTime) / 1000;

        // Calculate Environmental Impact
        const swd = new co2({ model: 'swd' });
        const emissions = swd.perByte(totalBytes);

        // Scoring Heuristic
        const mb = totalBytes / (1024 * 1024);
        const trackerCount = detectedTrackers.size;
        
        // Base 100 - (Penalties)
        let score = 100 - (trackerCount * 2) - (mb * 5) - (loadTime * 2);
        score = Math.max(0, Math.min(100, score)); // Clamp between 0-100

        // Grade Mapping
        const getGrade = (s) => {
            if (s >= 90) return 'A';
            if (s >= 70) return 'B';
            if (s >= 50) return 'C';
            if (s >= 30) return 'D';
            return 'F';
        };

        return NextResponse.json({
            url: targetUrl,
            grade: getGrade(score),
            score: Math.round(score),
            metrics: {
                loadTimeSeconds: loadTime.toFixed(2),
                pageWeightMB: mb.toFixed(2),
                trackerCount: trackerCount,
                co2Grams: emissions.toFixed(3),
            },
            // Return unique tracker/third-party list
            analysis: Array.from(detectedTrackers.values()).slice(0, 20), 
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error("Audit Error:", error);
        return NextResponse.json({ 
            error: 'Failed to audit URL', 
            details: error.message 
        }, { status: 500 });
    } finally {
        if (browser) await browser.close();
    }
}