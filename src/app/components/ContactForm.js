'use client';
import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const ContactForm = ({ id }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false); // State to track sending status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSending(true); // Set sending status to true when form is submitted

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Message sent successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
        });
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to send message. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setIsSending(false); // Reset sending status after the email is sent or error occurs
    }
  };

  return (
    <section id={id} className="py-16 px-6 bg-white text-white mx-auto max-w-[90%] w-full my-4 rounded-lg">
      {/* Toast Container */}
      <ToastContainer />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-[#d5d5d5] rounded-lg p-8 shadow-lg flex flex-col justify-between text-black">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact </h2>
            <p className="text-black mb-6">
              I would love to hear from you! Feel free to reach out to us with any inquiries or feedback.
            </p>
            <div className="mb-4 flex items-center">
              <FiPhone className="text-xl mr-3" />
              <a href="tel:+919781345418" className="text-black cursor-pointer">
                +91 97813 45418
              </a>
            </div>
            <div className="mb-4 flex items-center">
              <FiMail className="text-xl mr-3" />
              <a href="mailto:dhananjaybansal28@gmail.com" className="text-black cursor-pointer">
                dhananjaybansal28@gmail.com
              </a>
            </div>
            <div className="mb-4 flex items-center">
              <FiMapPin className="text-xl mr-3" />
              <span className="text-black">Chandigarh, India</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#d5d5d5] rounded-lg p-8 shadow-lg text-gray-700"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-bold mb-2">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-[#5A55FA] px-6 py-2 rounded text-white hover:bg-[#4A44D4] transition"
            disabled={isSending} // Disable the button while sending
          >
            {isSending ? 'Sending...' : 'Send Message'} {/* Button text changes based on sending status */}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
