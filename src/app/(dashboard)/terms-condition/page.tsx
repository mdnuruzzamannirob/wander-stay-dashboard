import Container from '@/components/shared/Container';
import CMSEditor from '@/components/modules/settings/CMSEditor';

const termsSections = [
  {
    id: 'terms-1',
    title: 'Acceptance of Terms',
    content:
      'By accessing and using the Wander Stay platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of the platform constitutes acceptance of any changes.',
  },
  {
    id: 'terms-2',
    title: 'User Accounts',
    content:
      'To use certain features of our platform, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration and keep your account information updated. We reserve the right to suspend or terminate accounts that violate these terms.',
  },
  {
    id: 'terms-3',
    title: 'Booking and Payments',
    content:
      'All bookings made through our platform are subject to availability and confirmation by the hotel partner. Prices displayed include applicable taxes unless otherwise stated. Payment is required at the time of booking unless the hotel offers a pay-at-property option. We use secure payment processing and do not store your full credit card details on our servers.',
  },
  {
    id: 'terms-4',
    title: 'User Conduct',
    content:
      'You agree not to use our platform for any unlawful purpose; post false, misleading, or fraudulent content; attempt to gain unauthorized access to other accounts or systems; interfere with the proper functioning of the platform; harass, abuse, or harm other users; or violate any applicable local, national, or international law or regulation.',
  },
  {
    id: 'terms-5',
    title: 'Limitation of Liability',
    content:
      'Wander Stay shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. Our total liability shall not exceed the amount paid by you for the specific booking in question. We are not responsible for the actions, services, or quality provided by hotel partners.',
  },
];

const TermsConditionPage = () => {
  return (
    <Container title="Terms & Condition" description="Manage the Terms & Conditions content.">
      <CMSEditor
        pageTitle="Terms & Conditions Content"
        pageDescription="Edit the sections displayed on the Terms & Conditions page of your website."
        initialSections={termsSections}
      />
    </Container>
  );
};

export default TermsConditionPage;
