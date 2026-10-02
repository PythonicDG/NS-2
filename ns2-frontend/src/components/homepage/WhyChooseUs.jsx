import { CheckCircle2, Cpu, GraduationCap, Wrench } from "lucide-react";

const icons = [Wrench, Cpu, GraduationCap, CheckCircle2];

export default function WhyChooseUs({ data }) {
  if (!data) return null;
  const items = (data.content_items || []).filter((item) => item.is_active !== false);

  return (
    <section aria-labelledby="why-mia-title" className="bg-[#F7F5F2] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {data.super_heading && <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C2481F]">{data.super_heading}</p>}
          <h2 id="why-mia-title" className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">{data.heading}</h2>
          {data.subheading && <p className="mt-5 text-lg leading-8 text-gray-600">{data.subheading}</p>}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={item.title || index} className="min-w-0 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#C2481F]"><Icon aria-hidden="true" className="h-6 w-6" /></span>
                <h3 className="mt-5 text-xl font-bold text-gray-950">{item.title}</h3>
                <p className="mt-3 [overflow-wrap:anywhere] text-sm leading-6 text-gray-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
