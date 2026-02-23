import type { Metadata } from "next";
import { Heart, Users, Target, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://workershealthcare.org"),
  title: {
    template: "%s | Workers Health Care Gensan",
    default: "Workers Health Care Gensan | Best Health Insurance South Cotabato",
  },
  description: "Comprehensive health insurance and healthcare plans for workers in General Santos City (Gensan) and South Cotabato. Affordable, reliable, and trusted.",
  keywords: [
    "health care gensan",
    "health insurance gensan",
    "health insurance south cotabato",
    "workers health care",
    "medical insurance gensan",
    "affordable health plans",
    "healthcare provider general santos",
  ],
  openGraph: {
    title: "Workers Health Care Gensan",
    description: "Comprehensive health insurance plans specifically designed for workers in Gensan and South Cotabato.",
    url: "https://workershealthcare.org", // Replace with actual domain later
    siteName: "Workers Health Care Gensan",
    images: [
      {
        url: "/icon.png", // Will be resolved to absolute URL in Next.js automatically
        width: 800,
        height: 600,
        alt: "Workers Health Care Logo",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workers Health Care Gensan",
    description: "Comprehensive health insurance plans for workers in Gensan and South Cotabato.",
    images: ["/icon.png"],
  },
};

export const aboutValues = [
  {
    icon: Heart,
    title: "Comprehensive Care",
    description:
      "We provide coverage that protects you and your family with comprehensive health and wellness benefits.",
  },
  {
    icon: Users,
    title: "Worker Focused",
    description:
      "Our plans are designed with workers in mind, understanding the unique healthcare needs of the workforce.",
  },
  {
    icon: Target,
    title: "Affordable Plans",
    description:
      "Quality healthcare shouldn't break the bank. We offer competitive rates and flexible payment options.",
  },
  {
    icon: CheckCircle2,
    title: "Trusted Partner",
    description:
      "With years of experience, we've earned the trust of thousands of workers across the country.",
  },
];

export const newsItems = [
  {
    id: 1,
    title: "Workers' Health Initiative Launches",
    date: "Feb 1, 2026",
    excerpt:
      "A new program to improve workplace health awareness launches this spring. Learn how employers can enroll.",
    content: [
      "This groundbreaking initiative aims to revolutionize workplace health by providing comprehensive resources and support to both employers and workers.",
      "The program includes training, wellness workshops, and direct access to healthcare professionals. Participating employers will receive on-site assessments and tailored health plans for their teams.",
      "Enrollment opens next month with priority given to high‑risk industries. Employers can apply online, and workers will be able to enroll through their HR teams or directly via our portal.",
    ],
    href: "/news/1",
    category: "Program Launch",
    featured: true,
  },
  {
    id: 2,
    title: "Free Screening Clinics Announced",
    date: "Jan 20, 2026",
    excerpt:
      "Mobile clinics will visit partnering hospitals to offer free screenings to eligible workers.",
    content: [
      "Starting next month, our mobile health clinics will visit major workplaces and partner hospitals across the region.",
      "These free clinics offer comprehensive health screenings including blood pressure checks, cholesterol testing, diabetes risk assessments, and general wellness consultations.",
      "Employers can request a clinic visit by submitting a schedule request. Walk‑ins will be accepted at partner hospitals during designated community clinic days.",
    ],
    href: "/news/2",
    category: "Healthcare",
    featured: false,
  },
  {
    id: 3,
    title: "New Telehealth Options",
    date: "Dec 15, 2025",
    excerpt:
      "We're expanding telehealth coverage so workers can access care from home or on-site.",
    content: [
      "Workers can now access telehealth services 24/7 through our expanded platform.",
      "This includes virtual consultations with licensed physicians, mental health support, and prescription management services.",
      "The new platform also supports multilingual care teams and improved appointment scheduling for shift workers.",
    ],
    href: "/news/3",
    category: "Technology",
    featured: false,
  },
  {
    id: 4,
    title: "Mental Health Support Program Expansion",
    date: "Dec 1, 2025",
    excerpt:
      "Additional mental health resources and counseling services now available to all participants.",
    content: [
      "In response to growing demand, we've expanded our mental health support services to include 24/7 crisis support, peer support groups, and specialized counseling for workplace stress and burnout.",
      "New partnerships with regional providers will increase appointment availability and shorten wait times.",
      "Workers can enroll confidentially and choose between virtual or in‑person sessions.",
    ],
    href: "/news/4",
    category: "Mental Health",
    featured: true,
  },
  {
    id: 5,
    title: "Partnership with Major Hospitals",
    date: "Nov 10, 2025",
    excerpt:
      "We're partnering with leading hospitals to provide comprehensive care networks for workers.",
    content: [
      "This partnership strengthens our commitment to providing quality healthcare. Workers gain access to specialty care, emergency services, and coordinated treatment at partner facilities.",
      "Hospitals will integrate with our care coordination system to streamline referrals and follow‑ups.",
      "Employers will receive updated network lists and concierge support for scheduling complex care.",
    ],
    href: "/news/5",
    category: "Partnerships",
    featured: false,
  },
  {
    id: 6,
    title: "Q1 2026 Health Goals and Updates",
    date: "Oct 30, 2025",
    excerpt:
      "Learn about our ambitious goals for the first quarter and how we plan to achieve them.",
    content: [
      "Our Q1 objectives focus on increasing participation rates, improving health outcomes, and expanding our geographic reach.",
      "We're committed to reaching 50,000 new workers by the end of the quarter through targeted outreach and employer partnerships.",
      "Progress will be published monthly with transparent metrics on enrollment, screenings, and care outcomes.",
    ],
    href: "/news/6",
    category: "Updates",
    featured: false,
  },
];

export const categories = [
  "Program Launch",
  "Healthcare",
  "Technology",
  "Mental Health",
  "Partnerships",
  "Updates",
];

export default {};

export const pptSlides = [
  "Slide1.JPG",
  "Slide2.JPG",
  "Slide3.JPG",
  "Slide4.JPG",
  "Slide5.JPG",
  "Slide6.JPG",
  "Slide7.JPG",
  "Slide8.JPG",
  "Slide9.JPG",
  "Slide10.JPG",
  "Slide11.JPG",
  "Slide12.JPG",
  "Slide13.JPG",
  "Slide14.JPG",
  "Slide15.JPG",
  "Slide16.JPG",
  "Slide17.JPG",
  "Slide18.JPG",
  "Slide19.JPG",
];
