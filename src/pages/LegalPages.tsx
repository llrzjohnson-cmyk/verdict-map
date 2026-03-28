import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="editorial-container py-8">
      <Breadcrumbs items={[{ label: title }]} />
      <div className="max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-8">{title}</h1>
        <div className="editorial-prose">{children}</div>
      </div>
    </main>
  );
}

export function AffiliateDisclosurePage() {
  return (
    <LegalPage title="Affiliate Disclosure">
      <p>PickPerfect is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no additional cost to you. This is how we fund our independent editorial operations.</p>
      <h2>How It Works</h2>
      <p>We partner with retailers and brands through affiliate programs. When you click a "Buy Now" link and make a purchase, the retailer pays us a small commission. This never affects our editorial recommendations or the price you pay.</p>
      <h2>Editorial Independence</h2>
      <p>Our review process is entirely independent of our affiliate relationships. Products are selected, tested, and reviewed based on merit alone. We never accept payment for positive coverage, and brands have no editorial input on our reviews.</p>
      <h2>Transparency</h2>
      <p>We mark all affiliate links clearly. If a link is an affiliate link, you'll see a disclosure near it. We believe transparency builds trust, and trust is the foundation of our relationship with you.</p>
    </LegalPage>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p><strong>Last updated:</strong> March 2026</p>
      <p>PickPerfect ("we," "us," "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your information when you visit our website.</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly (such as email for newsletter subscriptions) and automatically through cookies and similar technologies (such as browsing behavior, device information, and IP address).</p>
      <h2>How We Use Your Information</h2>
      <p>We use your information to provide and improve our services, send newsletters you've subscribed to, analyze website traffic and performance, and comply with legal obligations.</p>
      <h2>Your Rights (GDPR / PIPEDA)</h2>
      <p>You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing. To exercise these rights, contact us at privacy@pickperfect.com.</p>
      <h2>Contact</h2>
      <p>For privacy inquiries, email privacy@pickperfect.com.</p>
    </LegalPage>
  );
}

export function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy">
      <p>We use cookies and similar tracking technologies to improve your browsing experience, analyze traffic, and personalize content.</p>
      <h2>Types of Cookies</h2>
      <p><strong>Necessary:</strong> Essential for website functionality. Cannot be disabled.</p>
      <p><strong>Analytics:</strong> Help us understand how visitors interact with our website (e.g., Google Analytics).</p>
      <p><strong>Marketing:</strong> Used to deliver relevant advertisements and track campaign effectiveness.</p>
      <h2>Managing Cookies</h2>
      <p>You can manage your cookie preferences at any time by clicking "Cookie Preferences" in the footer. You can also configure your browser to block or delete cookies.</p>
    </LegalPage>
  );
}

export function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p><strong>Last updated:</strong> March 2026</p>
      <p>By accessing PickPerfect, you agree to these Terms of Service. If you disagree, please do not use our website.</p>
      <h2>Content</h2>
      <p>All reviews, articles, and other content on PickPerfect are for informational purposes only. We strive for accuracy but cannot guarantee that all information is complete or current.</p>
      <h2>Affiliate Links</h2>
      <p>Our site contains affiliate links. By clicking these links and making purchases, you agree that we may earn a commission. See our Affiliate Disclosure for details.</p>
      <h2>Intellectual Property</h2>
      <p>All content, including text, images, logos, and design, is the property of PickPerfect and protected by copyright laws.</p>
    </LegalPage>
  );
}

export function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>The information on PickPerfect is provided "as is" without warranties of any kind. While we strive for accuracy in our reviews and recommendations, we make no guarantees about the completeness, reliability, or accuracy of this information.</p>
      <p>Product prices, availability, and specifications are subject to change without notice. Always verify current details with the retailer before making a purchase.</p>
      <p>PickPerfect is an independent publication. We are not affiliated with any manufacturer or retailer unless explicitly stated.</p>
    </LegalPage>
  );
}
