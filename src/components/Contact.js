import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage('');

    const serviceID = 'service_2d1xbcq';
    const templateID = 'template_sr0xenc';
    const publicKey = 'HuORjpvKqMxU4SAz0';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Steven Pierre',
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setLoading(false);
        setFeedbackMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setLoading(false);
        setFeedbackMessage('Failed to send message. Try again later.');
      });
  };

  return (
    <section>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Contact Me</h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded bg-gray-700 text-white" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded bg-gray-700 text-white" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-3 rounded bg-gray-700 text-white" required />
          </div>
          <button type="submit" className="bg-purple-700 text-white py-2 px-6 rounded">{loading ? 'Sending...' : 'Send Message'}</button>
        </form>
        {feedbackMessage && <p className="mt-4 text-center text-red-500">{feedbackMessage}</p>}
      </div>
    </section>
  );
};

export default Contact;
