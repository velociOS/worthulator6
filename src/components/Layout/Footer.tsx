import Link from "next/link"

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-500">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:px-6 lg:px-8">
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-gray-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-gray-300">
          © {new Date().getFullYear()} Worthulator. Estimates only — not financial advice.
        </p>
      </div>
    </footer>
  )
}
