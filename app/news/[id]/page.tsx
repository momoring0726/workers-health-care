"use client";

import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const newsItems = [
  {
    id: 1,
    title: "Workers' Health Initiative Launches",
    date: "Feb 1, 2026",
    category: "Program Launch",
    image: "🏥",
    content: [
      "This groundbreaking initiative aims to revolutionize workplace health by providing comprehensive resources and support to both employers and workers.",
      "The program includes training, wellness workshops, and direct access to healthcare professionals. Participating employers will receive on-site assessments and tailored health plans for their teams.",
      "Enrollment opens next month with priority given to high‑risk industries. Employers can apply online, and workers will be able to enroll through their HR teams or directly via our portal.",
    ],
  },
  {
    id: 2,
    title: "Free Screening Clinics Announced",
    date: "Jan 20, 2026",
    category: "Healthcare",
    image: "🩺",
    content: [
      "Starting next month, our mobile health clinics will visit major workplaces and partner hospitals across the region.",
      "These free clinics offer comprehensive health screenings including blood pressure checks, cholesterol testing, diabetes risk assessments, and general wellness consultations.",
      "Employers can request a clinic visit by submitting a schedule request. Walk‑ins will be accepted at partner hospitals during designated community clinic days.",
    ],
  },
  {
    id: 3,
    title: "New Telehealth Options Available",
    date: "Dec 15, 2025",
    category: "Technology",
    image: "📱",
    content: [
      "Workers can now access telehealth services 24/7 through our expanded platform.",
      "This includes virtual consultations with licensed physicians, mental health support, and prescription management services.",
      "The new platform also supports multilingual care teams and improved appointment scheduling for shift workers.",
    ],
  },
  {
    id: 4,
    title: "Mental Health Support Program Expansion",
    date: "Dec 1, 2025",
    category: "Mental Health",
    image: "🧠",
    content: [
      "In response to growing demand, we've expanded our mental health support services to include 24/7 crisis support, peer support groups, and specialized counseling for workplace stress and burnout.",
      "New partnerships with regional providers will increase appointment availability and shorten wait times.",
      "Workers can enroll confidentially and choose between virtual or in‑person sessions.",
    ],
  },
  {
    id: 5,
    title: "Partnership with Major Hospitals",
    date: "Nov 10, 2025",
    category: "Partnerships",
    image: "🤝",
    content: [
      "This partnership strengthens our commitment to providing quality healthcare. Workers gain access to specialty care, emergency services, and coordinated treatment at partner facilities.",
      "Hospitals will integrate with our care coordination system to streamline referrals and follow‑ups.",
      "Employers will receive updated network lists and concierge support for scheduling complex care.",
    ],
  },
  {
    id: 6,
    title: "Q1 2026 Health Goals and Updates",
    date: "Oct 30, 2025",
    category: "Updates",
    image: "🎯",
    content: [
      "Our Q1 objectives focus on increasing participation rates, improving health outcomes, and expanding our geographic reach.",
      "We're committed to reaching 50,000 new workers by the end of the quarter through targeted outreach and employer partnerships.",
      "Progress will be published monthly with transparent metrics on enrollment, screenings, and care outcomes.",
    ],
  },
];

export default function NewsDetailPage() {
  const params = useParams<{ id?: string | string[] }>();
  const rawId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const normalizedId = rawId ? rawId.split("-")[0] : "";
  const id = Number.parseInt(normalizedId, 10);
  const news = newsItems.find((item) => item.id === id);

  if (!news) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to News</span>
            </Link>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg p-10 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Article not found
              </h1>
              <p className="text-gray-600">
                The news item you&apos;re looking for doesn&apos;t exist.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to News</span>
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl">{news.image}</span>
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                  {news.category}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                <time dateTime={news.date}>{news.date}</time>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {news.title}
              </h1>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                {news.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
