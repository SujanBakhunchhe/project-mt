import Link from "next/link";
import { PrimaryButton } from "@/components/Buttons";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-white/70 text-lg mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <PrimaryButton size="lg" className="px-8 py-6">
              Go Back Home
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
