import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FiSend, FiDownload, FiGithub } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import resumePDF from '../assets/Steven-Pierre-Resume.pdf';
import { profile } from '../data/profile';

const fieldClass = 'w-full rounded-2xl px-5 py-4 bg-transparent border outline-none transition-colors focus:border-[color:var(--primary)]';

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
    <section id="contact" className="relative py-28 sm:py-36 px-5 sm:px-8 overflow-hidden">
      <div className="orb w-[36rem] h-[36rem] -bottom-60 -right-40" style={{ background: 'var(--glow-soft)' }} aria-hidden />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">
        <Reveal>
          <p className="eyebrow mb-4">07 — Contact</p>
          <h2 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight leading-[0.95] mb-6">
            Let's build <span className="gradient-text">something.</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed max-w-md mb-9">
            Need a website, a React app sped up, or a hand with IT? Send a note and I'll get back to you.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={resumePDF} download="Steven-Pierre-Resume.pdf" className="btn btn-ghost">
              <FiDownload /> Download resume
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <FiGithub /> GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-9 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm text-muted mb-2">Name</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className={fieldClass} style={{ borderColor: 'var(--border)' }} required />
              </label>
              <label className="block">
                <span className="block text-sm text-muted mb-2">Email</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={fieldClass} style={{ borderColor: 'var(--border)' }} required />
              </label>
            </div>
            <label className="block">
              <span className="block text-sm text-muted mb-2">Message</span>
              <textarea name="message" rows={5} value={formData.message} onChange={handleChange} className={`${fieldClass} resize-none`} style={{ borderColor: 'var(--border)' }} required />
            </label>
            <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center disabled:opacity-60">
              {loading ? 'Sending...' : 'Send message'} <FiSend />
            </button>
            {feedbackMessage && (
              <p className="text-center text-sm text-accent" role="status">
                {feedbackMessage}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
