import Link from "next/link";
import { Home, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const companyLinks = [
  { title: "About Us", href: "/about" },
  { title: "Mission & Vision", href: "/mission" },
  { title: "Contact", href: "/contact" },
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
  { title: "Partnerships", href: "/partnerships" },
  { title: "Vendor Signup", href: "/vendor-signup" },
];

const otherLinks = [
  { title: "FAQs", href: "/faqs" },
  { title: "Servly Blog", href: "/blog" },
  { title: "Feedback & Suggestions", href: "/feedback" },
  { title: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3 my-8">
          {/* Company */}
          <div>
            {/* <div className="mb-3 flex items-center gap-2">
              <Home className="size-5 text-primary" />
              <span className="text-lg font-bold text-foreground">Servly</span>
            </div> */}
            <h1 className="mb-3 text-sm font-semibold text-foreground">Company</h1>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h1 className="mb-3 text-sm font-semibold text-foreground">Other Links</h1>
            <ul className="space-y-2">
              {otherLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h1 className="mb-3 text-sm font-semibold text-foreground">Contact Us</h1>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Head Office - 2nd Floor, Munshi Pulia, Metro Station, Metro Plaza,
                  Flat NO - 103, Sector 17, Indira Nagar, Lucknow, Uttar Pradesh 226016
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href="tel:7667163373" className="text-sm text-muted-foreground hover:text-foreground">
                  7667163373
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href="mailto:support@servly.in" className="text-sm text-muted-foreground hover:text-foreground">
                  support@servly.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <Separator className="my-8" /> */}

        {/* About */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">About Servly</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Online home service subscription packages &amp; on-demand home cleaning
            services. SERVLY is currently the largest cleaning service provider
            with growing business opportunities in the Indian market.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            With growing jobs in urban areas, people don&apos;t have ample time
            to take care of everything on their own. We serve people with every
            possible service at their doorsteps at a premium and reliable cost.
          </p>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Servly. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with <span className="text-red-500">&hearts;</span> by Servly
          </p>
        </div>
      </div>
    </footer>
  );
}
