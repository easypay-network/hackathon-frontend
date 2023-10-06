import {Keplr} from "@keplr-wallet/types";

export const getKeplrFromWindow: () => Promise<
  Keplr | undefined
> = async () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  // @ts-ignore
  if (window.keplr) {
    // @ts-ignore
    return window.keplr;
  }

  if (document.readyState === "complete") {
    // @ts-ignore
    return window.keplr;
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        // @ts-ignore
        resolve(window.keplr);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};
