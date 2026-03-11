import request from 'supertest';
import app from './index.js';

describe('Express App - CI Tests', () => {

    // ── GET / ──────────────────────────────────────────
    describe('GET /', () => {
        it('should return 200 and welcome message', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe('Welcome to DevOps & CI-CD course !');
        });
    });

    // ── GET /health ────────────────────────────────────
    describe('GET /health', () => {
        it('should return 200 with JSON content-type', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toMatch(/json/);
        });

        it('should return status "ok" and version "1.0.0"', async () => {
            const res = await request(app).get('/health');
            expect(res.body).toEqual({ status: 'ok', version: '1.0.0' });
        });
    });

    // ── GET /users ─────────────────────────────────────
    describe('GET /users', () => {
        it('should return 200 with JSON content-type', async () => {
            const res = await request(app).get('/users');
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toMatch(/json/);
        });

        it('should return an array with at least one user', async () => {
            const res = await request(app).get('/users');
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should return a user with name and email fields', async () => {
            const res = await request(app).get('/users');
            const user = res.body[0];
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
        });

        it('should return John Doe as the first user', async () => {
            const res = await request(app).get('/users');
            expect(res.body[0]).toEqual({
                name: 'John Doe',
                email: 'john.doe@exemple.com'
            });
        });
    });

    // ── Route inexistante ──────────────────────────────
    describe('GET /unknown', () => {
        it('should return 404', async () => {
            const res = await request(app).get('/unknown');
            expect(res.statusCode).toBe(404);
        });
    });
});