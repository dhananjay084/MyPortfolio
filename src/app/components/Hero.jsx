'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import BannerImage from "../../../public/banner.gif";

const Hero = ({ id }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false); // Track sending status

  const handleSendResume = async () => {
    setSending(true); // Start sending process
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('Resume sent successfully!');
        setEmail('');
        toast.success('Resume sent successfully!', { autoClose: 1000 });
      } else {
        const errorData = await res.json();
        setStatus(errorData.message || 'Failed to send the resume. Please try again.');
        toast.error(errorData.message || 'Failed to send the resume. Please try again.', { autoClose: 1000 });
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.', { autoClose: 1000 });
    } finally {
      setSending(false); // Reset sending state after completion
    }
  };

  return (
    <section
      id={id}
      className="bg-white text-gray-800 py-20 px-6 max-w-[90%] w-full mx-auto shadow-lg rounded-lg mt-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-2">
            Hello, I'm a <span className="text-blue-500">React Developer</span>.
          </h1>
          <p className="text-gray-600 mb-6">
            Hi! I’m Dhananjay, a passionate React developer dedicated to creating efficient and scalable web applications. Welcome to my portfolio!
          </p>

          {/* Send Resume Section */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Enter your email to get my resume"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded mb-2 focus:outline-none"
            />
            <button
              onClick={handleSendResume}
              className="bg-blue-500 px-6 py-2 rounded text-white hover:bg-blue-600 transition"
              disabled={sending} // Disable the button while sending
            >
              {sending ? 'Sending...' : 'Get Resume'} {/* Button text change */}
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="hidden lg:block">
          <Image
            src={BannerImage}
            alt="React Developer Illustration"
            width={500}
            height={500}
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
};

export default Hero;
