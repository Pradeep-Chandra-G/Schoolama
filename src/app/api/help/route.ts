import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Category mapping for better display names
const categoryMapping: Record<string, string> = {
  "getting-started": "Getting Started",
  "account-billing": "Account & Billing",
  "features": "Features & Functionality",
  "technical": "Technical Support",
  "user-management": "User Management",
  "training": "Training & Resources",
  "other": "Other"
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, category, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !category || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, category, subject, and message are required" },
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

    // Validate category
    if (!categoryMapping[category]) {
      return NextResponse.json(
        { error: "Invalid help category selected" },
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

    const categoryDisplayName = categoryMapping[category];

    // Email content for admin notification
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Help Request</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Support Ticket from Schoolama AI LMS</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">Support Request Details</h2>
          
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
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Help Category:</strong>
            <span style="color: #333; margin-left: 10px; background: #e3f2fd; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${categoryDisplayName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Subject:</strong>
            <span style="color: #333; margin-left: 10px;">${subject}</span>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Priority:</strong>
            <span style="color: #333; margin-left: 10px; background: ${
              category === 'technical' ? '#ffebee; color: #c62828' : 
              category === 'account-billing' ? '#fff3e0; color: #ef6c00' : 
              '#e8f5e8; color: #2e7d32'
            }; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${
              category === 'technical' ? 'HIGH' : 
              category === 'account-billing' ? 'MEDIUM' : 
              'NORMAL'
            }</span>
          </div>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e9ecef;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">Detailed Description</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            <p style="color: #333; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid #ffeaa7;">
          <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 16px;">📋 Action Required</h3>
          <div style="color: #856404; font-size: 14px; line-height: 1.6;">
            <strong>Response Time Target:</strong> ${
              category === 'technical' ? '4 hours' : 
              category === 'account-billing' ? '8 hours' : 
              '24 hours'
            }<br>
            <strong>Assigned To:</strong> ${
              category === 'technical' ? 'Technical Support Team' : 
              category === 'account-billing' ? 'Billing Department' :
              category === 'getting-started' ? 'Customer Success Team' :
              'General Support Team'
            }<br>
            <strong>Next Steps:</strong> Review request and respond to user with solution or additional questions
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            This support ticket was submitted from the Schoolama AI LMS Help Center<br>
            <strong>Timestamp:</strong> ${new Date().toLocaleString()}<br>
            <strong>Ticket ID:</strong> HELP-${Date.now()}<br>
            <strong>Reply to:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a>
          </p>
        </div>
      </div>
    `;

    // Send email to admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || "pradeepchandragajendra@schoolama.studio",
      subject: `[${categoryDisplayName}] Help Request: ${subject}`,
      html: adminEmailContent,
      replyTo: email,
    };

    await transporter.sendMail(adminMailOptions);

    // Auto-reply email content for user
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Hi ${name}! 👋</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your support request has been received</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">Support Ticket Summary</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Ticket ID:</strong>
            <span style="color: #333; margin-left: 10px; font-family: monospace; background: #e3f2fd; padding: 2px 8px; border-radius: 4px;">HELP-${Date.now()}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Category:</strong>
            <span style="color: #333; margin-left: 10px; background: #e3f2fd; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${categoryDisplayName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Subject:</strong>
            <span style="color: #333; margin-left: 10px;">${subject}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Submitted:</strong>
            <span style="color: #333; margin-left: 10px;">${new Date().toLocaleString()}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #667eea;">Expected Response Time:</strong>
            <span style="color: #333; margin-left: 10px;">${
              category === 'technical' ? 'Within 4 hours' : 
              category === 'account-billing' ? 'Within 8 hours' : 
              'Within 24 hours'
            }</span>
          </div>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e9ecef; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">Your Message</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
            <p style="color: #333; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e9ecef;">
          <h2 style="color: #333; margin-top: 0; font-size: 18px;">What's Next? 🚀</h2>
          
          <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
            <div style="background: #4CAF50; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; font-size: 14px; flex-shrink: 0;">1</div>
            <div>
              <h3 style="color: #333; margin: 0 0 8px 0; font-size: 16px;">We're Reviewing Your Request</h3>
              <p style="color: #666; margin: 0; font-size: 14px;">Our ${
                category === 'technical' ? 'technical support specialists' : 
                category === 'account-billing' ? 'billing team members' :
                category === 'getting-started' ? 'customer success experts' :
                'support team members'
              } are analyzing your request.</p>
            </div>
          </div>
          
          <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
            <div style="background: #2196F3; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; font-size: 14px; flex-shrink: 0;">2</div>
            <div>
              <h3 style="color: #333; margin: 0 0 8px 0; font-size: 16px;">You'll Hear From Us Soon</h3>
              <p style="color: #666; margin: 0; font-size: 14px;">We'll email you a detailed response or solution within our target timeframe.</p>
            </div>
          </div>
          
          <div style="display: flex; align-items: flex-start;">
            <div style="background: #FF9800; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; font-size: 14px; flex-shrink: 0;">3</div>
            <div>
              <h3 style="color: #333; margin: 0 0 8px 0; font-size: 16px;">We'll Follow Up</h3>
              <p style="color: #666; margin: 0; font-size: 14px;">If you need additional help, we're here to ensure you get the support you need.</p>
            </div>
          </div>
        </div>
        
        ${category === 'getting-started' ? `
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid #c8e6c9;">
          <h3 style="color: #2e7d32; margin: 0 0 15px 0; font-size: 16px;">🎯 Quick Start Resources</h3>
          <p style="color: #2e7d32; margin: 0 0 15px 0; font-size: 14px;">While you wait, here are some helpful resources to get you started:</p>
          <ul style="color: #2e7d32; font-size: 14px; margin: 0; padding-left: 20px;">
            <li><a href="https://schoolama-ai.vercel.app/help" style="color: #2e7d32; text-decoration: none;">📚 Browse our Knowledge Base</a></li>
            <li><a href="https://schoolama-ai.vercel.app" style="color: #2e7d32; text-decoration: none;">🚀 Start your free trial</a></li>
            <li><a href="#" style="color: #2e7d32; text-decoration: none;">🎥 Watch our tutorial videos</a></li>
          </ul>
        </div>
        ` : ''}
        
        <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid #b6d7ff;">
          <h3 style="color: #1565C0; margin: 0 0 15px 0; font-size: 16px;">🆘 Need Immediate Help?</h3>
          <p style="color: #1565C0; margin: 0 0 15px 0; font-size: 14px;">For urgent issues, you can:</p>
          <ul style="color: #1565C0; font-size: 14px; margin: 0; padding-left: 20px;">
            <li>💬 Use our live chat support (available 24/7)</li>
            <li>📧 Email us directly at <a href="mailto:${process.env.SMTP_USER}" style="color: #1565C0;">${process.env.SMTP_USER}</a></li>
            <li>📱 Call our support hotline: +1 (555) 123-HELP</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            Thank you for choosing Schoolama AI LMS! 🎓<br>
            <strong>The Schoolama Support Team</strong><br>
            <a href="https://schoolama-ai.vercel.app" style="color: #667eea; text-decoration: none;">schoolama-ai.vercel.app</a>
          </p>
          
          <p style="color: #999; font-size: 12px; margin-top: 15px;">
            This is an automated confirmation. Your ticket ID is <strong>HELP-${Date.now()}</strong><br>
            Please keep this email for your records. Do not reply to this email address.
          </p>
        </div>
      </div>
    `;

    // Send thank you email to user
    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `✅ Support Request Received - Ticket #HELP-${Date.now()} | Schoolama AI LMS`,
      html: userEmailContent,
    };

    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: "Your support request has been submitted successfully! We've sent you a confirmation email with your ticket number.",
        ticketId: `HELP-${Date.now()}`,
        category: categoryDisplayName,
        expectedResponseTime: category === 'technical' ? '4 hours' : 
                              category === 'account-billing' ? '8 hours' : 
                              '24 hours'
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
      { error: "Failed to submit support request. Please try again later or contact us directly." },
      { status: 500 }
    );
  }
}