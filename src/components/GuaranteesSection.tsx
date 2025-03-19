import {
  Shield,
  Award,
  Clock,
  GraduationCap,
  FileCheck,
  Scale,
} from "lucide-react";

export default function GuaranteesSection() {
  const guarantees = [
    {
      icon: Shield,
      title: "Free Upgrade",
      description: "Hail impact-resistant shingles included",
    },
    {
      icon: Clock,
      title: "Lifetime Workmanship Guarantee",
      description: "Standard is 2-10 years; we go beyond",
    },
    {
      icon: Award,
      title: "50-Year Warranty",
      description: "True manufacturer coverage on materials",
    },
    {
      icon: GraduationCap,
      title: "Certified Experts",
      description: "Trained in all major roofing materials",
    },
    {
      icon: FileCheck,
      title: "Insurance Specialists",
      description: "We handle claims so you don't have to",
    },
    {
      icon: Scale,
      title: "Denied Claim?",
      description: "Our certified roofers fight back—98.9% success rate",
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
          Our Premium Guarantees
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <item.icon className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
