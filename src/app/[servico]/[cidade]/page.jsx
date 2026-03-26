import React from 'react';
import cidades from '../../../../cidades.json';
import termos from '../../../../termos.json';

export default async function PaginaDinamicaSeo({ params }) {
  const parametros = await params;
  const servicoSlug = parametros.servico;
  const cidadeSlug = parametros.cidade;

  const servicoValidado = termos.find(t => t.slug === servicoSlug);
  const cidadeValidada = cidades.find(c => c.slug === cidadeSlug);

  if (!servicoValidado || !cidadeValidada) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white font-sans">
        <h1 className="text-2xl font-bold text-slate-300">Erro 404: Página não encontrada.</h1>
      </div>
    );
  }

  const servicoFormatado = servicoValidado.termo
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  let introTexto = "";
  let desenvolvimentoTexto = "";

  if (cidadeValidada.populacao < 100000) {
    introTexto = `Para empreendedores em ${cidadeValidada.nome}, a digitalização deixou de ser um luxo para se tornar uma necessidade de sobrevivência. Atuando em um mercado com cerca de ${cidadeValidada.populacao.toLocaleString('pt-BR')} habitantes, empresas que investem em ${servicoValidado.termo} conseguem monopolizar a atenção do público local em ${cidadeValidada.estado_nome}, eliminando a concorrência que ainda opera no papel ou apenas pelo WhatsApp.`;
    desenvolvimentoTexto = `A AC Agência Digital entende a dinâmica econômica da região de ${cidadeValidada.nome}. Nossa engenharia de software permite que você tenha soluções de alto nível, semelhantes aos nossos cases de sucesso como o MarApp delivery ou ecossistemas de mobilidade inspirados no MaraTaxi. Tudo isso sem pagar comissões absurdas para plataformas terceirizadas. O código é focado em conversão e retenção de clientes na sua cidade.`;
  } else {
    introTexto = `A alta densidade e a concorrência feroz em ${cidadeValidada.nome} exigem uma infraestrutura tecnológica impecável. Com uma população de mais de ${cidadeValidada.populacao.toLocaleString('pt-BR')} pessoas, o investimento estratégico em ${servicoValidado.termo} é o diferencial entre um negócio que escala em ${cidadeValidada.estado_nome} e um que estagna. O consumidor moderno na região exige velocidade, segurança e uma interface premium.`;
    desenvolvimentoTexto = `Na AC Agência Digital, desenvolvemos arquiteturas preparadas para milhares de requisições simultâneas. Sistemas robustos e escaláveis (como os ecossistemas do MaraTaxi e MarApp) são a nossa especialidade. Entregamos a você o controle absoluto da sua operação em ${cidadeValidada.nome}: sem taxas abusivas de marketplaces, com integrações avançadas de pagamento via Pix e painéis de gestão que colocam o poder de decisão de volta nas suas mãos.`;
  }

  return (
    <div className="bg-[#020617] text-[#e5e7eb] font-sans min-h-screen selection:bg-[#00c2ff] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `html { scroll-behavior: smooth; }`}} />

      {/* HEADER */}
      <header className="sticky top-0 backdrop-blur-md bg-[#020617]/80 flex justify-between items-center py-4 px-6 md:px-12 border-b border-white/5 z-50">
        <img 
          src="https://portifolio.abraaocosta.com.br/wp-content/uploads/2024/03/abraao-costa-logo-ac-agencia-digital.webp" 
          alt="AC Agência Digital - Abraão Araújo" 
          className="h-10 md:h-12 object-contain"
        />
        <nav className="hidden md:flex space-x-6 text-[#cbd5f5] font-medium text-sm">
          <a href="https://portifolio.abraaocosta.com.br/sobre-nos/" target="_blank" className="hover:text-white transition-colors">Sobre nós</a>
          <a href="https://portifolio.abraaocosta.com.br/blog/" target="_blank" className="hover:text-white transition-colors">Blog</a>
          <a href="https://portifolio.abraaocosta.com.br/contato/" target="_blank" className="hover:text-white transition-colors">Contato</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="topo" className="pt-20 pb-20 px-6 text-center bg-[radial-gradient(circle_at_top,#1e3a8a,#020617)]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight max-w-5xl mx-auto text-white">
          {servicoFormatado} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] to-[#00c2ff]">em {cidadeValidada.nome}</span>
        </h1>
        <p className="max-w-3xl mx-auto text-[#cbd5f5] text-lg md:text-xl leading-relaxed mb-10">
          Escale o seu faturamento em {cidadeValidada.estado_nome} com tecnologia de ponta e sistemas livres de taxas abusivas.
        </p>
        <a 
          href={`https://wa.me/5598983233310?text=Olá Abraão, tenho interesse no serviço de ${servicoFormatado} em ${cidadeValidada.nome} - ${cidadeValidada.estado}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-gradient-to-r from-[#0066ff] to-[#00c2ff] rounded-full font-bold text-white shadow-lg shadow-[#0066ff]/20 hover:scale-105 hover:shadow-[#00c2ff]/40 transition-all duration-300"
        >
          Falar no WhatsApp
        </a>
      </section>

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        
        {/* CONTEÚDO PRINCIPAL (ARTIGO) */}
        <article className="bg-[#0f172a] p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl">
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl mb-10 border border-white/10">
            <iframe 
              width="100%" height="100%" 
              src="https://www.youtube.com/embed/FXJKoYoRdds" 
              title={`Apresentação ${servicoFormatado}`}
              frameBorder="0" allowFullScreen
            ></iframe>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">A Evolução em {cidadeValidada.nome}</h2>
          <p className="text-lg leading-relaxed text-[#94a3b8] mb-8">{introTexto}</p>

          <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#00c2ff] pl-4">A Estratégia Tecnológica</h2>
          <p className="text-lg leading-relaxed text-[#94a3b8] mb-8">{desenvolvimentoTexto}</p>

          <h2 className="text-2xl font-bold text-white mb-4">Alta Performance e SEO Local para {cidadeValidada.estado}</h2>
          <p className="text-lg leading-relaxed text-[#94a3b8] mb-8">
            Nós aplicamos engenharia de SEO diretamente no código-fonte para que a sua empresa domine as pesquisas do Google na região de {cidadeValidada.nome}. Através de estratégias de carregamento ultrarrápido, garantimos a melhor experiência para o seu usuário.
          </p>
        </article>

        {/* ASIDE (BARRA LATERAL) */}
        <aside className="space-y-8">
          <div className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 shadow-xl sticky top-28">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#00c2ff] rounded-full inline-block"></span>
              Fale com o Desenvolvedor
            </h3>
            <div className="mb-6">
              <p className="text-lg font-bold text-white">Abraão Araújo</p>
              <p className="text-[#94a3b8] text-sm">CEO da AC Agência Digital.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-xs text-[#94a3b8] uppercase tracking-wider font-bold mb-1">WhatsApp (DDD {cidadeValidada.ddd})</p>
                  <a href="https://wa.me/5598983233310" target="_blank" className="text-[#00c2ff] hover:text-white font-bold text-lg transition-colors">
                    (98) 98323-3310
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-4 border-t border-white/10">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="text-xs text-[#94a3b8] uppercase tracking-wider font-bold mb-1">E-mail Comercial</p>
                  <a href="mailto:contato@abraaocosta.com.br" className="text-[#cbd5f5] hover:text-[#00c2ff] text-sm transition-colors">
                    contato@abraaocosta.com.br
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </main>

      {/* SEÇÃO GOOGLE MEU NEGÓCIO (PROVA SOCIAL) */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start gap-1 text-yellow-400 text-3xl mb-4">
              ★★★★★
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Aprovado por nossos clientes</h3>
            <p className="text-[#94a3b8] max-w-lg">
              Veja o que os empreendedores que transformaram seus negócios com a AC Agência Digital estão dizendo sobre nossos sistemas e resultados.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a 
              href="https://share.google/ZyFWQZKYi3gcbRsg6" 
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-lg shadow-lg hover:scale-105 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              Ver Avaliações no Google
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER MEGA COMPLETO */}
      <footer className="bg-[#020617] pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Marca */}
          <div>
            <img 
              src="https://portifolio.abraaocosta.com.br/wp-content/uploads/2024/03/abraao-costa-logo-ac-agencia-digital.webp" 
              alt="AC Agência Digital" 
              className="h-12 mb-6 object-contain"
            />
            <p className="text-[#64748b] text-sm leading-relaxed mb-6">
              Transformando ideias em sistemas de alta performance. Desenvolvemos aplicativos, sites e estratégias digitais que escalam resultados e dominam o mercado.
            </p>
            {/* Redes Sociais */}
            <div className="flex gap-4">
              <a href="https://www.instagram.com/abraaocostaof/" target="_blank" className="text-[#94a3b8] hover:text-[#00c2ff] transition-colors">
                IG
              </a>
              <a href="https://www.youtube.com/@abraaocostaoficial/videos" target="_blank" className="text-[#94a3b8] hover:text-[#00c2ff] transition-colors">
                YT
              </a>
              <a href="https://www.linkedin.com/in/abra%C3%A3o-ara%C3%BAjo-rei-dos-aplicativos-06b858a8/" target="_blank" className="text-[#94a3b8] hover:text-[#00c2ff] transition-colors">
                IN
              </a>
              <a href="https://www.facebook.com/abraao.araujo.9400" target="_blank" className="text-[#94a3b8] hover:text-[#00c2ff] transition-colors">
                FB
              </a>
              <a href="https://x.com/abraaocostaof" target="_blank" className="text-[#94a3b8] hover:text-[#00c2ff] transition-colors">
                X
              </a>
            </div>
          </div>

          {/* Coluna 2: Institucional */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Institucional</h4>
            <ul className="space-y-3 text-[#94a3b8] text-sm">
              <li><a href="https://portifolio.abraaocosta.com.br/sobre-nos/" target="_blank" className="hover:text-[#00c2ff] transition-colors">Sobre Nós</a></li>
              <li><a href="https://portifolio.abraaocosta.com.br/blog/" target="_blank" className="hover:text-[#00c2ff] transition-colors">Nosso Blog</a></li>
              <li><a href="https://portifolio.abraaocosta.com.br/categorias/" target="_blank" className="hover:text-[#00c2ff] transition-colors">Categorias</a></li>
              <li><a href="https://portifolio.abraaocosta.com.br/glossario/" target="_blank" className="hover:text-[#00c2ff] transition-colors">Glossário Tech</a></li>
              <li><a href="https://portifolio.abraaocosta.com.br/fws-story/" target="_blank" className="hover:text-[#00c2ff] transition-colors">WebStories</a></li>
              <li><a href="https://portifolio.abraaocosta.com.br/contato/" target="_blank" className="hover:text-[#00c2ff] transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Coluna 3: Nossas Soluções */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Nossas Soluções</h4>
            <ul className="space-y-3 text-[#94a3b8] text-sm">
              <li><a href="https://portifolio.abraaocosta.com.br/category/criacao-de-aplicativos/" target="_blank" className="hover:text-[#00c2ff] transition-colors">Criação de Aplicativos</a></li>
              <li><a href="https://portifolio.abraaocosta.com.br/category/criacao-de-sites/" target="_blank" className="hover:text-[#00c2ff] transition-colors">Criação de Sites e Sistemas</a></li>
              <li><a href="https://portifolio.abraaocosta.com.br/category/marketing-digital-trafego-pago/" target="_blank" className="hover:text-[#00c2ff] transition-colors">Marketing e Tráfego Pago</a></li>
              <li><a href="https://portifolio.abraaocosta.com.br/category/redes-sociais-branding-digital/" target="_blank" className="hover:text-[#00c2ff] transition-colors">Redes Sociais & Branding</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato Direto */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Atendimento</h4>
            <ul className="space-y-4 text-[#94a3b8] text-sm">
              <li>
                <span className="block text-xs text-[#64748b] uppercase font-bold mb-1">WhatsApp</span>
                <a href="https://wa.me/5598983233310" target="_blank" className="text-white hover:text-[#00c2ff] transition-colors">+55 (98) 98323-3310</a>
              </li>
              <li>
                <span className="block text-xs text-[#64748b] uppercase font-bold mb-1">E-mail</span>
                <a href="mailto:contato@abraaocosta.com.br" className="text-white hover:text-[#00c2ff] transition-colors">contato@abraaocosta.com.br</a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Linha Legal e Direitos */}
        <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#64748b]">
          <p>© 2026 AC Agência Digital - Abraão Araújo. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="https://portifolio.abraaocosta.com.br/politica-de-privacidade/" target="_blank" className="hover:text-white transition-colors">Privacidade</a>
            <a href="https://portifolio.abraaocosta.com.br/termos-de-uso/" target="_blank" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="https://portifolio.abraaocosta.com.br/politica-de-cookies/" target="_blank" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

      {/* BOTÕES FLUTUANTES MANTIDOS */}
      <a 
        href="#topo" 
        className="fixed bottom-[90px] right-6 bg-[#0f172a] hover:bg-[#1e293b] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg border border-white/10 transition-colors z-50"
      >
        ↑
      </a>

      <a 
        href="https://wa.me/5598983233310" 
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25d366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-all z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>

    </div>
  );
}