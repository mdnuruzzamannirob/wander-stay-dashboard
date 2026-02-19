import Container from '@/components/shared/Container';
import CMSEditor from '@/components/modules/settings/CMSEditor';

const privacySections = [
  {
    id: 'privacy-1',
    title: 'Information We Collect',
    content:
      'We collect information you provide directly to us, such as when you create an account, make a booking, contact customer support, or participate in surveys. This includes your name, email address, phone number, payment information, and booking preferences. We also automatically collect certain information when you use our platform, including your IP address, browser type, device information, and usage data.',
  },
  {
    id: 'privacy-2',
    title: 'How We Use Your Information',
    content:
      'We use the information we collect to provide, maintain, and improve our services; process bookings and payments; send you booking confirmations and updates; respond to your comments, questions, and requests; send you marketing communications (with your consent); monitor and analyze trends, usage, and activities; detect, investigate, and prevent fraudulent transactions and other illegal activities; and personalize and improve your experience.',
  },
  {
    id: 'privacy-3',
    title: 'Information Sharing',
    content:
      'We may share your personal information with hotel partners to facilitate your bookings; payment processors to process transactions; service providers who assist us in operating our platform; law enforcement or government agencies when required by law; and business partners for joint marketing purposes (with your consent). We do not sell your personal information to third parties.',
  },
  {
    id: 'privacy-4',
    title: 'Data Security',
    content:
      'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure socket layer (SSL) technology, regular security assessments, and access controls. However, no method of transmission over the internet is 100% secure.',
  },
  {
    id: 'privacy-5',
    title: 'Your Rights',
    content:
      'You have the right to access, update, or delete your personal information at any time through your account settings. You may also opt out of marketing communications, request a copy of your data, or request data portability. To exercise these rights, please contact us at privacy@wanderstay.com.',
  },
];

const PrivacyPolicyPage = () => {
  return (
    <Container title="Privacy Policy" description="Manage the Privacy Policy content.">
      <CMSEditor
        pageTitle="Privacy Policy Content"
        pageDescription="Edit the sections displayed on the Privacy Policy page of your website."
        initialSections={privacySections}
      />
    </Container>
  );
};

export default PrivacyPolicyPage;
