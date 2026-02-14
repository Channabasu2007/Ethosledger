import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req) {
    let browser;
    try {
        const { url } = await req.json();
        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Clean the URL to ensure it has a protocol
        const targetUrl = url.startsWith('http') ? url : `https://${url}`;

        browser = await puppeteer.launch({ 
            headless: "new", 
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });

        const page = await browser.newPage();
        const client = await page.target().createCDPSession();
        await client.send('Performance.enable');

        const startTime = Date.now();
        
        // Navigate and wait for network to settle
        await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait 5 seconds to capture background energy drain (trackers/ads)
        await new Promise(r => setTimeout(r, 5000)); 

        const { metrics } = await client.send('Performance.getMetrics');
        const cpuWork = metrics.find(m => m.name === 'TaskDuration').value * 1000;
        const totalTime = Date.now() - startTime;

        await browser.close();

        return NextResponse.json({
            url: targetUrl,
            cpuPercent: ((cpuWork / totalTime) * 100).toFixed(2),
            cpuTimeMs: cpuWork.toFixed(0),
            totalTimeMs: totalTime
        });

    } catch (error) {
        if (browser) await browser.close();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}