"use client";
import React from "react";

// SkillsDisplay Component
const SkillsDisplay = ({id}) => {
  const frontendSkills = [
    "React", "JSX", "React Hooks", "Context API", "Redux", "Next.js", "TypeScript", "Tailwind CSS", "Styled Components",
    "React Router", "React Testing Library", "Material UI", "HTML5", "CSS3", "JavaScript", 
    "Git", "GitHub"
  ];

  const backendSkills = [
    "Node.js", "Express.js", "REST APIs",  "MongoDB", "MySQL", "JWT", 
     "CI/CD", 
  ];

  const toolsAndPlatforms = [
    "Git", "GitHub", "NPM", "Postman", "Swagger", "Jira"
  ];

  const renderSkills = (skills) => {
    return skills.map((skill, index) => (
      <span
        key={index}
        className="bg-white text-black text-sm px-4 py-2 rounded-full mb-2 transition-all duration-300 border border-[#d5d5d5]"
      >
        {skill}
      </span>
    ));
  };

  return (
    <section id={id} className="py-16 bg-white rounded-lg shadow-lg mx-auto max-w-[90%] my-4">
      <div className="max-w-full mx-auto px-4">
      <h2 className="text-4xl font-bold text-black text-center mb-12">Skills</h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-4 bg-[#d5d5d5] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">Frontend Skills</h3>
            <div className="flex flex-wrap gap-2">
              {renderSkills(frontendSkills)}
            </div>
          </div>

          <div className="p-4 bg-[#d5d5d5] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">Backend Skills</h3>
            <div className="flex flex-wrap gap-2">
              {renderSkills(backendSkills)}
            </div>
          </div>

          <div className="p-4 bg-[#d5d5d5] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {renderSkills(toolsAndPlatforms)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsDisplay;
