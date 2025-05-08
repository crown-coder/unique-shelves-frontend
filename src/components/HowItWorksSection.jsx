import React from 'react';
import { FaUserPlus, FaChalkboardTeacher, FaCertificate, FaLaptopCode, FaUserTie, FaComments } from 'react-icons/fa';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Simple Sign Up",
      description: "Join our community of lifelong learners in just 30 seconds. Simply provide your email address or connect with your Google account to get immediate access to our free resources.",
      additional: [
        "No credit card required",
        "Get 3 free starter courses immediately",
        "Personalized course recommendations"
      ],
      colorClass: "bg-blue-100 text-blue-600"
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Start Learning Your Way",
      description: "Dive into our extensive library featuring courses across technology, business, creative arts, and more. Choose from different learning formats that suit your style:",
      additional: [
        "Video lectures with industry experts",
        "Interactive coding exercises",
        "Downloadable resources and cheat sheets",
        "Community discussion boards"
      ],
      colorClass: "bg-green-100 text-green-600"
    },
    {
      icon: <FaCertificate />,
      title: "Achieve & Advance",
      description: "Complete courses to earn verifiable certificates and build your professional portfolio. Our credentials are recognized by top companies worldwide.",
      additional: [
        "Share certificates on LinkedIn",
        "Add to your resume/CV",
        "Access career coaching sessions",
        "Get matched with job opportunities"
      ],
      colorClass: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl max-lg:text-xl font-bold text-gray-800 mb-6">
          Start Your Learning Journey in 3 Easy Steps
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Whether you're looking to advance your career, learn a new skill, or explore a passion,
          our platform makes professional education accessible, flexible, and effective.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl hover:shadow-xl transition duration-300">
              <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 ${step.colorClass} rounded-full text-3xl`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {step.description}
              </p>
              <ul className="text-left text-gray-600 space-y-2 mt-4">
                {step.additional.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-2xl max-lg:text-lg font-semibold text-gray-800 mb-8">
            Why Learners Choose Us
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl">
              <FaLaptopCode className="text-4xl text-blue-500 mb-4" />
              <h4 className="text-xl font-medium mb-2">Hands-On Projects</h4>
              <p className="text-gray-600 text-center">
                Apply what you learn with real-world projects and build a portfolio that impresses employers.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-blue-400 rounded-xl">
              <FaUserTie className="text-4xl text-white mb-4" />
              <h4 className="text-xl font-medium text-white mb-2">Expert Instructors</h4>
              <p className="text-white text-center">
                Learn from industry professionals working at top companies like Google, Amazon, and Microsoft.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl">
              <FaComments className="text-4xl text-purple-500 mb-4" />
              <h4 className="text-xl font-medium mb-2">Community Support</h4>
              <p className="text-gray-600 text-center">
                Get help from mentors and peers in our active community forums and live Q&A sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;