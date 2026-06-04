const CACHE_NAME = 'ks-app-cache-v3'; // Atualizado para v3 para forçar a limpeza da malha antiga

// 1. Matriz Completa de Assets: Adicionados os arquivos do Card2, Painel, Scripts auxiliares e Imagens estruturais
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  
  // Camada de Estilos (CSS)
  './style.css',
  './card1.css',
  './card2.css',
  './painel.css',
  
  // Camada de Identidade Visual (Imagens & Avatares)
  './icon-192.png',
  './icon-512.png',
  './fundo2.png',
  './efeito1.png',
  './efeito2.png',
  './kaue.png',
  './sky.png',
  './moldura1.png',
  './moldura2.png',
  './meme.gif',
  
  // Camada Lógica Modular (JavaScript)
  './manutencao.js',
  './fontes.js',
  './card1.js',
  './card2.js',
  './creditos.js',
  './estrelas.js',
  './efeito1.js',
  './botao.js',
  './botao2.js',
  './botaotexto.js',
  './pwa-style.js',
  './protecao.js',
  './clique-limpo.js',
  './atualizacao.js',
  './painel.js'
];

// 2. Instalação: Consolida e força o armazenamento da infraestrutura
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('K & S PWA: Malha de cache instalada com sucesso.');
      // O uso de ALL garante atomicidade: ou salva tudo com sucesso, ou falha de forma segura
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting()) // Autotransição rápida de ciclo de vida
  );
});

// 3. Ativação: Varredura de segurança contra lixo eletrônico e caches v1/v2 obsoletos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('K & S PWA: Purgando registros antigos de cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 4. Estratégia Stale-While-Revalidate Otimizada
self.addEventListener('fetch', (event) => {
  // Ignora requisições que não sejam do método GET (como submissões de dados ou APIs externas se houver)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      
      // Se localizou o asset em cache, despacha imediatamente (Instant Loading)
      if (cachedResponse) {
        // Busca atualização silenciosa em background para atualizar o cache para a próxima visita
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
        }).catch(() => { /* Proteção contra falha de conexão offline silenciosa */ });

        return cachedResponse;
      }

      // Se o asset não existia (ex: novas fotos adicionadas dinamicamente no painel), perfura a rede
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Armazena novos elementos encontrados para aprendizado contínuo do PWA
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));

        return networkResponse;
      });
    })
  );
});

// 5. Interceptador de Mensagens do Sistema (Hot Reload do PWA)
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    console.log('K & S PWA: Ignorando fila de espera. Reinicializando worker...');
    self.skipWaiting();
  }
});
