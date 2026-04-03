"use client";

import { NavigationBar, BulletList, ContactCard, DocSection, BodyText } from "@/components/LegalComponents"
import Footer from "@/components/Footer"

const tocItems = [
  { id: "s1", label: "Information We Collect" },
  { id: "s2", label: "How We Use Your Information" },
  { id: "s3", label: "Storage & Protection" },
  { id: "s4", label: "Third-Party Sharing" },
  { id: "s5", label: "Cookies & Tracking" },
  { id: "s6", label: "Your Rights" },
  { id: "s7", label: "Data Retention" },
  { id: "s8", label: "Changes to This Policy" },
  { id: "s9", label: "Contact" },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#e8eaed]">

      <NavigationBar />

      {/* Page layout */}
      <div className="max-w-[1100px] mx-auto px-8 pt-20 pb-32 grid grid-cols-[220px_1fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-8">

        <aside className="sticky top-20 hidden md:block">
          <p className="text-[11px] font-medium text-[#7a8394] tracking-widest uppercase mb-4">
            On this page
          </p>
          <ol className="list-none border-l border-[#1f1f1f] pl-4 space-y-2">
            {tocItems.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="block text-[13px] leading-snug no-underline transition-colors duration-200 text-[#7a8394] hover:text-[#e8eaed]">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        {/* Content */}
        <main className="animate-[fadeUp_0.5s_ease_both]">
          <header className="border-b border-[#1f1f1f] mb-12">
            <h1 className="text-[44px] font-normal leading-tight text-[#e8eaed] pb-10">
              Privacy Policy
            </h1>

            <BodyText>
              This Privacy Policy describes how{" "}
              <strong className="font-medium text-[#e8eaed]">Gentle Systems</strong>{" "}
              ("we," "us," or "our") collects, uses, and handles your information when you join the
              ReviewMyAgent waitlist. By submitting your information, you agree to the practices
              described below.
            </BodyText>
          </header>

          <div className="mt-10">
            <DocSection id="s1" num="1" title="Information We Collect">
              <BodyText>When you join our waitlist, we collect:</BodyText>
              <BulletList items={[
                "Your email address",
                "Any optional free-form feedback or comments you choose to submit",
              ]} />
            </DocSection>

            <DocSection id="s2" num="2" title="How We Use Your Information">
              <BodyText>We use the information we collect for the following purposes:</BodyText>
              <BulletList items={[
                "To notify you when ReviewMyAgent launches",
                "To send you product updates, early access announcements, and relevant pre-launch communications",
                "To understand interest in our product and improve our offering",
                "To respond to any questions or feedback you submit",
              ]} />
              <BodyText>
                We will not use your email address for any purpose unrelated to the above without
                your explicit consent.
              </BodyText>
            </DocSection>

            <DocSection id="s3" num="3" title="Storage & Protection">
              <BodyText>
                Your information is stored securely in a Supabase database protected by Row Level Security (RLS). 
                Supabase is a trusted infrastructure provider that handles your data in accordance with industry-standard 
                security practices and applicable privacy laws. We do not sell your personal information to any third party.
              </BodyText>
            </DocSection>

            <DocSection id="s4" num="4" title="Third-Party Sharing">
              <BodyText>
                We do not sell, rent, or trade your personal information.
              </BodyText>
            </DocSection>

            <DocSection id="s5" num="5" title="Cookies & Tracking">
              <BodyText>
                Our website may use cookies and similar tracking technologies to analyze traffic and
                improve your experience. You can control cookie preferences through your browser settings. 
                Note that disabling cookies may affect your experience on the site.
              </BodyText>
            </DocSection>

            <DocSection id="s6" num="6" title="Your Rights">
              <BodyText>
                Depending on where you are located, you may have the following rights regarding your
                personal information:
              </BodyText>
              <BulletList items={[
                "The right to access the information we hold about you",
                "The right to request correction of inaccurate information",
                "The right to request deletion of your information (right to erasure)",
                "The right to withdraw consent and unsubscribe from communications at any time",
              ]} />
              <BodyText>
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:contact@reviewmyagent.today" className="text-violet-400 hover:underline">
                  contact@reviewmyagent.today
                </a>
                . We will respond within 30 days.
              </BodyText>
            </DocSection>

            <DocSection id="s7" num="7" title="Data Retention">
              <BodyText>
                We will retain your email address and submitted information until you request
                deletion or until the waitlist is no longer active. If you unsubscribe, we will
                remove your email from active communications but may retain a suppression record to
                prevent future accidental contact.
              </BodyText>
            </DocSection>

            <DocSection id="s8" num="8" title="Changes to This Policy">
              <BodyText>
                We may update this Privacy Policy from time to time. We will notify waitlist members
                of material changes via email and will update the effective date above. Your
                continued participation in the waitlist after any changes constitutes acceptance of
                the updated policy.
              </BodyText>
            </DocSection>

            <DocSection id="s9" num="9" title="Contact">
              <BodyText>
                If you have any questions, concerns, or requests regarding this Privacy Policy,
                please reach out:
              </BodyText>
              <ContactCard />
            </DocSection>
          </div>
        </main>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}