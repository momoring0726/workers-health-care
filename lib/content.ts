import type { Metadata } from "next";
import { Heart, Users, Target, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://workershealthcare.org"),
  title: {
    template: "%s | Workers Health Care",
    default:
      "Workers Health Care | HMO in General Santos City (Gensan), South Cotabato, Sultan Kudarat",
  },
  description:
    "Protect your health and future with the best HMO and health insurance plans for workers in General Santos City (Gensan), South Cotabato, and Sultan Kudarat.",
  keywords: [
    "health care gensan",
    "health insurance gensan",
    "health insurance south cotabato",
    "workers health care",
    "medical insurance gensan",
    "affordable health plans",
    "healthcare provider general santos",
    "HMO gensan",
    "HMO south cotabato",
    "HMO general santos city",
    "HMO sultan kudarat",
  ],
  openGraph: {
    title: "Workers Health Care | Leading HMO",
    description:
      "Comprehensive health insurance plans specifically designed for workers in General Santos City, South Cotabato, and Sultan Kudarat.",
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
    title: "Workers Health Care | Best HMO in Gensan",
    description:
      "Comprehensive health insurance plans for workers in General Santos City, South Cotabato, and Sultan Kudarat.",
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
