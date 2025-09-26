import 'dotenv/config' // carrega as variáveis de ambiente do arquivo .env para process.env
import { z } from 'zod' // biblioteca para validação de esquemas

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env) // valida as variáveis de ambiente e seus tipos/valores

if (_env.success == false) {
  console.error('❌ Invalid environment variables', _env.error.message)
  throw new Error('Invalid environment variables.')
}

export const env = _env.data // exporta as variáveis de ambiente validadas
