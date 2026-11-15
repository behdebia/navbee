export function NavbeeEcosystem() {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-24 text-white md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#FFD21A]">
            THE NAVBEE ECOSYSTEM
          </span>

          <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
            Technology built for
            <span className="text-[#FFD21A]"> what comes next.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
            We create intelligent technology to help businesses
            evolve, innovate and move forward.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="group rounded-2xl border border-[#FFD21A]/40 bg-[#111111] p-8 transition duration-300 hover:border-[#FFD21A] hover:bg-[#151515]">
            <span className="text-xs tracking-widest text-[#FFD21A]">
              01 / PRODUCTS
            </span>

            <h3 className="mt-8 text-3xl font-semibold">
              Our AI Products
            </h3>

            <p className="mt-4 min-h-20 leading-relaxed text-white/55">
              Proprietary AI-powered tools designed to
              simplify workflows, solve problems and
              unlock new possibilities.
            </p>

            <div className="mt-8 border-t border-white/10 pt-5">
              <span className="text-sm font-medium text-[#FFD21A]">
                Explore our technology ↗
              </span>
            </div>
          </article>

          <article className="group rounded-2xl border border-white/10 bg-[#111111] p-8 transition duration-300 hover:border-[#FFD21A]/60 hover:bg-[#151515]">
            <span className="text-xs tracking-widest text-[#FFD21A]">
              02 / SOLUTIONS
            </span>

            <h3 className="mt-8 text-3xl font-semibold">
              Custom AI Solutions
            </h3>

            <p className="mt-4 min-h-20 leading-relaxed text-white/55">
              Tailor-made AI solutions, intelligent
              automation and integrations built around
              the unique needs of your business.
            </p>

            <div className="mt-8 border-t border-white/10 pt-5">
              <a
                href="#contact"
                className="text-sm font-medium text-[#FFD21A]"
              >
                Build with us ↗
              </a>
            </div>
          </article>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <h3 className="text-2xl font-medium">
            One vision. Multiple possibilities.
          </h3>

          <span className="text-sm tracking-widest text-white/40">
            NAVIGATE. INNOVATE. EVOLVE.
          </span>
        </div>
      </div>
    </section>
  );
}
