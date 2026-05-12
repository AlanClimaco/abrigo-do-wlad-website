import { kv as vercelKv } from "@vercel/kv";

const isLocalMock = !process.env.KV_REST_API_URL;

const mockStore = new Map<string, any>();

mockStore.set("hero-dog", {
  id: "mock-hero-123",
  nome: "David Bowie (Mock Dev)",
  descricao: "Cachorro diário do cache em memória",
});

const mockKv = {
  get: async <T>(key: string): Promise<T | null> => {
    console.log(`[KV MOCK] GET "${key}"`);
    return (mockStore.get(key) as T) || null;
  },
  set: async (key: string, value: any): Promise<any> => {
    console.log(`[KV MOCK] SET "${key}" =`, Object.keys(value || {}));
    mockStore.set(key, value);
    return "OK";
  },
} as typeof vercelKv;

export const kv = isLocalMock ? mockKv : vercelKv;
