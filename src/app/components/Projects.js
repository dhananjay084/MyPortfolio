"use client";
import React from "react";

const ProjectSlider = ({ id }) => {
  const projects = [
    {
      title: "Leave Management System",
      description:
        "A comprehensive Leave Management System designed to streamline and automate employee leave tracking, requests, and approvals.",
      fullDescription:
        "The Leave Management System automates the entire leave process, from submission to approval, for both employees and managers. Employees can view their leave balances, submit requests, and upload documents, while managers can approve or modify requests and access team leave schedules. The system allows customization of leave types and policies, sends automated notifications for updates, and generates reports for better planning. It also integrates with payroll systems for salary adjustments and syncs with calendar tools for efficient scheduling.",
      techStack: ["React", "Node.js", "MongoDB"],
      role: "FullStack Developer",
      duration: "6 months",
      github: "https://github.com/project-a",
      liveDemo: "https://project-a.com",
    },
    {
      title: "Real Estate Website",
      description:
        "A user-friendly real estate website designed to help buyers and sellers connect.",
      fullDescription:
        "The Real Estate Website is a platform for buyers, sellers, and agents to explore property listings with detailed information, including images, pricing, and location. It features advanced search filters to refine results by price, location, and property type. Users can create accounts to save favorites and receive alerts. Real estate agents can manage listings and respond to inquiries through a dedicated dashboard. The website is fully responsive, ensuring a seamless experience across devices.",
      techStack: ["React", "WordPress", "MySQL"],
      role: "Front-end Developer",
      duration: "10 months",
      github: "https://github.com/project-b",
      liveDemo: "https://project-b.com",
    }
    ,
    {
      "title": "Security Policy Website",
      "description": "A platform for creating, managing, and viewing security policies for enterprises.",
      "fullDescription": "This project is a web application designed for organizations to create, manage, and share their security policies with ease. Features include user authentication, role-based access control, real-time policy updates, and integration with compliance tools. Administrators can generate custom security policies, while employees can view and acknowledge policies. The platform is optimized for security, ensuring data protection and compliance with industry standards. Technologies used include React for the frontend, PHP for the backend, and MySQL for database management.",
      "techStack": ["React", "PHP", "MySQL"],
      "role": "Front-end Developer",
      "duration": "5 months",
      "github": "https://github.com/project-c",
      "liveDemo": "https://project-c.com"
    }
    ,
    {
      "title": "Admin Dashboard",
      "description": "An admin dashboard for managing email template products, enabling efficient tracking of customer subscriptions.",
      "fullDescription": "This project involves the creation of an admin dashboard for an email template product, similar to Marketo. The platform allows administrators to track customer data, including subscription start and end dates, usage details, and other relevant customer information. With features like customer management, subscription tracking, and analytics, the dashboard helps streamline operations, improve user experience, and optimize product usage. Built with Next.js and MongoDb for data storage, the application provides a seamless user interface and robust functionality.",
      "techStack": ["Next Js", "MongoDb"],
      "role": "Full Stack Developer",
      "duration": "4 months",
      "github": "https://github.com/project-d",
      "liveDemo": "https://project-d.com"
    },
    {
      "title": "Chat-Bot",
      "description": "A conversational AI powered by ChatGPT APIs, designed to automate customer support and enhance user interactions .",
      "fullDescription": "This project involves the creation of a Chat-Bot application using the ChatGPT APIs, designed to provide automated customer support and enhance user interactions. The bot uses natural language processing to understand and respond to user queries in real-time. Integrated with an admin dashboard, it allows administrators to manage conversations, track performance, and analyze user engagement. The system is built with React.js for the frontend and ServiceNow for integration, offering a smooth and interactive user experience.",
      "techStack": ["React Js", "Service Now"],
      "role": "Front-end Developer",
      "duration": "6 months",
      "github": "https://github.com/project-d",
      "liveDemo": "https://project-d.com"
    },
 
    {
      "title": "Dental-Website",
      "description": "A comprehensive platform offering a range of dental services, including specialist care, training, and general oral health information.",
      "fullDescription": "This project involves the creation of a Dental-Website designed to provide a complete range of dental services. The platform offers information on specialist dental services, training for both dental professionals and users, and general oral health resources. Users can easily book appointments with specialists, access dental care tips, and receive guidance on various dental treatments. The website is designed to provide a user-friendly experience, with a responsive interface that works well on both desktop and mobile devices. ",
      "techStack": ["React Js", "Node.Js","MongoDb"],
      "role": "Full Stack Developer",
      "duration": "11 months",
      "github": "https://github.com/project-d",
      "liveDemo": "https://project-d.com"
    }
    ,
    {
      "title": "Song Streaming Platform",
      "description": "A music-sharing platform where users can upload their tracks, follow each other, create playlists, share music stories, and collaborate in groups",
      "fullDescription": "This project is a music-sharing platform that allows users to upload and share their music with others, creating a community of music lovers. Users can follow each other, interact through music stories, and create personalized playlists. Additionally, the platform supports group collaboration, enabling users to form music groups for joint projects or discussions. The application integrates user-friendly features, offering a dynamic space for music enthusiasts to connect and share.",
      "techStack": ["Next Js", "Node Js" , "MongoDb"],
      "role": "Front-end Developer",
      "duration": "9 months",
      "github": "https://github.com/project-d",
      "liveDemo": "https://project-d.com"
    },
    {
      "title": "Hospital and Doctor Management fro NGO",
      "description": "A hospital and doctor management system for NGOs",
      "fullDescription": "This project is a hospital and doctor management system for NGOs, designed to streamline the process of managing healthcare services. Admins can request hospitals, hospitals can request doctors, and doctors can nominate themselves for available roles. The system helps facilitate the smooth interaction between all stakeholders, improving access to healthcare within NGO-supported communities. Built using Next.js for the frontend, Node.js for the backend, and MongoDB for the database, the platform ensures a seamless and efficient management experience.",
      "techStack": ["Next Js", "Node Js" , "MongoDb"],
      "role": "Front-end Developer",
      "duration": "7 months",
      "github": "https://github.com/project-d",
      "liveDemo": "https://project-d.com"
    },
  ];

  return (
    <section id={id} className="py-16 bg-white rounded-lg my-4 shadow-lg mx-auto max-w-[90%]">
      <div className="max-w-full mx-auto px-4">
        <h2 className="text-4xl font-bold text-black text-center mb-12">Latest Projects</h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-[#d5d5d5] rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col max-h-[300px] hover:max-h-[600px] transition-all duration-500 ease-in-out group"
            >
              {/* Skills as Pills (Visible without hover) */}
              <div className="flex gap-2 p-2 flex-wrap">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-white text-black text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>

                {/* Full Description (Hidden initially) */}
                <p className="text-black mt-4 text-sm opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-fit transition-all duration-500 ease-in-out overflow-hidden">
                  {project.fullDescription}
                </p>
              </div>

              {/* Role and Duration (Always visible at the bottom) */}
              <div className="p-4 flex flex-col mt-auto">
                <p>
                  <strong>Role:</strong> {project.role}
                </p>
                <p>
                  <strong>Duration:</strong> {project.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;
