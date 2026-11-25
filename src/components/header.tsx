"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, SunMoon, X } from "lucide-react";
import { solutions } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const themeSelect = useRef<HTMLSelectElement>(null);
  const solutionMenu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const read = () => {
      try {
        return localStorage.getItem("gc-theme") ?? "system";
      } catch {
        return "system";
      }
    };
    const apply = () => {
      const value = read();
      document.documentElement.dataset.theme =
        value === "system" ? (media.matches ? "dark" : "light") : value;
      if (themeSelect.current) themeSelect.current.value = value;
    };
    apply();
    media.addEventListener("change", apply);
    window.addEventListener("storage", apply);
    return () => {
      media.removeEventListener("change", apply);
      window.removeEventListener("storage", apply);
    };
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (open) {
          setOpen(false);
          menuButton.current?.focus();
        }
        if (solutionMenu.current?.open) {
          solutionMenu.current.open = false;
          solutionMenu.current.querySelector("summary")?.focus();
        }
      }
    };
    const outside = (e: PointerEvent) => {
      if (
        solutionMenu.current &&
        !solutionMenu.current.contains(e.target as Node)
      )
        solutionMenu.current.open = false;
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  function closeMenus() {
    setOpen(false);
    if (solutionMenu.current) solutionMenu.current.open = false;
  }
  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      onClick={closeMenus}
    >
      {label}
    </Link>
  );
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="GlobalCluster — Accueil"
          onClick={closeMenus}
        >
          <Image
            src="/wp-content/uploads/2022/12/logo_globalcluster.png"
            alt="GlobalCluster"
            width={92}
            height={82}
            priority
          />
          <span>Global Cluster</span>
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle icon-button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Navigation principale"
          className={open ? "navigation is-open" : "navigation"}
        >
          <details className="solutions-menu" ref={solutionMenu}>
            <summary
              aria-current={
                pathname.startsWith("/solutions") ? "true" : undefined
              }
            >
              Solutions <ChevronDown size={15} />
            </summary>
            <div className="solutions-dropdown">
              <Link href="/applications" onClick={closeMenus}><span>Explorer les applications</span><small>Démonstrations interactives</small></Link>
              {solutions.map((s) => (
                <Link
                  key={s.slug}
                  href={"/solutions/" + s.slug}
                  onClick={closeMenus}
                  aria-current={
                    pathname === "/solutions/" + s.slug ? "page" : undefined
                  }
                >
                  <span>{s.name}</span>
                  <small>{s.audience}</small>
                </Link>
              ))}
            </div>
          </details>
          {navLink("/documents", "Documents")}
          {navLink("/guides", "Guides")}
          {navLink("/contact", "Contact")}
          <Link
            className="header-platform"
            href="/plateformes"
            aria-current={pathname === "/plateformes" ? "page" : undefined}
            onClick={closeMenus}
          >
            Se connecter <ArrowUpRight size={14} />
          </Link>
        </nav>
        <div className="theme-control">
          <SunMoon size={17} aria-hidden="true" />
          <select
            ref={themeSelect}
            aria-label="Thème d’affichage"
            defaultValue="system"
            onChange={(e) => {
              const value = e.target.value;
              try {
                localStorage.setItem("gc-theme", value);
              } catch {}
              document.documentElement.dataset.theme =
                value === "system"
                  ? matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                  : value;
            }}
          >
            <option value="system">Auto</option>
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </div>
      </div>
    </header>
  );
}
