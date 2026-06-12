interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

export function generateDonationEmail(donation: any, type: string): EmailContent {
  const donorName = `${donation.firstName} ${donation.lastName}`;
  const amount = donation.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const transactionId = donation._id.toString();
  const paymentRef = donation.stripePaymentIntentId || donation.stripeSessionId || "N/A";
  const receiptNumber = donation.donationId || transactionId;
  const paymentMethod = (donation.paymentMethod || "Stripe Card").toUpperCase();
  const paymentDate = new Date(donation.createdAt || Date.now()).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const isGala = type === "gala_ticket_confirmation";

  if (isGala) {
    const ticketType = donation.ticketType || "Gala Event Ticket";
    const subject = "Los Angeles Gala Event Ticket Confirmation - Vidya Bharati Foundation of USA";

    const text = `Dear ${donation.firstName},

Thank you for purchasing a ticket to the Los Angeles Gala Event. We have received your payment of $${amount}.

Ticket Details:
- Ticket Type: ${ticketType}
- Quantity: 1
- Amount: $${amount}
- Transaction ID: ${transactionId}
- Payment Reference: ${paymentRef}
- Booking Date: ${paymentDate}
- Payment Method: ${paymentMethod}
- Receipt Number: ${receiptNumber}
${donation.seatNumber ? `- Seat Number: ${donation.seatNumber}\n` : ""}${donation.tableNumber ? `- Table Number: ${donation.tableNumber}\n` : ""}${donation.zone ? `- Zone: ${donation.zone}\n` : ""}
Event Information:
- Event: Los Angeles Gala Event
- Date & Time: Sunday, July 26, 2026
- Venue: Sheraton Cerritos Hotel, Cerritos, California

Vidya Bharati Foundation of USA is a 501(c)(3) tax-exempt organization (EIN: 47-4676188). Please retain this email for your records.

We sincerely appreciate your support and look forward to seeing you at the event.

Warm Regards,
Vidya Bharati Foundation of USA
Address: 29 Olde Hamlet Dr., Jericho, NY 11237
Contact: support@vidyabharatiusa.org | Website: www.vidyabharatiusa.org`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0A1128; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">GALA EVENT TICKET CONFIRMATION</h1>
              <div style="width: 60px; height: 3px; background-color: #D4AF37; margin: 15px auto 0 auto; border-radius: 2px;"></div>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px; color: #1e293b;">
              <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Dear <strong style="color: #0A1128;">${donation.firstName}</strong>,</p>
              <p style="font-size: 16px; line-height: 1.6;">Thank you for purchasing a ticket to the <strong>Los Angeles Gala Event</strong>. We have received your payment of <strong style="color: #0A1128;">$${amount}</strong>. Below are your booking details.</p>
              
              <!-- Ticket Details Card -->
              <table width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 30px 0; border-collapse: separate; border-spacing: 0;">
                <tr>
                  <td style="padding: 20px;" colspan="2">
                    <h3 style="margin: 0 0 15px 0; color: #0A1128; font-size: 16px; font-weight: 700; border-b: 1px solid #e2e8f0; padding-bottom: 8px;">Ticket Details</h3>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr style="font-size: 14px; line-height: 2;">
                        <td width="40%" style="color: #64748b; font-weight: 500;">Ticket Type:</td>
                        <td width="60%" style="color: #0A1128; font-weight: 700;">${ticketType}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Amount Paid:</td>
                        <td style="color: #0A1128; font-weight: 700;">$${amount} ${donation.currency || "USD"}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Transaction ID:</td>
                        <td style="color: #0A1128; font-family: monospace; font-size: 13px;">${transactionId}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Reference Number:</td>
                        <td style="color: #0A1128; font-family: monospace; font-size: 13px;">${paymentRef}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Receipt Number:</td>
                        <td style="color: #0A1128; font-family: monospace; font-size: 13px;">${receiptNumber}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Booking Date:</td>
                        <td style="color: #0A1128;">${paymentDate}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Payment Method:</td>
                        <td style="color: #0A1128;">${paymentMethod}</td>
                      </tr>
                      ${donation.seatNumber ? `
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Seat Number:</td>
                        <td style="color: #0A1128; font-weight: 700;">${donation.seatNumber}</td>
                      </tr>` : ""}
                      ${donation.tableNumber ? `
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Table Number:</td>
                        <td style="color: #0A1128; font-weight: 700;">${donation.tableNumber}</td>
                      </tr>` : ""}
                      ${donation.zone ? `
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Zone:</td>
                        <td style="color: #0A1128; font-weight: 700;">${donation.zone}</td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Venue Details Card -->
              <table width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 30px; border-collapse: separate; border-spacing: 0;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; color: #0A1128; font-size: 16px; font-weight: 700; border-b: 1px solid #e2e8f0; padding-bottom: 8px;">Event & Venue Information</h3>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr style="font-size: 14px; line-height: 2;">
                        <td width="30%" style="color: #64748b; font-weight: 500;">Event Name:</td>
                        <td width="70%" style="color: #0A1128; font-weight: 700;">Los Angeles Gala Event</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Date & Time:</td>
                        <td style="color: #0A1128;">Sunday, July 26, 2026</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Venue:</td>
                        <td style="color: #0A1128; font-weight: 600;">Sheraton Cerritos Hotel, Cerritos, California</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; line-height: 1.6; color: #64748b; font-style: italic; background-color: #f8fafc; border-left: 4px solid #D4AF37; padding: 12px 16px; margin: 30px 0;">
                "Vidya Bharati Foundation of USA is a 501(c)(3) tax-exempt organization (EIN: 47-4676188). Please retain this email for your records."
              </p>

              <p style="font-size: 16px; line-height: 1.6;">We sincerely appreciate your support and look forward to seeing you at the event.</p>
              
              <p style="margin: 40px 0 0 0; font-size: 16px; line-height: 1.6; color: #0A1128;">
                Warm Regards,<br/>
                <strong>Vidya Bharati Foundation of USA</strong>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.8;">
                <strong>Vidya Bharati Foundation of USA</strong><br/>
                Address: 29 Olde Hamlet Dr., Jericho, NY 11237<br/>
                promoting education, culture, and community service.<br/>
                Email: <a href="mailto:support@vidyabharatiusa.org" style="color: #D4AF37; text-decoration: none; font-weight: 600;">support@vidyabharatiusa.org</a> | Web: <a href="https://www.vidyabharatiusa.org" target="_blank" style="color: #D4AF37; text-decoration: none; font-weight: 600;">www.vidyabharatiusa.org</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    return { subject, html, text };
  } else {
    const subject = "Thank You for Supporting Vidya Bharati Foundation of USA";

    const text = `Dear ${donorName},

Thank you for your generous contribution to Vidya Bharati Foundation of USA. Your support helps us continue our mission of promoting education, culture, and community service.

Donation Details:
- Donation Amount: $${amount}
- Transaction ID: ${transactionId}
- Payment Reference: ${paymentRef}
- Donation Date: ${paymentDate}
- Payment Method: ${paymentMethod}
- Receipt Number: ${receiptNumber}

Vidya Bharati Foundation of USA is a 501(c)(3) tax-exempt organization (EIN: 47-4676188). Please retain this email for your records. No goods or services were provided in exchange for this contribution.

We sincerely appreciate your support and partnership.

Warm Regards,
Vidya Bharati Foundation of USA
Address: 29 Olde Hamlet Dr., Jericho, NY 11237
Contact: support@vidyabharatiusa.org | Website: www.vidyabharatiusa.org`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0A1128; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">THANK YOU FOR YOUR DONATION</h1>
              <div style="width: 60px; height: 3px; background-color: #D4AF37; margin: 15px auto 0 auto; border-radius: 2px;"></div>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px; color: #1e293b;">
              <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Dear <strong style="color: #0A1128;">${donorName}</strong>,</p>
              <p style="font-size: 16px; line-height: 1.6;">Thank you for your generous contribution to <strong>Vidya Bharati Foundation of USA</strong>. Your support helps us continue our mission of promoting education, culture, and community service.</p>
              
              <!-- Donation Details Table -->
              <table width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 30px 0; border-collapse: separate; border-spacing: 0;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; color: #0A1128; font-size: 16px; font-weight: 700; border-b: 1px solid #e2e8f0; padding-bottom: 8px;">Donation Details</h3>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr style="font-size: 14px; line-height: 2;">
                        <td width="40%" style="color: #64748b; font-weight: 500;">Donation Amount:</td>
                        <td width="60%" style="color: #0A1128; font-weight: 700;">$${amount} ${donation.currency || "USD"}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Transaction ID:</td>
                        <td style="color: #0A1128; font-family: monospace; font-size: 13px;">${transactionId}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Reference Number:</td>
                        <td style="color: #0A1128; font-family: monospace; font-size: 13px;">${paymentRef}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Receipt Number:</td>
                        <td style="color: #0A1128; font-family: monospace; font-size: 13px;">${receiptNumber}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Donation Date:</td>
                        <td style="color: #0A1128;">${paymentDate}</td>
                      </tr>
                      <tr style="font-size: 14px; line-height: 2;">
                        <td style="color: #64748b; font-weight: 500;">Payment Method:</td>
                        <td style="color: #0A1128;">${paymentMethod}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; line-height: 1.6; color: #64748b; font-style: italic; background-color: #f8fafc; border-left: 4px solid #D4AF37; padding: 12px 16px; margin: 30px 0;">
                "Vidya Bharati Foundation of USA is a 501(c)(3) tax-exempt organization (EIN: 47-4676188). Please retain this email for your records. No goods or services were provided in exchange for this contribution."
              </p>

              <p style="font-size: 16px; line-height: 1.6;">We sincerely appreciate your support and partnership.</p>
              
              <p style="margin: 40px 0 0 0; font-size: 16px; line-height: 1.6; color: #0A1128;">
                Warm Regards,<br/>
                <strong>Vidya Bharati Foundation of USA</strong>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.8;">
                <strong>Vidya Bharati Foundation of USA</strong><br/>
                Address: 29 Olde Hamlet Dr., Jericho, NY 11237<br/>
                promoting education, culture, and community service.<br/>
                Email: <a href="mailto:support@vidyabharatiusa.org" style="color: #D4AF37; text-decoration: none; font-weight: 600;">support@vidyabharatiusa.org</a> | Web: <a href="https://www.vidyabharatiusa.org" target="_blank" style="color: #D4AF37; text-decoration: none; font-weight: 600;">www.vidyabharatiusa.org</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    return { subject, html, text };
  }
}
