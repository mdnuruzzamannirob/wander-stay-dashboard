import Container from '@/components/shared/Container';
import CMSEditor from '@/components/modules/settings/CMSEditor';

const cancellationSections = [
  {
    id: 'cancel-1',
    title: 'Standard Cancellation Policy',
    content:
      'Guests may cancel their booking free of charge up to 48 hours before the scheduled check-in date. A full refund will be issued to the original payment method within 5-7 business days. Cancellations made within 48 hours of check-in are subject to a cancellation fee equivalent to one night\'s stay.',
  },
  {
    id: 'cancel-2',
    title: 'Non-Refundable Bookings',
    content:
      'Some bookings are marked as non-refundable at the time of purchase. These bookings offer a discounted rate in exchange for a no-cancellation commitment. Non-refundable bookings cannot be cancelled, modified, or refunded under any circumstances except as required by applicable law.',
  },
  {
    id: 'cancel-3',
    title: 'No-Show Policy',
    content:
      'If a guest fails to check in on the scheduled date without prior cancellation, this is considered a no-show. No-show guests will be charged the full booking amount. The reservation will be automatically cancelled after 24 hours past the check-in time, and no refund will be provided.',
  },
  {
    id: 'cancel-4',
    title: 'Modification Policy',
    content:
      'Booking modifications (such as date changes, room upgrades, or guest name changes) are subject to availability and may result in price adjustments. Modifications can be requested through the Bookings section of your account or by contacting customer support. Some modifications may be treated as a cancellation and rebooking.',
  },
  {
    id: 'cancel-5',
    title: 'Force Majeure',
    content:
      'In the event of unforeseen circumstances such as natural disasters, government restrictions, pandemics, or other force majeure events that prevent travel, we will work with hotel partners to offer either a full refund or credit for future bookings. Each case will be evaluated individually based on the circumstances.',
  },
];

const CancellationPolicyPage = () => {
  return (
    <Container title="Cancellation Policy" description="Manage the Cancellation Policy content.">
      <CMSEditor
        pageTitle="Cancellation Policy Content"
        pageDescription="Edit the sections displayed on the Cancellation Policy page of your website."
        initialSections={cancellationSections}
      />
    </Container>
  );
};

export default CancellationPolicyPage;
