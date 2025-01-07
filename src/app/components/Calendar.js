'use client';
import { useState } from 'react';
import { CiCircleInfo } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import FullCalendar from '@fullcalendar/react'; // FullCalendar Component
import dayGridPlugin from '@fullcalendar/daygrid'; // Day grid view for the calendar
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const Calendar = ({ id }) => {
  const [interviewDate, setInterviewDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [events, setEvents] = useState([]);
  const [jobDescription, setJobDescription] = useState(null);
  const [isSending, setIsSending] = useState(false); // State to track sending status

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true); // Set sending status to true when form is submitted

    const formData = new FormData();
    formData.append('interviewDate', interviewDate);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('meetingLink', meetingLink);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }

    try {
      // Dismiss any existing toasts before showing a new one
      toast.dismiss();

      const response = await fetch('/api/sent-link', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Interview scheduled successfully!', { autoClose: 1000 }); // Auto-close after 1 second
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            title: 'Interview',
            start: interviewDate + 'T' + startTime,
            end: interviewDate + 'T' + endTime,
            url: meetingLink,
            description: `Interview from ${startTime} to ${endTime}`,
            extendedProps: {
              description: `Interview from ${startTime} to ${endTime}`,
            }
          },
        ]);
      } else {
        toast.error('Error scheduling interview: ' + data.message, { autoClose: 1000 }); // Auto-close after 1 second
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error scheduling interview.', { autoClose: 1000 }); // Auto-close after 1 second
    } finally {
      setIsSending(false); // Reset sending status after the email is sent or error occurs
    }
  };

  return (
    <section id={id} className="py-6 px-4 sm:px-6 lg:px-8 bg-white max-w-[90%] w-full mx-auto rounded-lg shadow-lg overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <span className="flex items-center justify-center mx-auto w-fit mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Schedule an Interview</h2>
          <span className="relative group">
            <CiCircleInfo className="text-xl text-indigo-600 cursor-pointer" />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 p-2 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Interview details will be sent through mail.
            </div>
          </span>
        </span>
        
        <div className="px-4 sm:px-6">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Interview Date Field */}
              <div className="flex flex-col">
                <label htmlFor="interviewDate" className="mb-2 text-sm font-semibold text-left">Interview Date</label>
                <input
                  type="date"
                  id="interviewDate"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="px-4 py-2 border rounded w-full"
                  required
                />
              </div>

              {/* Start Time Field */}
              <div className="flex flex-col">
                <label htmlFor="startTime" className="mb-2 text-sm font-semibold text-left">Start Time</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="px-4 py-2 border rounded w-full"
                  required
                />
              </div>

              {/* End Time Field */}
              <div className="flex flex-col">
                <label htmlFor="endTime" className="mb-2 text-sm font-semibold text-left">End Time</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="px-4 py-2 border rounded w-full"
                  required
                />
              </div>

              {/* Meeting Link Field */}
              <div className="flex flex-col">
                <label htmlFor="meetingLink" className="mb-2 text-sm font-semibold text-left">Meeting Link</label>
                <input
                  type="url"
                  id="meetingLink"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="Enter meeting link"
                  className="px-4 py-2 border rounded w-full"
                  required
                />
              </div>

              {/* Job Description Field */}
              <div className="flex flex-col">
                <label htmlFor="jobDescription" className="mb-2 text-sm font-semibold text-left">Job Description</label>
                <input
                  type="file"
                  id="jobDescription"
                  accept="application/pdf"
                  onChange={(e) => setJobDescription(e.target.files ? e.target.files[0] : null)}
                  className="px-4 py-2 border rounded w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-primary px-6 py-2 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>

        {/* FullCalendar Component */}
        <div className="mt-10 border border-gray-300 rounded-lg p-4 bg-white overflow-hidden">
          <div className="w-full">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: '',
              }}
              eventClick={(info) => {
                if (info.event.url) {
                  window.open(info.event.url, '_blank');
                }
              }}
              locale="en"
              eventColor="#3b82f6"
              height="auto"
            />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </section>
  );
};

export default Calendar;
