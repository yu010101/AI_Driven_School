import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "AI道場 <noreply@ai-driven-school.com>";

export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ai-driven-school.com";
  const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "【AI道場】パスワードリセット",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #0A0A0A; font-size: 20px; margin-bottom: 16px;">パスワードリセット</h2>
          <p style="color: #525252; font-size: 14px; line-height: 1.6;">
            AI道場のパスワードリセットが依頼されました。<br />
            以下のボタンをクリックして新しいパスワードを設定してください。
          </p>
          <a href="${resetUrl}" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background-color: #0A0A0A; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold;">
            パスワードをリセット
          </a>
          <p style="color: #a3a3a3; font-size: 12px; line-height: 1.6;">
            このリンクは1時間で無効になります。<br />
            心当たりがない場合はこのメールを無視してください。
          </p>
          <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 24px 0;" />
          <p style="color: #a3a3a3; font-size: 11px;">AI道場 — ai-driven-school.com</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("Failed to send password reset email:", err);
    return false;
  }
}
