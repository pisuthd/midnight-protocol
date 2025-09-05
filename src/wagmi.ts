// import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { http, createConfig } from "wagmi";
import { somniaTestnet } from "wagmi/chains";
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// export const config = createConfig({
//   chains: [somniaTestnet],
//   connectors: [farcasterFrame()],
//   transports: {
//     [somniaTestnet.id]: http()
//   },
// });

export const config = getDefaultConfig({
  appName: 'Midnight Protocol',
  projectId: "de3bc071691717927507e2c91cdb1572",
  chains: [somniaTestnet]
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
