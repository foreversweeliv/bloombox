"use client";

import { Product } from "@/data/products";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

interface OrderFormProps {
  product: Product;
  onClose: () => void;
}

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  className?: string;
}

function FormField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  options,
  className = "",
}: FormFieldProps) {
  const renderInput = () => {
    const baseClasses = `w-full p-2 border rounded-lg ${error ? 'border-red-500' : 'border-accent-dark/20'} ${className}`;
    
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseClasses} min-h-[60px]`}
        />
      );
    }
    
    if (type === "select") {
      return (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={baseClasses}
        >
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
    
    return (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={baseClasses}
      />
    );
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm text-foreground-secondary">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface FormRowProps {
  children: React.ReactNode;
  className?: string;
}

function FormRow({ children, className = "" }: FormRowProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {children}
    </div>
  );
}

export default function OrderForm({ product, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-accent-green-dark success-checkmark" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Order successfully placed!</h3>
        <p className="text-foreground-secondary mb-6">
          Thank you for your purchase! We have sent a confirmation to your email.
        </p>
        <div className="mt-4">
          <Button onClick={onClose} className="w-full">Close</Button>
        </div>
      </div>
    );
  }

  const countries = [
    { value: "Ukraine", label: "Ukraine" },
    { value: "USA", label: "USA" },
    { value: "Great Britain", label: "Great Britain" },
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
    { value: "Italy", label: "Italy" },
    { value: "Spain", label: "Spain" },
    { value: "Portugal", label: "Portugal" },
    { value: "Poland", label: "Poland" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Belgium", label: "Belgium" },
    { value: "Sweden", label: "Sweden" },
    { value: "Norway", label: "Norway" },
    { value: "Denmark", label: "Denmark" },
    { value: "Finland", label: "Finland" },
    { value: "Iceland", label: "Iceland" },
    { value: "Austria", label: "Austria" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Monaco", label: "Monaco" },
    { value: "San Marino", label: "San Marino" },
    { value: "Vatican City", label: "Vatican City" },
    { value: "Other", label: "Other" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg">{product.title}</h3>
          <p className="text-foreground-secondary">${product.price.toFixed(2)}</p>
        </div>
      </div>

      <FormRow>
        <FormField
          id="firstName"
          name="firstName"
          label="Name"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <FormField
          id="lastName"
          name="lastName"
          label="Last name"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
      </FormRow>

      <FormRow>
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <FormField
          id="phone"
          name="phone"
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
      </FormRow>

      <FormField
        id="address"
        name="address"
        label="Address"
        type="textarea"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
        required
      />

      <FormRow>
        <FormField
          id="city"
          name="city"
          label="City"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          required
        />
        <FormField
          id="postalCode"
          name="postalCode"
          label="Postal code"
          value={formData.postalCode}
          onChange={handleChange}
          error={errors.postalCode}
          required
        />
      </FormRow>

      <FormField
        id="country"
        name="country"
        label="Country"
        type="select"
        value={formData.country}
        onChange={handleChange}
        options={countries}
      />

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Placing an order...
            </>
          ) : (
            'Place an order'
          )}
        </Button>
      </div>
    </form>
  );
} 