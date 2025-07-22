import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, phone, subject, message } =
      await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error("SMTP configuration error:", error);
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 }
      );
    }

    // Email content for admin notification
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">From Schoolama AI LMS Website</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">Contact Information</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Name:</strong>
            <span style="color: #333; margin-left: 10px;">${name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Email:</strong>
            <span style="color: #333; margin-left: 10px;">
              <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
            </span>
          </div>

          ${
            company
              ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">School/Organization:</strong>
            <span style="color: #333; margin-left: 10px;">${company}</span>
          </div>`
              : ""
          }

          ${
            phone
              ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Phone:</strong>
            <span style="color: #333; margin-left: 10px;">
              <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>
            </span>
          </div>`
              : ""
          }
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Subject:</strong>
            <span style="color: #333; margin-left: 10px;">${subject}</span>
          </div>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e9ecef;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">Message</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            <p style="color: #333; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            This message was sent from the Schoolama AI LMS contact form<br>
            <strong>Timestamp:</strong> ${new Date().toLocaleString()}<br>
            <strong>Reply to:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a>
          </p>
        </div>
      </div>
    `;

    // Send email to admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || "pradeepchandragajendra@schoolama.studio",
      subject: `New Contact Form Submission: ${subject}`,
      html: adminEmailContent,
      replyTo: email, // This allows you to reply directly to the user
    };

    await transporter.sendMail(adminMailOptions);

    // Auto-reply email content for user
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${name}!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">We've received your message</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">Your Message Summary</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Subject:</strong>
            <span style="color: #333; margin-left: 10px;">${subject}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Submitted on:</strong>
            <span style="color: #333; margin-left: 10px;">${new Date().toLocaleString()}</span>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
            <p style="color: #333; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e9ecef;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">What happens next?</h2>
          <ul style="color: #666; line-height: 1.6; margin: 15px 0;">
            <li>Our team will review your message within 24 hours</li>
            <li>We'll get back to you via email with a personalized response</li>
            <li>If you requested a demo, we'll schedule a convenient time for you</li>
            <li>For urgent matters, you can also reach us at <a href="mailto:${process.env.SMTP_USER}" style="color: #667eea; text-decoration: none;">${process.env.SMTP_USER}</a></li>
          </ul>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="color: #333; margin: 0;">
              In the meantime, feel free to explore our platform with a 
              <a href="https://schoolama-ai.vercel.app" style="color: #667eea; text-decoration: none; font-weight: bold;">free trial</a>.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            Best regards,<br>
            <strong>The Schoolama AI LMS Team</strong><br>
            <a href="https://schoolama-ai.vercel.app" style="color: #667eea; text-decoration: none;">schoolama-ai.vercel.app</a>
          </p>
          
          <p style="color: #999; font-size: 12px; margin-top: 15px;">
            This is an automated response. Please do not reply to this email.<br>
            For questions, contact us at <a href="mailto:${process.env.SMTP_USER}" style="color: #667eea;">${process.env.SMTP_USER}</a>
          </p>
        </div>
      </div>
    `;

    // Send thank you email to user
    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email, // Send to the user's email address
      subject: `Thank you for contacting Schoolama AI LMS - We'll be in touch soon!`,
      html: userEmailContent,
    };

    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for your message! We've sent a confirmation email to your address and will get back to you soon.",
        userEmail: email // Confirm which email the thank you was sent to
      },
      { status: 200 }
    );
  } catch (error) {
  console.error("Email sending error:", error);

  if (typeof error === "object" && error !== null && "code" in error) {
    const err = error as { code?: string; message?: string };

    if (err.code === "EAUTH") {
      return NextResponse.json(
        { error: "Email authentication failed. Please check SMTP credentials." },
        { status: 500 }
      );
    }

    if (err.code === "ECONNECTION") {
      return NextResponse.json(
        { error: "Failed to connect to email server. Please try again later." },
        { status: 500 }
      );
    }
  }

  // Generic fallback
  return NextResponse.json(
    { error: "Failed to send email. Please try again later." },
    { status: 500 }
  );
}
}