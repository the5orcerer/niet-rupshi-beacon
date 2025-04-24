
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-niet-navy dark:text-white">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including when you create an account, make an application, or contact us for support.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to process your applications, and to communicate with you.
            </p>

            <h2>3. Information Sharing and Security</h2>
            <p>
              We do not share your personal information with third parties except as described in this privacy policy. We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.
            </p>

            <h2>4. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You can do this by contacting us directly.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
