import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { co2 } from '@tgwf/co2';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Basic validation to ensure protocol
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            // args: ['--no-sandbox', '--disable-setuid-sandbox'], // Useful for some environments
        });
        const page = await browser.newPage();

        // Enable request interception to count trackers/requests
        await page.setRequestInterception(true);

        let totalBytes = 0;
        let trackerCount = 0;
        const trackers = [];
        const trackerKeywords = ['analytics', 'pixel', 'ads', 'tracker', 'metric', 'doubleclick', 'facebook', 'connect'];

        page.on('request', (req) => {
            const reqUrl = req.url().toLowerCase();
            if (trackerKeywords.some(k => reqUrl.includes(k))) {
                trackerCount++;
                // Store distinct tracker domains/urls for the "Kill List"
                if (trackers.length < 12) { // Limit to 12 for UI
                    try {
                        const domain = new URL(reqUrl).hostname;
                        if (!trackers.some(t => t.domain === domain)) {
                            trackers.push({ domain, url: reqUrl });
                        }
                    } catch (e) { }
                }
            }
            req.continue();
        });

        page.on('response', async (res) => {
            try {
                const buffer = await res.buffer();
                totalBytes += buffer.length;
            } catch (e) {
                // Sometimes buffer fails on redirects or failed requests, ignore
            }
        });

        const startTime = Date.now();
        await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        const loadTime = (Date.now() - startTime) / 1000; // seconds

        // Calculate CO2
        const swd = new co2({ model: 'swd' });
        const emissions = swd.perByte(totalBytes);

        // Score Calculation (Simple Heuristic)
        // Base 100
        // - 5 per tracker
        // - 10 per MB
        // - 5 per sec load time
        const mb = totalBytes / (1024 * 1024);
        let score = 100 - (trackerCount * 2) - (mb * 5) - (loadTime * 2);
        if (score < 0) score = 0;

        let grade = 'A';
        if (score < 90) grade = 'B';
        if (score < 70) grade = 'C';
        if (score < 50) grade = 'D';
        if (score < 30) grade = 'F';

        return NextResponse.json({
            url: targetUrl,
            grade,
            score: Math.round(score),
            metrics: {
                loadTime: loadTime.toFixed(2),
                pageWeightMB: mb.toFixed(2),
                trackerCount,
                co2: emissions.toFixed(3),
            },
            trackers: trackers.map((t, i) => ({ ...t, id: i + 1 })),
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error("Audit Error:", error);
        return NextResponse.json({ error: 'Failed to audit URL', details: error.message }, { status: 500 });
    } finally {
        if (browser) await browser.close();
    }
}
