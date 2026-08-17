import type { APIRoute } from 'astro';
import { appendToGoogleSheet } from '../../lib/googleSheets';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Save to Google Sheets
    const result = await appendToGoogleSheet(data);

    if (result.success) {
      return new Response(JSON.stringify({ success: true, message: 'Message sent successfully.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Failed to send message.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
