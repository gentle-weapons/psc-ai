"use client";

import { NavigationBar, BulletList, ContactCard, DocSection, BodyText, Callout } from "@/components/LegalComponents"
import Footer from "@/components/Footer"

const tocItems = [
  { id: "s1",  label: "About the Waitlist" },
  { id: "s2",  label: "Eligibility" },
  { id: "s3",  label: "What You're Agreeing To" },
  { id: "s4",  label: "No Guarantee of Service" },
  { id: "s5",  label: "AI Platform Disclosure" },
  { id: "s6",  label: "User Submissions" },
  { id: "s7",  label: "Intellectual Property" },
  { id: "s8",  label: "Limitation of Liability" },
  { id: "s9", label: "Changes to Terms" },
  { id: "s10", label: "Termination" },
  { id: "s11", label: "Contact" },
];

export default function TermsOfService() {
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
              Terms of Service
            </h1>

            <BodyText>
              These Terms of Service ("Terms") govern your participation in the ReviewMyAgent waitlist
              operated by{" "}
              <strong className="font-medium text-[#e8eaed]">Gentle Systems</strong>{" "}
              ("we," "us," or "our"). By submitting your email address and any other information
              through our waitlist form, you agree to be bound by these Terms.
            </BodyText>
          </header>
 
          <div className="mt-10">
            <DocSection id="s1" title="About the Waitlist">
              <BodyText>
                ReviewMyAgent is a pre-launch AI agent performance review platform. The waitlist allows
                interested users to register early interest and receive notifications about the
                product launch, updates, and early access opportunities.
              </BodyText>
              <BodyText>
                Joining the waitlist does not guarantee access to the platform, early access, or any
                particular pricing.
              </BodyText>
            </DocSection>
 
            <DocSection id="s2" title="Eligibility">
              <BodyText>By joining the waitlist, you represent that:</BodyText>
              <BulletList items={[
                "You are at least 13 years of age (or the applicable age of digital consent in your jurisdiction)",
                "You have the authority to agree to these Terms",
                "The information you provide is accurate and truthful",
              ]} />
            </DocSection>
 
            <DocSection id="s3" title="What You're Agreeing To">
              <BodyText>By submitting the waitlist form, you agree to:</BodyText>
              <BulletList items={[
                "Receive email communications from Gentle Systems related to the ReviewMyAgent launch and product updates",
                "Allow us to use your submitted feedback and comments to inform product development",
                "Our Privacy Policy, which is incorporated into these Terms by reference",
              ]} />
              <BodyText>
                You may opt out of email communications at any time by clicking the unsubscribe link
                in any email we send, or by contacting us directly.
              </BodyText>
            </DocSection>
 
            <DocSection id="s4" title="No Guarantee of Service">
              <BodyText>
                Joining the waitlist does not create any contractual obligation on our part to
                provide you with access to ReviewMyAgent or any specific version, feature, or pricing
                tier. We reserve the right to modify, delay, or cancel the product launch at any
                time without liability.
              </BodyText>
            </DocSection>
 
            <DocSection id="s5" title="AI-Powered Platform Disclosure">
              <BodyText>
                ReviewMyAgent is designed as a platform for evaluating the performance of AI agents.
                The product captures AI agent traces (including LLM calls, tool usage, and context),
                tracks performance metrics, and enables human-in-the-loop review workflows.
              </BodyText>
              <BodyText>
                By joining the waitlist, you acknowledge that the platform you are expressing
                interest in is fundamentally AI-powered in nature. Full terms governing the use of
                AI features will be provided when the platform launches.
              </BodyText>
            </DocSection>
 
            <DocSection id="s6" title="User Submissions">
              <BodyText>
                Any free-form text or feedback you submit through the waitlist form:
              </BodyText>
              <BulletList items={[
                "May be used by Gentle Systems to improve the product and understand user needs",
                "Should not include confidential, proprietary, or sensitive personal information",
                "Must not contain illegal, threatening, harassing, or otherwise objectionable content",
              ]} />
              <BodyText>
                By submitting feedback, you grant Gentle Systems a non-exclusive, royalty-free
                license to use, reproduce, and incorporate that feedback into our product and
                services without compensation or attribution.
              </BodyText>
            </DocSection>
 
            <DocSection id="s7" title="Intellectual Property">
              <BodyText>
                All content on the waitlist page, including the ReviewMyAgent name, logo, product
                descriptions, and design, is the intellectual property of Gentle Systems and
                may not be used, copied, or reproduced without our express written permission.
              </BodyText>
            </DocSection>
 
            <DocSection id="s8" title="Limitation of Liability">
              <Callout>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, Gentle Systems SHALL NOT BE LIABLE FOR
                ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM
                OR RELATED TO YOUR PARTICIPATION IN THE WAITLIST, INCLUDING BUT NOT LIMITED TO LOSS
                OF DATA OR RELIANCE ON ANY COMMUNICATIONS WE SEND.
              </Callout>
            </DocSection>
 
            <DocSection id="s9" title="Changes to These Terms">
              <BodyText>
                We reserve the right to modify these Terms at any time. We will notify waitlist
                members of material changes via email. Your continued participation in the waitlist
                following notice of changes constitutes your acceptance of the updated Terms.
              </BodyText>
            </DocSection>
 
            <DocSection id="s10" title="Termination">
              <BodyText>
                You may remove yourself from the waitlist at any time by contacting us or
                unsubscribing from our emails. We reserve the right to remove any person from the
                waitlist at our discretion, including for violation of these Terms.
              </BodyText>
            </DocSection>
 
            <DocSection id="s11" title="Contact">
              <BodyText>If you have questions about these Terms, please contact us at:</BodyText>
              <ContactCard />
            </DocSection>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}