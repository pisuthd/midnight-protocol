// import { http, createConfig } from "wagmi";
import { somniaTestnet } from "wagmi/chains";
// import { injected, metaMask, walletConnect } from 'wagmi/connectors';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';


// export const config = createConfig({
//   chains: [somniaTestnet],
//   transports: {
//     [somniaTestnet.id]: http('https://dream-rpc.somnia.network'),
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
