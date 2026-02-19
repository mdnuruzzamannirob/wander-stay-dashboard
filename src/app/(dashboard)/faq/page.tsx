import Container from '@/components/shared/Container';
import FAQManager from '@/components/modules/settings/FAQManager';

const FAQPage = () => {
  return (
    <Container title="FAQ" description="Manage frequently asked questions.">
      <FAQManager />
    </Container>
  );
};

export default FAQPage;
