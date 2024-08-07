"use client";

import React, { useState } from 'react';
import "../../src/css/bootstrap.css";
import '../../src/css/agency.css';
import '../../src/css/font-awesome/css/font-awesome.min.css';
import { submitFormToGoogleScript } from '../../src/utils/contact';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormErrors({ ...formErrors, [id]: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await submitFormToGoogleScript(formData);
      setSubmissionStatus('success');
      console.log('Form submitted successfully:', formData);
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <section id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading">Contact Us</h2>
              <h3 className="section-subheading text-muted">
                {submissionStatus === 'success' ? 'Thank you for contacting us!' : 'We\'d love to hear from you. Please fill out the form below to get in touch with us.'}
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form name="sentMessage" id="contactForm" noValidate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name *"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="help-block text-danger">{formErrors.name}</p>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email *"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="help-block text-danger">{formErrors.email}</p>
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Your Phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      <p className="help-block text-danger">{formErrors.phone}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Your Message *"
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                      <p className="help-block text-danger">{formErrors.message}</p>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="col-lg-12 text-center">
                    <div id="success">
                      {submissionStatus === 'success' && <p className="text-success">Your message has been sent successfully!</p>}
                      {submissionStatus === 'error' && <p className="text-danger">There was an error submitting your message. Please try again later.</p>}
                    </div>
                    <button type="submit" className="btn btn-xl">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
