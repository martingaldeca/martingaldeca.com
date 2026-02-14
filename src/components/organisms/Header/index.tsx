"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import ThemeSwitch from "@/components/atoms/ThemeSwitch";

const Header = () => {
  const t = useTranslations("Header");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "es" : "en";

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 py-6 px-8 transition-all duration-300"
      style={{
        backgroundColor: "var(--header-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--header-border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold tracking-tighter hover:text-primary transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          &lt;Martin /&gt;
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: t("projects"), href: `/${locale}/projects` },
            { label: t("personal"), href: `/${locale}/personal` },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {link.label}
            </Link>
          ))}

          {}
          <ThemeSwitch />

          {}
          <Link
            href={`/${otherLocale}`}
            className="text-xs font-semibold uppercase px-3 py-1.5 rounded-full transition-all"
            style={{
              color: "var(--text-secondary)",
              border: "1px solid var(--surface-border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "var(--text-muted)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--surface-border)";
            }}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </nav>

        {}
        <button className="md:hidden" style={{ color: "var(--text-primary)" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
