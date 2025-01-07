import Image from 'next/image';
import AboutMe from "../../../public/aboutme.gif";

const About = ({ id }) => {
  return (
    <section
      id={id}
      className="py-16 px-6 bg-white text-black max-w-[90%] sm:max-w-[90%] w-full mx-auto rounded-lg my-4 shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-black mb-6">
            Hello! I’m <span className="font-bold text-indigo-600">Dhananjay</span>, a highly motivated and detail-oriented
            <span className="font-semibold text-indigo-600"> Software Engineer</span> specializing in developing modern web applications with a focus on user-centric design and performance optimization. 
          </p>
          <p className="text-lg text-black mb-6">
            I have worked on multiple projects, ranging from building small business websites to creating large-scale enterprise-level applications. My strength lies in my ability to adapt quickly to new challenges and continuously learn the latest tools and technologies.
          </p>
          <p className="text-lg text-black mb-6">
            Beyond coding, I am an excellent communicator and a firm believer in teamwork. I thrive in collaborative environments and enjoy working closely with designers, product managers, and other developers to bring ideas to life. 
          </p>
          <p className="text-lg text-black">
            When I’m not coding, I enjoy exploring new technologies, playing games, and contributing to open-source projects. I’m also passionate about mentoring and sharing knowledge with the developer community.
          </p>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="absolute inset-0 w-full h-full rounded-full bg-yellow-500 opacity-30 translate-x-6 translate-y-6 sm:translate-x-8 sm:translate-y-8 lg:translate-x-10 lg:translate-y-10"></div>
            <Image
              src={AboutMe}
              alt="Profile"
              width={500}
              height={500}
              className="relative z-10 w-full h-auto rounded-full border-8 border-indigo-900 object-cover shadow-lg"
              priority
            />
          </div>
        </div>
      </div>

      {/* Company Card Section */}
      <div className="mt-16 flex justify-center">
        <div className="bg-[#d5d5d5] text-black p-6 rounded-lg shadow-xl max-w-lg w-full">
          <h3 className="text-2xl font-bold mb-4 text-center">Professional Experience</h3>
          <div className="bg-white text-black p-4 rounded-lg shadow-md relative">
            <h4 className="text-xl font-bold mb-2 text-center">Grazitti Interactive</h4>
            <p className="text-center text-sm text-gray-700 mb-4 font-bold">Software Engineer</p>
            
            {/* Timeline Section */}
            <div className="relative">
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-300"></div>
              <div className="flex justify-between items-center">
                <div className="relative text-center">
                  <div className="w-4 h-4 bg-gray-600 rounded-full mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600 font-semibold">Start Date:</p>
                  <p className="text-sm text-gray-800">January 2021</p>
                </div>
                <div className="relative text-center">
                  <div className="w-4 h-4 bg-gray-600 rounded-full mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600 font-semibold">End Date:</p>
                  <p className="text-sm text-gray-800">Current</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
