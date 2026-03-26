import json
import unicodedata
import random

print("Iniciando a construção do Banco de Dados VIP...")

# =======================================================
# 1. A LISTA DE PROTEÇÃO (OS 100 TERMOS)
# =======================================================
termos_oficiais = [
    "agencia de marketing digital", "agencia de marketing", "marketing online", "agencia marketing digital", 
    "empresa de marketing digital", "empresas de marketing", "marketing digital online", "empresa marketing digital", 
    "agencia de trafego pago", "marketing digital perto de mim", "desenvolvedor perto de mim", "marketing b2b", 
    "agencia marketing", "mkt digital", "gestao de trafego pago para negocios locais", 
    "estrategias de seo local e posicionamento", "consultoria em marketing digital e vendas", 
    "criacao de landing pages de alta conversao", "especialista em google ads e facebook ads", 
    "automacao de marketing e funil de vendas", "criar aplicativo tipo uber", 
    "desenvolvimento de app de mobilidade regional", "criar aplicativo de carona particular", 
    "aplicativo para servico de guincho e reboque", "sistema de passagens e bilhetagem para vans", 
    "software de gestao para frotas e motoristas", "plataforma de mobilidade urbana white label", 
    "app de transporte com pagamento via pix", "sistema de rastreamento e logistica de entregas", 
    "desenvolvimento de aplicativo para mototaxi", "criar sistema tipo 99 ou indriver", 
    "tecnologia para cooperativas de transporte", "criar aplicativo tipo ifood para restaurantes", 
    "sistema de delivery proprio sem taxas", "aplicativo de entregas para supermercados", 
    "plataforma de delivery com multiplas lojas", "app de delivery para farmacias e drogarias", 
    "sistema de pedidos para distribuidora de bebidas", "criacao de cardapio digital com qr code para bares", 
    "app de delivery e agendamento para petshops", "sistema de delivery para revenda de gas e agua", 
    "software para gestao de pizzarias e fast food", "painel administrativo para controle de motoboys", 
    "automacao de pedidos via whatsapp para restaurantes", "criacao de loja virtual profissional", 
    "desenvolvimento de e-commerce para atacado", "plataforma de supply chain e distribuidores globais", 
    "sistema de pdv e controle de estoque na nuvem", "catalogo digital com pedidos integrados", 
    "e-commerce moderno com integracao de frete", "sistema de gestao financeira para pequenas empresas", 
    "desenvolvimento de marketplace completo", "criacao de sistema erp sob medida", 
    "software de agendamento para barbearias e saloes", "sistema de marcacao de consultas para clinicas", 
    "plataforma para imobiliarias e corretores", "sistema de emissao de nota fiscal eletronica", 
    "integracao de meios de pagamento online", "desenvolvimento de aplicativos em flutter e react", 
    "criar player de musica e streaming de audio", "desenvolvimento de plataformas saas", 
    "contratar desenvolvedor full-stack freelancer", "criacao de sites institucionais modernos", 
    "software house especialista em aplicativos", "fabrica de software sob medida", 
    "migracao de sistemas legados para a nuvem", "desenvolvimento de apis e integracoes web", 
    "criacao de aplicativos ios e android", "consultoria em transformacao digital para empresas", 
    "manutencao e atualizacao de sistemas web", "terceirizacao de ti e desenvolvimento", 
    "criacao de portais de noticias e blogs", "como criar uma startup de tecnologia", 
    "quanto custa desenvolver um aplicativo", "ideias de softwares lucrativos para cidades pequenas", 
    "como ganhar dinheiro com apps de mobilidade", "qual o valor para criar um site de vendas", 
    "como montar um aplicativo de entregas", "vale a pena ter um app proprio de delivery", 
    "como escalar vendas na internet", "empresas que criam aplicativos no brasil", 
    "orcamento para desenvolvimento de software", "criacao de automacao de vendas para whatsapp", 
    "chatbot com inteligencia artificial para atendimento", "sistema de disparo de mensagens em massa", 
    "crm personalizado para equipe de vendas", "plataforma de cursos online ead", 
    "sistema de controle de ponto e rh", "aplicativo de fidelidade e cashback para lojas", 
    "desenvolvimento de intranet para empresas", "sistema de agendamento de quadras esportivas", 
    "aplicativo para gestao de academias e crossfit", "software para oficinas mecanicas e auto pecas", 
    "sistema de gestao para escolas e creches", "desenvolvimento de dashboards e bi", 
    "auditoria de seguranca em aplicacoes web", "hospedagem de sites e servidores cloud", 
    "otimizacao de velocidade de sites wordpress", "recuperacao de sites hackeados ou lentos", 
    "design de interfaces ui ux para aplicativos"
]

def gerar_slug(texto):
    texto = unicodedata.normalize('NFKD', texto).encode('ASCII', 'ignore').decode('utf-8')
    return texto.lower().replace(" ", "-").replace("'", "")

termos_finais = [{"termo": t, "slug": gerar_slug(t)} for t in termos_oficiais]

print(f"Salvando {len(termos_finais)} termos no arquivo termos.json...")
with open("termos.json", "w", encoding="utf-8") as f:
    json.dump(termos_finais, f, ensure_ascii=False, indent=2)

# =======================================================
# 2. LENDO O SEU ARQUIVO DE MUNICÍPIOS
# =======================================================
print("Lendo o seu arquivo municipios.json...")

try:
    with open("municipios.json", "r", encoding="utf-8") as f:
        dados_usuario = json.load(f)
except FileNotFoundError:
    print("❌ ERRO: O arquivo 'municipios.json' não foi encontrado na pasta.")
    exit()

# Dicionário para transformar o código UF do seu arquivo na Sigla do Estado
mapa_uf = {
    11: 'RO', 12: 'AC', 13: 'AM', 14: 'RR', 15: 'PA', 16: 'AP', 17: 'TO',
    21: 'MA', 22: 'PI', 23: 'CE', 24: 'RN', 25: 'PB', 26: 'PE', 27: 'AL', 28: 'SE', 29: 'BA',
    31: 'MG', 32: 'ES', 33: 'RJ', 35: 'SP',
    41: 'PR', 42: 'SC', 43: 'RS',
    50: 'MS', 51: 'MT', 52: 'GO', 53: 'DF'
}

cidades_finais = []

for cidade in dados_usuario:
    nome_cidade = cidade.get("nome", "")
    codigo_uf = cidade.get("codigo_uf", 0)
    ddd_real = cidade.get("ddd", "00")
    
    sigla_estado = mapa_uf.get(codigo_uf, "BR")
    populacao_simulada = random.randint(5000, 1500000)
    
    cidades_finais.append({
        "slug": gerar_slug(nome_cidade),
        "nome": nome_cidade,
        "estado": sigla_estado,
        "estado_nome": sigla_estado, # Mantendo a sigla por praticidade
        "ddd": str(ddd_real),
        "populacao": populacao_simulada
    })

print(f"\nSalvando {len(cidades_finais)} cidades formatadas no arquivo cidades.json...")
with open("cidades.json", "w", encoding="utf-8") as f:
    json.dump(cidades_finais, f, ensure_ascii=False, indent=2)

print("🚀 SUCESSO ABSOLUTO! O banco de dados foi gerado usando o seu arquivo premium.")