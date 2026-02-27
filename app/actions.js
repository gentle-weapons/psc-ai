'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function submitEmailAction(email, role, captchaToken) {
    if (!email || !captchaToken) {
        return { error: 'Missing required fields' };
    }

    // 1. Verify reCAPTCHA token
    try {
        const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
        const response = await fetch(googleVerifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
        });

        const data = await response.json();

        if (!data.success) {
            console.error('reCAPTCHA validation failed:', data);
            return { error: 'Invalid CAPTCHA' };
        }
    } catch (error) {
        console.error('Error verifying CAPTCHA:', error);
        return { error: 'Failed to verify CAPTCHA' };
    }

    // 2. Insert into Supabase
    try {
        const { error } = await supabase
            .from('emails')
            .insert([{ email, role }]);

        if (error) {
            console.error('Supabase error:', error);
            return { error: 'Failed to save email' };
        }

        return { success: true };
    } catch (error) {
        console.error('Unexpected error:', error);
        return { error: 'Unexpected error occurred' };
    }
}
