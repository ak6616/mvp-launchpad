export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              MVP Launchpad
            </span>
            <span className="text-sm text-zinc-500">
              Launch faster, grow smarter.
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </nav>
        </div>

        <div className="mt-8 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} MVP Launchpad. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
