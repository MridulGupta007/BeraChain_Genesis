import Footer from "./Components/Footer"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import { Outlet } from "react-router-dom";
import { alchemyProvider } from "wagmi/providers/alchemy";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

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

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       <Route path='/' element={<Home />}/>
//       <Route path='find' element={<FindShg />}/>
//       <Route path='/manage' element={<ManageShg />}/>
//     </Route>
//   )
// )

function App() {
  

  return (
    <div className="">
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
    </div>
  )
}

export default App
