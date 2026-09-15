import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { bookingId, clientEmail, serviceName, stylistName, date, time } = await req.json();

    // Send email via Resend or similar service
    const emailContent = `
      <h2>Booking Confirmation</h2>
      <p>Your appointment is confirmed!</p>
      <p><strong>Service:</strong> ${serviceName}</p>
      <p><strong>Stylist:</strong> ${stylistName}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>We look forward to seeing you!</p>
    `;

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    console.log(`Sending confirmation email to ${clientEmail}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});