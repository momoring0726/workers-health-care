import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Shield, Heart, ArrowRight } from "lucide-react";

interface HeroProps {
  highlightedProgram?: {
    title: string;
    description: string;
    pricing: {
      principal?: string;
      annual?: string;
      monthly?: string;
    };
    features: string[];
    slug: { current: string };
  } | null;
}

export function Hero({ highlightedProgram }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-blue-50 blur-[100px]" />
        <div className="absolute -left-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-indigo-50 blur-[80px]" />
        <div className="absolute right-0 top-0 h-full w-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 xl:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              <span className="block">Quality Health Care</span>
              <span className="block text-blue-600">for all workers</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-500 sm:mt-6 sm:max-w-2xl lg:max-w-xl">
              We are committed to providing the best health care plans as your trusted HMO in General Santos City (Gensan), South Cotabato, and Sultan Kudarat. Our plans are affordable and flexible to meet your needs.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <div className="inline-block rounded-md shadow">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white w-auto text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6"
                >
                  <Link href="/programs">View Plans</Link>
                </Button>
              </div>
              <div className="inline-block">
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 w-auto text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6"
                >
                  <Link href="/#contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Trusted by workers across</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold">Gensan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold">South Cotabato</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold">Sultan Kudarat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Plan Card */}
          <div className="mt-10 lg:mt-0">
            {highlightedProgram ? (
              <div className="relative group">
                {/* Card Glow Effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-30" />
                
                <div className="relative rounded-3xl bg-white border border-gray-100 shadow-2xl overflow-hidden">
                  {/* Card Header */}
                  <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                    
                    {/* Badge */}
                    <div className="relative mb-4 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 backdrop-blur-md">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
                      <span className="text-xs font-bold tracking-wide text-indigo-300 uppercase">Recommended Plan</span>
                    </div>
                    
                    <h3 className="relative text-2xl sm:text-3xl font-bold text-white mb-2">
                      {highlightedProgram.title}
                    </h3>
                    <p className="relative text-sm text-slate-400 mb-4 line-clamp-2">
                      {highlightedProgram.description}
                    </p>
                    
                    {/* Pricing */}
                    <div className="relative flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white">
                        {highlightedProgram.pricing.principal || highlightedProgram.pricing.annual || "Custom"}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-3 mb-8">
                      {highlightedProgram.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {highlightedProgram.features.length > 4 && (
                        <li className="text-sm font-medium text-blue-600 pl-8">
                          + {highlightedProgram.features.length - 4} more benefits
                        </li>
                      )}
                    </ul>

                    <Button
                      asChild
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 text-base font-semibold shadow-lg shadow-blue-600/25"
                    >
                      <Link href={`/programs/${highlightedProgram.slug.current}`}>
                        Learn More <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Fallback when no highlighted program */
              <div className="relative group">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-xl" />
                <div className="relative rounded-3xl bg-white border border-gray-100 shadow-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                      <Heart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Comprehensive Health Plans</h3>
                      <p className="text-sm text-gray-500">Tailored for workers</p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700">Hospitalization coverage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700">Outpatient services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700">Emergency care</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700">Preventive care</span>
                    </li>
                  </ul>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 text-base font-semibold"
                  >
                    <Link href="/programs">
                      View All Plans <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
