import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={className}>
      <Image alt="Logo" src="/logo.png" width={100} height={80} className="h-auto" />
    </Link>
  );
};

export default Logo;
