import Container from '@/components/shared/Container';
import BookingsList from '@/components/modules/bookings/BookingsList';

const BookingsPage = () => {
  return (
    <Container title="Bookings" description="Manage all your bookings here.">
      <BookingsList />
    </Container>
  );
};

export default BookingsPage;
