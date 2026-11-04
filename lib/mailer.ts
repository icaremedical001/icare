import nodemailer from "nodemailer";

export type EnquiryKind = "contact" | "admission";

type EnquiryFields = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  course?: string;
};


const globalForMailer = globalThis as typeof globalThis & {
  mailerTransporter?: ReturnType<typeof nodemailer.createTransport>;
};

function getTransporter() {
  if (!globalForMailer.mailerTransporter) {
    const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter(
      (name) => !process.env[name]?.trim(),
    );

    if (missing.length) {
      throw new Error(
        `Email sending is not configured. Missing env vars: ${missing.join(", ")}`,
      );
    }

    const port = Number(process.env.SMTP_PORT || 465);

    globalForMailer.mailerTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
      },
    });
  }

  return globalForMailer.mailerTransporter;
}

function resolveRecipient(kind: EnquiryKind): string {
  const smtpUser = process.env.SMTP_USER as string;

  if (kind === "contact") {
    return process.env.MAIL_TO_CONTACT?.trim() || smtpUser;
  }

  return process.env.MAIL_TO_ADMISSION?.trim() || smtpUser;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmail(kind: EnquiryKind, fields: EnquiryFields) {
  const rows: Array<[string, string]> = [
    ["Name", fields.name],
    ["Phone", fields.phone],
  ];

  if (fields.email) {
    rows.push(["Email", fields.email]);
  }

  if (kind === "admission" && fields.course) {
    rows.push(["Course", fields.course]);
  }

  if (fields.message) {
    rows.push(["Message", fields.message]);
  }

  const subject =
    kind === "admission"
      ? `Admission enquiry — ${fields.name}${fields.course ? ` (${fields.course})` : ""}`
      : `Website contact — ${fields.name}`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #111827; padding: 16px;">
      <p style="margin: 0 0 12px; font-size: 15px;">
        New ${kind === "admission" ? "admission enquiry" : "contact form message"} from the ICARE website:
      </p>
      <table style="border-collapse: collapse; font-size: 14px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <th align="left" style="padding: 8px 16px 8px 0; border-bottom: 1px solid #e5e7eb; white-space: nowrap; vertical-align: top;">${label}</th>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${
              label === "Message"
                ? escapeHtml(value).replaceAll("\n", "<br />")
                : escapeHtml(value)
            }</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin: 14px 0 0; font-size: 12px; color: #6b7280;">
        Received ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
      </p>
    </div>`;

  return { subject, text, html };
}

export async function sendEnquiryEmail(
  kind: EnquiryKind,
  fields: EnquiryFields,
): Promise<string> {
  const transporter = getTransporter();
  const { subject, text, html } = buildEmail(kind, fields);

  const to = resolveRecipient(kind);

  await transporter.sendMail({
    from: `"ICARE Website" <${process.env.SMTP_USER}>`,
    to,

    replyTo: fields.email || undefined,
    subject,
    text,
    html,
  });

  return to;
}
