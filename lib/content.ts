import type { Metadata } from "next";
import { Heart, Users, Target, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Workers Health Care",
  description: "Workers Health Care Insurance Plans",
};

export const programs = [
  {
    id: 1,
    title: "Plan 300",
    description:
      "Basic coverage plan designed for essential health protection with affordable premiums.",
    features: [
      "Annual Maximum Benefit (AMB): ₱60,000.00",
      "Room & Board: ₱600/day",
      "Professional Fee: ₱600/day",
      "Drugs and Medicines: ₱6,000/confinement",
      "Out-Patient Consultation & Specialist Referral",
      "Annual Physical Examination",
      "Maternity Services",
      "Out-Patient Dental Care",
      "Emergency Care Services",
      "Mortuary Assistance",
    ],
    pricing: {
      principal: "₱300/month",
      spouse: "₱290/month",
      child: "₱240/month",
      parent: "₱350/month",
      sibling: "₱290/month",
    },
  },
  {
    id: 2,
    title: "Plan 7000",
    description:
      "Comprehensive coverage plan offering extended benefits and enhanced protection for you and your family.",
    features: [
      "Annual Maximum Benefit (AMB): ₱70,000.00",
      "Room & Board: ₱1,000/day (Private Room)",
      "Professional Fee: ₱1,000/day",
      "Drugs and Medicines: ₱12,000/confinement",
      "Other Hospital Services: ₱8,000/confinement",
      "Unlimited Out-Patient Consultation & Specialist Referral",
      "Compulsory Annual Physical Examination",
      "Maternity Services",
      "Out-Patient Dental Care",
      "Emergency Care Services",
      "Mortuary Assistance",
    ],
    pricing: {
      annual: "₱7,000/year",
    },
  },
];

export const programDetails: Record<number, any> = {
  1: {
    hospitalRates: {
      principal: { monthly: "₱300.00", annual: "₱3,600.00" },
      spouse: { monthly: "₱290.00", annual: "₱3,480.00" },
      child: { monthly: "₱240.00", annual: "₱2,880.00" },
      parent: { monthly: "₱350.00", annual: "₱4,200.00" },
      sibling: { monthly: "₱290.00", annual: "₱3,480.00" },
    },
    benefits: [
      {
        title: "Annual Maximum Benefit (AMB)",
        description:
          "Sixty Thousand Pesos (₱60,000.00) - accumulated cost of availment for one year",
      },
      {
        title: "Room & Board",
        description:
          "Maximum of ₱600.00 per day of confinement on top of PhilHealth",
      },
      {
        title: "Professional Fee",
        description:
          "Maximum of ₱600.00 per day of confinement on top of PhilHealth",
      },
      {
        title: "Drugs and Medicines",
        description:
          "Maximum coverage of ₱6,000.00 for every single period of confinement",
      },
      {
        title: "Other Hospital Services",
        description:
          "Maximum coverage of ₱4,000.00 for every single period of confinement",
      },
      {
        title: "Out-Patient Consultation",
        description:
          "Unlimited out-of-hospital consultation services including medical check-up, laboratory, minor surgery, vaccination, and referral to accredited medical specialists",
      },
      {
        title: "Physical Examination/Laboratory",
        description:
          "Chest X-Ray, Complete Blood Count, Urinalysis, Fecalysis, Electrocardiogram, Uric Acid, Fasting Blood Sugar, Pap Smear (35+), and complete medical history",
      },
      {
        title: "Maternity Services",
        description:
          "₱10,000.00 for caesarian section; ₱5,000.00 for miscarriage; five (5) pre-natal and one (1) post-natal examination",
      },
      {
        title: "Out-Patient Dental Care",
        description:
          "Four (4) dental extractions per year, one (1) annual prophylaxis, two (2) temporary fillings, and treatment of oral pain",
      },
      {
        title: "Emergency Care Services",
        description:
          "80% reimbursement of hospital bills in non-accredited hospitals, subject to AMB limit",
      },
      {
        title: "Mortuary Assistance",
        description:
          "Death benefit of ₱5,000.00 for natural cause or ₱10,000.00 for accident",
      },
    ],
    eligibilitySchedule: [
      {
        period: "Start of effectivity to 3rd month",
        benefit: "₱0.00 (Waiting period)",
      },
      { period: "4th to 6th month", benefit: "₱6,000.00" },
      { period: "7th to 9th month", benefit: "₱9,000.00" },
      { period: "10th to 11th month", benefit: "₱12,000.00" },
      { period: "12th month", benefit: "₱15,000.00" },
      { period: "First year and continuous", benefit: "₱60,000.00 (Full AMB)" },
    ],
  },
  2: {
    benefits: [
      {
        title: "Annual Maximum Benefit (AMB)",
        description:
          "Total or accumulated cost of availment by a member for a period of one (1) year in the amount of SEVENTY THOUSAND PESOS (₱70,000.00), to include the cost for the basic hospital benefits such as Room and Board, Professional Fee, Drugs and Medicines, Other Hospital Services; Preventive Healthcare Benefits; and Other Benefits and Assistance.",
      },
      {
        title: "Room & Board",
        description:
          "Maximum of ₱1,000.00 per day of confinement in a Private Room on top of PhilHealth coverage up to AMB limit. The coverage includes Emergency Room Fee while awaiting for room confinement.",
      },
      {
        title: "Professional Fee",
        description:
          "Maximum of ₱1,000.00 per day of confinement on top of PhilHealth coverage up to AMB limit.",
      },
      {
        title: "Drugs & Medicines",
        description:
          "Maximum coverage of ₱12,000.00 for every single period of confinement up to AMB limit.",
      },
      {
        title: "Other Hospital Services",
        description:
          "Maximum coverage of ₱8,000.00 for every single period of confinement up to AMB limit. The services include in-patient laboratory procedures, tests, and examinations; and such other hospital charges and fees which are medically necessary.",
      },
      {
        title: "Out-Patient Consultation and/or Referral to Medical Specialist",
        description:
          "Unlimited out-of-hospital consultation services to members which includes medical check-up, laboratory, minor surgery, treatment of minor illness or injury, vaccination but excluding the prescribed vaccines, referral to accredited medical specialists, health education or counseling on diet, exercise, and family planning.",
      },
      {
        title: "Annual Physical Examination / Laboratory",
        description:
          "Blood chemistry for Fasting Blood Sugar, Creatinine, SGPT, and Uric Acid; Electrocardiogram (ECG), Chest X-Ray, and taking of complete medical history. These clinical procedures are exclusive, or on top, of the AMB of a member.",
      },
      {
        title: "Maternity Services",
        description:
          "Financial assistance of ₱10,000.00 for Caesarean Section delivery; ₱5,000.00 for miscarriage case; five (5) pre-natal examinations, and one (1) post-natal examination for any type of delivery.",
      },
      {
        title: "Out-Patient Dental Care Services",
        description:
          "Includes four (4) dental extractions per year, one (1) simple annual prophylaxis, two (2) temporary fillings, and treatment of oral pain, lesion and burn.",
      },
      {
        title:
          "Emergency Care Services in Non-Accredited Hospitals and/or Physicians",
        description:
          "Reimbursement or immediate cash settlement to health facility of eighty percent (80%) of the total hospital bills, to include room and board, professional fee, drugs and medicines, and other hospital services, subject to AMB limit and Program Description.",
      },
      {
        title: "Mortuary Assistance",
        description:
          "Death benefit of ₱5,000.00 in case death is due to natural cause or ₱10,000.00 if death is due to accident. This benefit is exclusive, or on top, of the AMB of a member.",
      },
    ],
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
    image: "🏥",
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
    image: "🩺",
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
    image: "📱",
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
    image: "🧠",
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
    image: "🤝",
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
    image: "🎯",
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
