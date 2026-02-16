import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { publicClient } from "@/sanity/lib/client-public";
import { CONTACT_QUERY } from "@/sanity/lib/queries";

interface ContactData {
  _id: string;
  email: string;
  phones: string[];
  address: string;
}

async function getContactData(): Promise<ContactData | null> {
  try {
    const data = await publicClient.fetch(
      CONTACT_QUERY,
      {},
      {
        next: {
          revalidate: 0, // Revalidate instantly
          tags: ["contact"],
        },
      },
    );
    return data || null;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return null;
  }
}

export async function ContactSectionContent() {
  const contact = await getContactData();

  // Fallback values if no data from Sanity
  const email = contact?.email || "info@workershealthcare.org";
  const phones = contact?.phones || ["+1 (800) 555-1234"];
  const address =
    contact?.address || "123 Worker Ave, Suite 100\nGeneral Santos City, PH";

  return (
    <section id="contact" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our health care programs? Our team is here to
              help. Contact us using any of the methods below.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-6 p-8 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Email
                </h3>
                <a
                  href={`mailto:${email}`}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-6 p-8 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-gradient-to-br from-green-400 to-green-600 p-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Phone
                </h3>
                <div className="space-y-2">
                  {phones.map((phoneNumber, index) => (
                    <a
                      key={index}
                      href={`tel:${phoneNumber}`}
                      className="block text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {phoneNumber}
                    </a>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Mon–Fri, 9am–5pm GMT +8
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-6 p-8 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Office
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
