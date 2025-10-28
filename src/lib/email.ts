import { Resend } from 'resend'

// Initialize Resend only if API key is provided
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  // Skip if Resend is not configured
  if (!resend) {
    console.log('Email sending skipped - RESEND_API_KEY not configured')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: from || process.env.EMAIL_FROM || 'Auxilium Consult <noreply@auxiliumconsult.com>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email send exception:', error)
    return { success: false, error }
  }
}

// Email templates
export const emailTemplates = {
  newMessage: (recipientName: string, subject: string, sender: string, content: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; margin: 20px 0; }
          .message-box { background: white; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Message from ${sender}</h1>
          </div>
          <div class="content">
            <p>Dear ${recipientName},</p>
            <p>You have received a new message regarding: <strong>${subject}</strong></p>
            <div class="message-box">
              <p>${content}</p>
            </div>
            <p>
              <a href="${process.env.NEXTAUTH_URL}/admin/messages" class="button">View Message</a>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Auxilium Consult. All rights reserved.</p>
            <p>This is an automated message. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  projectUpdate: (clientName: string, projectName: string, updateTitle: string, description: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; margin: 20px 0; }
          .update-box { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Project Update: ${projectName}</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            <p>There is a new update on your project:</p>
            <div class="update-box">
              <h2 style="margin-top: 0; color: #1e3a8a;">${updateTitle}</h2>
              <p>${description}</p>
            </div>
            <p>
              <a href="${process.env.NEXTAUTH_URL}/client/dashboard" class="button">View Project Details</a>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Auxilium Consult. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  milestoneCompleted: (clientName: string, projectName: string, milestoneTitle: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; margin: 20px 0; }
          .milestone-box { background: white; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 12px 24px; background: #f59e0b; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .checkmark { font-size: 48px; color: #10b981; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Milestone Completed!</h1>
          </div>
          <div class="content">
            <div class="checkmark">✓</div>
            <p>Dear ${clientName},</p>
            <p>Great news! A milestone has been completed on your project:</p>
            <div class="milestone-box">
              <h3 style="margin-top: 0; color: #1e3a8a;">Project: ${projectName}</h3>
              <p><strong>Milestone:</strong> ${milestoneTitle}</p>
            </div>
            <p>
              <a href="${process.env.NEXTAUTH_URL}/client/dashboard" class="button">View Project Progress</a>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Auxilium Consult. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  newClientWelcome: (clientName: string, companyName: string, email: string, tempPassword: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; margin: 20px 0; }
          .credentials-box { background: #fef3c7; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 12px 24px; background: #1e3a8a; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Auxilium Consult</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            <p>Welcome! Your client portal account has been created for ${companyName}.</p>
            <div class="credentials-box">
              <h3 style="margin-top: 0;">Your Login Credentials</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Temporary Password:</strong> ${tempPassword}</p>
              <p style="color: #b45309; margin-top: 15px;">
                <strong>Important:</strong> Please change your password after your first login.
              </p>
            </div>
            <p>
              <a href="${process.env.NEXTAUTH_URL}/auth/signin" class="button">Access Client Portal</a>
            </p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Auxilium Consult. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,
}
