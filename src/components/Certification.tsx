import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { certifications } from "@/content/certifications";

export default function Certification() {
  return (
    <section className="Certification" id="certification">
      <div className="top container">
        <SectionHeading eyebrow="MY COURSES & CERTIFICATIONS" title="Certification" centered />

        <ul className="divide-y divide-gray-100">
          {certifications.map((item) => (
            <li
              key={`${item.name}-${item.date}`}
              className="box btn_shadow flex flex-col justify-between gap-x-6 py-5 sm:flex-row"
            >
              <div className="flex min-w-0 gap-x-4">
                <Image
                  src={item.image}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
                />
              </div>

              <div className="flex flex-grow flex-col justify-between">
                <div className="flex flex-col justify-between md:flex-row">
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.company}</p>
                </div>

                <div className="shortP mt-2 flex flex-col justify-between md:flex-row">
                  <p className="truncate text-xs text-gray-500">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.link}
                    </a>
                  </p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
