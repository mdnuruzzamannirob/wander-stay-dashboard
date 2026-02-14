import Header from '../layout/Header';

export default function Container({
  children,
  title,
  description,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  description?: string;
}>) {
  return (
    <>
      <Header title={title} description={description} />
      <div className="px-3 pb-8 lg:px-5">{children}</div>
    </>
  );
}
