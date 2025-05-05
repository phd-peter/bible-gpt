import React, { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <header className="flex flex-col items-center py-8 gap-2">
        {/* ... */}
      </header>
      <main className="flex-1 flex flex-col items-center px-2 sm:px-8 md:px-8 lg:px-0 w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-blue-950 transition-colors duration-500">
        <ul className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <div className={`transition-shadow ${openIndex === idx ? "shadow-xl" : "shadow-md"} rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900`}> 
                <button
                  className={
                    `w-full flex justify-between items-center px-6 py-5 rounded-2xl focus:outline-none transition-colors group ` +
                    `hover:bg-blue-100 dark:hover:bg-blue-900`
                  }
                  onClick={() => handleToggle(idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="font-semibold text-base leading-snug text-blue-900 dark:text-blue-100 group-hover:text-blue-700 dark:group-hover:text-blue-200 text-left break-keep whitespace-normal">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 ml-3 flex-shrink-0 text-blue-400 group-hover:text-blue-600 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={`faq-panel-${idx}`}
                  className={`px-6 transition-all duration-300 ease-in-out ${openIndex === idx ? "opacity-100" : "opacity-0 h-0 p-0"}`}
                  style={{ transitionProperty: "opacity" }}
                >
                  {openIndex === idx && (
                    <div className="text-blue-800 dark:text-blue-100 text-sm pt-2 pb-6 leading-relaxed break-keep whitespace-normal overflow-visible">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default FAQAccordion; 