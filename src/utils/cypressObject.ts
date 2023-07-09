/**
 * A function that returns
 * Uma função que retorna o objeto recebido para que os stubs do cypress funcionem. **Esse objeto precisa ser usado no seu arquivo com prioridade e deve ser enviado para o objeto window.**
 *
 * @example
 * ```
 * import { signInWithPassword } from 'auth';
 *
 * const authMethods = cypressObject({ login })
 *
 * export function Component() {
 *   useEff
 * }
 */

export function cypressObject<T extends object>(obj: T) {
  return obj;
}
