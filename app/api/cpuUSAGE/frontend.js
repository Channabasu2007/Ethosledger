'use client';
import { useState } from 'react';

export default function AuditPage() {
    const [url, setUrl] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAudit = async () => {
        setLoading(true);
        setData(null);
        try {
            const res = await fetch('/api/audit', {
                method: 'POST',
                body: JSON.stringify({ url: url.startsWith('http') ? url : `https://${url}` }),
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await res.json();
            setData(result);
        } catch (e) {
            alert("Error running audit: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>🔋 CPU Usage Auditor</h1>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Enter website URL..." 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button 
                    onClick={handleAudit} 
                    disabled={loading}
                    style={{ padding: '10px 20px', cursor: 'pointer', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    {loading ? 'Analyzing...' : 'Run Audit'}
                </button>
            </div>

            {data && (
                <div style={{ padding: '20px', border: '1px solid #eaeaea', borderRadius: '10px' }}>
                    <h3>Report for {url}</h3>
                    <p><strong>Average CPU Load:</strong> {data.cpuPercent}%</p>
                    <p><strong>CPU Active Time:</strong> {data.cpuTimeMs} ms</p>
                    <p style={{ color: data.cpuPercent > 15 ? 'red' : 'green' }}>
                        Result: {data.cpuPercent > 15 ? 'Heavy (Battery Drainer)' : 'Light (Battery Friendly)'}
                    </p>
                </div>
            )}
        </div>
    );
}