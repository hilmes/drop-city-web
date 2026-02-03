import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-paper dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-large font-extralight tracking-[0.2em] uppercase mb-4">
              Drop City
            </h3>
            <p className="text-small text-gray-500 dark:text-gray-400 max-w-md">
              Digital graffiti for the real world. Leave AR messages pinned to 
              real-world coordinates and discover what others have left behind.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="label text-gray-400 dark:text-gray-500 mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-small text-gray-600 dark:text-gray-400 hover:text-swiss-black dark:hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#features" className="text-small text-gray-600 dark:text-gray-400 hover:text-swiss-black dark:hover:text-white transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="label text-gray-400 dark:text-gray-500 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-small text-gray-600 dark:text-gray-400 hover:text-swiss-black dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-small text-gray-600 dark:text-gray-400 hover:text-swiss-black dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-tiny text-gray-400 dark:text-gray-600">
            © {currentYear} Drop City. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
