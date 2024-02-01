import React, { useState } from "react";

const WalletComponent = () => {
	const [connectedWallet, setConnectedWallet] = useState(null);

	const connectWallet = async () => {
		try {
			if (window.ethereum) {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				setConnectedWallet(accounts[0]);
			} else {
				console.error("MetaMask not detected. Please install MetaMask.");
			}
		} catch (error) {
			console.error("Error connecting to wallet:", error.message);
		}
	};

	const disconnectWallet = () => {
		setConnectedWallet(null);

		console.log("Disconnected from wallet");
	};

	return (
		<div>
			{connectedWallet ? (
				<div className="flex gap-x-5 items-center">
					<p>Connected Wallet: {`${connectedWallet.slice(0,5)}...${connectedWallet.slice(connectedWallet.length - 5, connectedWallet.length)}`}</p>
					<button onClick={disconnectWallet} className="hover:bg-white hover:text-[#232323] shadow-custom px-4 py-3 rounded-xl duration-300 ease-in-out">Disconnect Wallet</button>
				</div>
			) : (
				<button onClick={connectWallet} className="hover:bg-white hover:text-[#232323] shadow-custom px-4 py-3 rounded-xl duration-300 ease-in-out">Connect Wallet</button>
			)}
		</div>
	);
};

export default WalletComponent;