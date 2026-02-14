import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn("flex w-fit shrink-0 flex-col -space-y-1.5", className)}
    >
      <Image
        alt="Logo"
        src="/icons/logo.png"
        width={120}
        height={80}
        className="h-auto"
      />
    </Link>
  );
};

export default Logo;
