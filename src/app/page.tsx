import Link from 'next/link';

export default function Page() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/image.png')",
        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-white">
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight">
            Talk to AI
          </h1>
          <p className="text-lg md:text-2xl mt-3 font-extralight tracking-widest text-white/80">
            Fale com uma inteligência Artificial ou faça upload de arquivos
          </p>
        </div>

        <div className="p-12 text-center text-white-900 mb-10">

          <div className="flex gap-4 justify-center flex-wrap">

            <Link
              href="/chat"
              className="border border-white/40 text-white px-8 py-4 rounded-2xl font-light text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Type to AI
            </Link>

            <Link
              href="/upload"
              className="border border-white/40 text-white px-8 py-4 rounded-2xl font-light text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Upload
            </Link>

            
          </div>
        </div>

        <div className="flex justify-center mb-20">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 max-w-lg">
            <h2 className="text-4xl font-light tracking-tight text-white mb-4">
              Powered by Gemma 3
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Respostas com Gemma3 local, oferecendo conversas naturais e contextualmente relevantes.
            </p>
          </div>
        </div>

        


        <div className="mt-20 text-center">
          <h3 className="text-2xl font-light text-white/90 mb-10 tracking-wide">
            Tecnologias Utilizadas
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "", name: "Next.js", desc: "Frontend" },
              { icon: "", name: "NestJS", desc: "Backend" },
              { icon: "", name: "ChromaDB", desc: "Vector Store" },
              { icon: "", name: "Gemma 3", desc: "LLM Local" },
            ].map((item) => (
              <div
                key={item.name}
                className="backdrop-blur-sm border-t border-white/20  rounded-2xl p-6 shadow-md text-white"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-light text-lg">{item.name}</div>
                <div className="text-sm text-white/70">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}