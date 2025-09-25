import Navbar from "@/app/navbar"

export default function Home() {
  return (
    <div className="font-sans min-h-screen mx-auto p-8 pb-20 gap-16 sm:p-20">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start align-left">
        <header className="text-8xl font-title font-bold text-left">TiNA WANG.</header>
        <section className="font-serif w-lg">
            <p className="my-5">
                Hi! I&apos;m Tina, and I&apos;m a computer science major especially interested in systems
                and solving interesting problems. I love exploring the interactions that arise
                between humans and their environment. Talk to me about anything CS, philosophy,
                chinese history, art.
            </p>
        </section>
      </main>
    </div>
  );
}
