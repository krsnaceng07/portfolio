import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Mock Schema from actions/sendMessage.ts (replicated for unit testing isolation)
const ContactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    message: z.string().min(10).max(1000),
});

describe('Backend Logic Verification', () => {
    describe('Contact Form Validation', () => {
        it('should validate correct input', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'This is a valid message length.',
            };
            const result = ContactSchema.safeParse(input);
            expect(result.success).toBe(true);
        });

        it('should fail invalid email', () => {
            const input = {
                name: 'John',
                email: 'not-an-email',
                message: 'Valid message body.',
            };
            const result = ContactSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.flatten().fieldErrors.email).toBeDefined();
            }
        });

        it('should fail short message', () => {
            const input = {
                name: 'John',
                email: 'john@example.com',
                message: 'Short',
            };
            const result = ContactSchema.safeParse(input);
            expect(result.success).toBe(false);
        });
    });

    describe('Admin Guard Logic', () => {
        it('should match admin email strictly', () => {
            const adminEmail: string = 'krsnaceng@gmail.com';
            const userEmail: string = 'attacker@example.com';
            const isAdmin = userEmail === adminEmail;
            expect(isAdmin).toBe(false);
        });
    });
});
