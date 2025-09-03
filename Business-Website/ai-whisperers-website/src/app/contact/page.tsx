import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import FAQ from '@/components/contact/FAQ';

export const metadata: Metadata = {
  title: 'Contact Us | AI-Whisperers | Get Expert AI Education Guidance',
  description: 'Get personalized guidance for your AI learning journey. Free consultation, course recommendations, and expert support from AI education specialists.',
  keywords: 'AI education consultation, AI course guidance, AI training support, artificial intelligence learning help',
  openGraph: {
    title: 'Contact AI-Whisperers | Expert AI Education Guidance',
    description: 'Get personalized AI learning recommendations and expert guidance. Free consultation available.',
    url: 'https://ai-whisperers.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Get Expert AI Education Guidance
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Not sure which course is right for you? Need help planning your AI learning journey? 
            Our experts are here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </main>
  );
}