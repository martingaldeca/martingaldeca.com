import Header from "@/components/organisms/Header";
import Hero from "@/components/organisms/Hero";
import About from "@/components/organisms/About";

export default function HomeTemplate() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-text-primary bg-bg">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        {}
      </main>
      <footer
        className="py-8 text-center text-text-secondary text-sm bg-background"
        style={{
          borderTop: "1px solid var(--surface-border)",
          backgroundColor: "var(--background)",
        }}
      >
        <p>
          © {new Date().getFullYear()} Martín Galdeano Cañizares. All rights
          reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          {}
        </div>
      </footer>
    </div>
  );
}
