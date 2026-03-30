import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { already?: string };
}) {
  const alreadyConfirmed = searchParams.already === "true";

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          {alreadyConfirmed ? "Already Confirmed!" : "You're on the list!"}
        </h1>
        <p className="text-zinc-400 mb-8">
          {alreadyConfirmed
            ? "Your email was already confirmed. You're all set!"
            : "Thanks for confirming your email. We'll reach out when we're ready to launch."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-medium text-sm transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
