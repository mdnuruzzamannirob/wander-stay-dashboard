import Container from '@/components/shared/Container';
import ContactMessagesList from '@/components/modules/contact-message/ContactMessagesList';

const ContactMessagePage = () => {
  return (
    <Container title="Contact Messages" description="Manage all your contact messages here.">
      <ContactMessagesList />
    </Container>
  );
};

export default ContactMessagePage;
