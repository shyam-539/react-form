import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

const ProductInquiryForm = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [isPreview, setIsPreview] = useState(false);

  const validateForm = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!data.name) errors.name = 'Name is required';
    if (!data.email || !emailRegex.test(data.email)) errors.email = 'Invalid email address';
    if (!data.phone || !phoneRegex.test(data.phone)) errors.phone = 'Phone number must be 10 digits';
    if (!data.message || data.message.length < 10) errors.message = 'Message should be at least 10 characters';
    return errors;
  };

  const handlePreview = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const errors = validateForm(data);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setFormData(data);
      setIsPreview(true);
    }
  };

  const handleSubmit = () => {
    navigate('/thank-you', { state: formData });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Product Inquiry Form</h2>
      {!isPreview ? (
        <form onSubmit={handlePreview} className="form">
          <div className="form-group">
            <label>
              Name:
              <input type="text" name="name" className="form-input" />
            </label>
            {formErrors.name && <span className="form-error">{formErrors.name}</span>}
          </div>
          <div className="form-group">
            <label>
              Email:
              <input type="email" name="email" className="form-input" />
            </label>
            {formErrors.email && <span className="form-error">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <label>
              Phone:
              <input type="tel" name="phone" className="form-input" />
            </label>
            {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
          </div>
          <div className="form-group">
            <label>
              Message:
              <textarea name="message" rows="4" className="form-input"></textarea>
            </label>
            {formErrors.message && <span className="form-error">{formErrors.message}</span>}
          </div>
          <button type="submit" className="form-button">Preview</button>
        </form>
      ) : (
        <div>
          <h3>Preview Your Details</h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Message:</strong> {formData.message}</p>
          <button className="form-button" onClick={() => setIsPreview(false)}>Edit</button>
          <button className="form-button" onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

const ThankYouPage = () => {
  const { state } = useLocation();
  if (!state) return <p>No data provided!</p>;

  return (
    <div className="form-container">
      <h2 className="form-title">Thank You!</h2>
      <p>Your inquiry has been received. We'll contact you shortly!</p>
      <ul>
        <li><strong>Name:</strong> {state.name}</li>
        <li><strong>Email:</strong> {state.email}</li>
        <li><strong>Phone:</strong> {state.phone}</li>
        <li><strong>Message:</strong> {state.message}</li>
      </ul>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductInquiryForm />,
  },
  {
    path: '/thank-you',
    element: <ThankYouPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
