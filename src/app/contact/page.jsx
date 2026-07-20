import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with the Trading Insights team.',
};

export default function ContactPage() {
  return (
    <div className="container section" style={{ maxWidth: 480 }}>
      <p className="eyebrow">Contact</p>
      <h1>Talk to us</h1>
      <ContactForm />
    </div>
  );
}
