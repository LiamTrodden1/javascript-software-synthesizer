import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Security Config', () => {
    let htmlContent: string;

    beforeAll(() => {
        const path = resolve(__dirname, '../index.html');
        htmlContent = readFileSync(path, 'utf8');
    });

    test('Index.html has CSP meta tag', () => {
        expect(htmlContent).toContain('http-equiv="Content-Security-Policy"');
    });

    test('CSP allows Google Tag Manager', () => {
        expect(htmlContent).toMatch(/script-src[^>]*https:\/\/www\.googletagmanager\.com/);
    });

    test('CSP allows Blobs for Tone.js Web Workers', () => {
        expect(htmlContent).toMatch(/worker-src[^>]*blob:/);
    });

    test('CSP allow inline styles for NexusUI components', () => {
        expect(htmlContent).toMatch(/style-src[^>]*'unsafe-inline'/);
    });

    test('CSP should not allow random scripts', () => {
        const isTooLoose = /script-src[^>]*\*/.test(htmlContent);
        expect(isTooLoose).toBe(false); 
    });
});