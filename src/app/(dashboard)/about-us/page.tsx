import Container from '@/components/shared/Container';
import CMSEditor from '@/components/modules/settings/CMSEditor';

const aboutSections = [
  {
    id: 'about-1',
    title: 'Who We Are',
    content:
      'Wander Stay is a leading hotel booking platform that connects travelers with the best accommodation options worldwide. Founded in 2023, we have grown to serve millions of users across 50+ countries, offering a seamless booking experience backed by cutting-edge technology.',
  },
  {
    id: 'about-2',
    title: 'Our Mission',
    content:
      'Our mission is to make travel accessible and enjoyable for everyone. We believe that finding the perfect place to stay should be effortless, whether you are traveling for business, leisure, or adventure. We work closely with hotel partners to ensure quality, reliability, and value for our customers.',
  },
  {
    id: 'about-3',
    title: 'What We Offer',
    content:
      'We offer a curated selection of hotels ranging from budget-friendly stays to luxury resorts. Our platform features real-time availability, transparent pricing, secure payments, and 24/7 customer support. With user reviews, detailed photos, and location-based search, finding your ideal stay has never been easier.',
  },
];

const AboutUsPage = () => {
  return (
    <Container title="About Us" description="Manage the About Us page content.">
      <CMSEditor
        pageTitle="About Us Content"
        pageDescription="Edit the sections displayed on the About Us page of your website."
        initialSections={aboutSections}
      />
    </Container>
  );
};

export default AboutUsPage;
