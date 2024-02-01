import Footer from "./Components/Footer"
import Header from "./Components/Header"

import { Outlet } from "react-router-dom";
import { alchemyProvider } from "wagmi/providers/alchemy";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  //@ts-ignore
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai, sepolia, modeTestnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MemberId } from "./Context/MemberId";
import { useState } from "react";


const { chains, publicClient } = configureChains(
  [modeTestnet, sepolia, polygonMumbai, goerli, ],
  [
    alchemyProvider({ apiKey: "nGNX2rQ-BAd_erhkV5BCRFI_0FHnl1a3" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "HarmonyHub",
  projectId: "b20ec248fdbe746a0f8306abfacf7468",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});


function App() {
  
const [memberId, setMemberId] = useState(0)
  return (
    <div className="">
      <MemberId.Provider value={{memberId, setMemberId}}>
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#353535",
            accentColorForeground: "#FFF",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
     <Header />
     <Outlet />
     {/* <Home /> */}
     <Footer />
     </RainbowKitProvider>
     </WagmiConfig>
     </MemberId.Provider>
    </div>
  )
}

export default App
