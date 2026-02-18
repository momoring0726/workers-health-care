/**
 * HelpSection Component
 * Displays support and enrollment information
 * - 3-column grid layout
 * - Context7: Simple, reusable component
 */
export function HelpSection() {
  const helpItems = [
    {
      icon: "💬",
      title: "Need Help?",
      description: "Talk to our specialists to find the perfect plan for you.",
    },
    {
      icon: "📞",
      title: "Call Us",
      description:
        "We will answer your questions and guide you through the enrollment process.",
    },
    {
      icon: "✓",
      title: "Easy Enrollment",
      description: "Get started in minutes with our simple enrollment process.",
    },
  ];

  return (
    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {helpItems.map((item) => (
        <div
          key={item.title}
          className="rounded-lg bg-white p-8 shadow-lg text-center"
        >
          <div className="mb-4 text-4xl">{item.icon}</div>
          <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
