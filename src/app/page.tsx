import Hero from "@/components/landing/Hero";
import Navbar from "@/components/Navbar";
import Galeri from "@/components/landing/Galeri";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="pt-24">
        <Hero />
        <Galeri />
      </main>
    </>
  );
}
