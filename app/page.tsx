import Image from "next/image";

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="text-center px-6 py-16 max-w-2xl mx-auto">
        <div className="mb-10 flex justify-center">
          <Image
            src="/WHC LOGO.png"
            alt="Workers Health Care Logo"
            width={180}
            height={180}
            priority
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Coming Soon
        </h1>

        <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full" />

        <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
          We are building something great for you.
        </p>
        <p className="text-base text-gray-500 mb-10">
          Workers Health Care is currently under development. Stay tuned for updates on our health care plans and services.
        </p>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
          </span>
          Under Development
        </div>
      </div>
    </main>
  );
}
