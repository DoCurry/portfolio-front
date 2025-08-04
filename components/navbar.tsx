"use client"
import { useState, useEffect, RefObject } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react"
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SectionRefs {
  about: RefObject<HTMLElement>;
  projects: RefObject<HTMLElement>;
  experience: RefObject<HTMLElement>;
  education: RefObject<HTMLElement>;
  skills: RefObject<HTMLElement>;
  certifications: RefObject<HTMLElement>;
  contact: RefObject<HTMLElement>;
}

interface NavbarProps {
  sectionRefs: SectionRefs;
}

const NavLinks = [
  { key: "skills" as keyof SectionRefs, label: "Skills" },
  { key: "experience" as keyof SectionRefs, label: "Experience" },
  { key: "education" as keyof SectionRefs, label: "Education" },
  { key: "projects" as keyof SectionRefs, label: "Projects" },
  { key: "certifications" as keyof SectionRefs, label: "Certifications" },
  { key: "contact" as keyof SectionRefs, label: "Contact" },
]

export function Navbar({ sectionRefs }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionKey: keyof SectionRefs) => {
    const element = sectionRefs[sectionKey].current;
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  if (!mounted) return null;

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/40 backdrop-blur-md border-b border-divider shadow-lg'
          : 'bg-background border-b border-divider'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              href="/"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200"
            >
              My Portfolio
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NavLinks.map((link, index) => (
              <motion.div
                key={link.label}
                custom={index}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  onClick={() => scrollToSection(link.key)}
                  className="relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 group"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </button>
              </motion.div>
            ))}

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-foreground/80 hover:text-primary"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "light" ?
                    <Icon icon="solar:moon-bold" width="20" height="20" /> :
                    <Icon icon="mingcute:sun-fill" width="20" height="20" />
                  }
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-foreground/80"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "light" ?
                    <Icon icon="solar:moon-bold" width="20" height="20" /> :
                    <Icon icon="mingcute:sun-fill" width="20" height="20" />
                  }
                </motion.div>
              </Button>
            </motion.div>

            {/* Hamburger Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-foreground/80"
                onClick={() => setIsOpen(!isOpen)}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon
                    icon={isOpen ? "solar:close-square-bold" : "solar:hamburger-menu-bold"}
                    width="20"
                    height="20"
                  />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-divider">
                {NavLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    custom={index}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <button
                      onClick={() => scrollToSection(link.key)}
                      className="block w-full text-left py-2 px-4 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                    >
                      {link.label}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}