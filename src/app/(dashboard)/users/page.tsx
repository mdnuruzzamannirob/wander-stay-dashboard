import Container from '@/components/shared/Container';
import UsersList from '@/components/modules/users/UsersList';

const UsersPage = () => {
  return (
    <Container title="Users" description="Manage your users and their permissions.">
      <UsersList />
    </Container>
  );
};

export default UsersPage;
