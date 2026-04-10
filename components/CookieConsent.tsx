"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

const CONSENT_KEY = "ai-dojo-cookie-consent";

export default function CookieConsent() {
  const [consent, setConsent] = useState<"pending" | "accepted" | "rejected">("pending");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setConsent("accepted");
    } else if (stored === "rejected") {
      setConsent("rejected");
    } else {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
    setVisible(false);
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {/* Only load GA after consent */}
      {consent === "accepted" && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Cookie banner */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 bg-white border-t border-[#E5E5E5] shadow-lg">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-[#525252] flex-1">
              当サイトではサービス改善のためCookieを使用しています。
              <Link href="/privacy" className="underline ml-1">
                プライバシーポリシー
              </Link>
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReject}
                className="px-4 py-2 text-sm text-[#525252] border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                拒否
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-bold text-white rounded-lg transition-colors"
                style={{ backgroundColor: "#0A0A0A" }}
              >
                同意する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
