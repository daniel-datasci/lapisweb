import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * False during the server render and hydration, true afterwards. Use it for values the static
 * HTML can't know (query strings, browser state) so the first client render matches the server.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
