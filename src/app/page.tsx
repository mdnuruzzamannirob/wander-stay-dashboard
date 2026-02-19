import { redirect } from 'next/navigation';

const HomePage = () => {
  redirect('/overview');
  // return <div>HomePage</div>;
};

export default HomePage;
