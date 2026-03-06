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

    // Verify reCAPTCHA token
    try {
        const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
        const response = await fetch(googleVerifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
        });

        const data = await response.json();

        if (!data.success) {
            return { error: 'Invalid CAPTCHA' };
        }
    } catch (error) {
        return { error: 'Failed to verify CAPTCHA' };
    }

    // Insert into Supabase
    try {
        const { error } = await supabase
            .from('emails')
            .insert([{ email, role }]);

        if (error) {
            return { error: 'Failed to save email' };
        }

        return { success: true };
    } catch (error) {
        return { error: 'Unexpected error occurred' };
    }
}
