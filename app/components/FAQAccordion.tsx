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
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-bold px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">자주 묻는 질문</h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {faqs.map((faq, idx) => (
          <li key={idx}>
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900 transition-colors"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-panel-${idx}`}
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">{faq.question}</span>
              <svg
                className={`w-5 h-5 ml-2 transform transition-transform ${openIndex === idx ? "rotate-180" : "rotate-0"}`}
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
              className={`px-6 pb-4 text-gray-700 dark:text-gray-300 text-sm transition-all duration-300 ease-in-out ${openIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
              style={{
                transitionProperty: "max-height, opacity",
              }}
            >
              {openIndex === idx && <div>{faq.answer}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQAccordion; 