import Container from '@/components/shared/Container';
import PaymentsList from '@/components/modules/payments/PaymentsList';

const PaymentsAndFinance = () => {
  return (
    <Container
      title="Payments & Finance"
      description="Track revenue, refunds, and transaction history."
    >
      <PaymentsList />
    </Container>
  );
};

export default PaymentsAndFinance;
