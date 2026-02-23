import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PolicyData {
  _id: string;
  title: string;
  content: Array<{
    heading: string;
    content: string;
    subsections?: Array<{
      title: string;
      text: string;
    }>;
  }>;
  footer?: string;
}

export default async function PrivacyPage() {
  // Fallback policy (always used)
  const fallbackPolicy: PolicyData = {
    _id: "fallback",
    title: "Privacy Policy",
    content: [
      {
        heading: "Information We Do Not Collect",
        content:
          "This website is informational only. We do not collect, store, or process any personal data from visitors. The website displays public information about our health care programs, hospitals, and contact information.",
        subsections: [
          {
            title: "No Forms",
            text: "We do not use contact forms or newsletter signups that collect personal data.",
          },
          {
            title: "No Tracking",
            text: "We do not use analytics, cookies, or tracking pixels to monitor visitor behavior.",
          },
          {
            title: "No Accounts",
            text: "We do not require user accounts or login credentials.",
          },
        ],
      },
      {
        heading: "Contact Information",
        content:
          "Contact information displayed on this website is publicly available and provided for inquiry purposes only.",
      },
      {
        heading: "External Links",
        content:
          "This website may contain links to external websites. We are not responsible for the privacy practices of third-party websites. Please review their privacy policies independently.",
      },
      {
        heading: "Information Accuracy",
        content:
          "While we strive to keep information current and accurate, we make no warranty regarding the completeness or accuracy of the content on this website.",
      },
      {
        heading: "Questions",
        content:
          "If you have questions about this privacy policy, please contact us using the information provided in the Contact section.",
      },
    ],
    footer:
      "This Privacy Policy was last updated on February 18, 2026. We may update this policy periodically.",
  };

  const displayPolicy = fallbackPolicy;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-gray-600">
            Learn how we handle your information
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-sm max-w-none">
            {displayPolicy.content.map((section, idx) => (
              <div key={idx} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.heading}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
                  {section.content}
                </p>

                {section.subsections && section.subsections.length > 0 && (
                  <div className="ml-4 space-y-4">
                    {section.subsections.map((subsection, subIdx) => (
                      <div key={subIdx}>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          • {subsection.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap ml-4">
                          {subsection.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          {displayPolicy.footer && (
            <div className="mt-16 border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-600">{displayPolicy.footer}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
