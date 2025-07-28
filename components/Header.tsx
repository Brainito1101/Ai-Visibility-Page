import Image from "next/image";
import Link from "next/link";





export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/images/icon.png" alt="Logo" width={50} height={50} />
          <span className="text-3xl font-bold text-purple-700">Brainito</span>
          </Link>
        </div>
        </div>
      
    </header>
  );
}