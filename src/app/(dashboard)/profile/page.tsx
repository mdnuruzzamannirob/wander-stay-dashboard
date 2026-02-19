import Container from '@/components/shared/Container';
import ProfileSettings from '@/components/modules/settings/ProfileSettings';

const ProfilePage = () => {
  return (
    <Container title="Profile" description="Manage your personal information and password.">
      <ProfileSettings />
    </Container>
  );
};

export default ProfilePage;
