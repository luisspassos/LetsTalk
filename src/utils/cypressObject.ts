/**
 * A function that returns the received object for cypress stubs to work. **This object needs to be used in the file with priority and must be sent to the window object. See the example below 👇**
 *
 * @example
 * ```
 * import { signInWithPassword } from 'auth';
 *
 * const authMethods = cypressObject({ signInWithPassword })
 *
 * export function Component() {
 * 
 *  useEffect(() => {
      if (window.Cypress) {
        window.auth = authMethods;
      }
    }, []); // You could use the useCypress hook to handle this easily.

    function login() {
      authMethods.signInWithPassword(...) // use the authMethods instead of the import from auth to make tests work
    }

}
  ```
 */

export function cypressObject<T extends object>(obj: T) {
  return obj;
}
