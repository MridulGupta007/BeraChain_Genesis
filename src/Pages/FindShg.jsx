import React, { useEffect, useState } from 'react'
import Button from '../Components/Button'
import { Signer, ethers } from "ethers";

let resp;


const arr = [{
  name: 'x',
  desc: 'sdhfd',
  members: '5',
  date: '20 January 2024'
}, {
  name: 'y',
  desc: 'sdjfh',
  members: '2',
  date: '10 January 2024'
}, {
  name: 'z',
  desc: 'dsfsjdf',
  members: '7',
  date: '17 January 2024'
}]

const CONTRACT_ADDRESS = "0x726709e109688A2b5368D0cB49D9334E642CAD7e"
const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "addFunds",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_shgName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_shgDescription",
				"type": "string"
			}
		],
		"name": "addShg",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "claimFund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "joinShg",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_proposalName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_proposalDescription",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "proposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tempId",
				"type": "uint256"
			}
		],
		"name": "votingAgainst",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tempId",
				"type": "uint256"
			}
		],
		"name": "votingInFavour",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "funder",
				"type": "address"
			}
		],
		"name": "getFunderDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_memberAddress",
				"type": "address"
			}
		],
		"name": "getMemberOfShg",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMemberOfShg",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "getMembers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "getNumberOfFunders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProposalCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "getProposalIdsInShg",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "getShgAdmin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "getShgBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getShgCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "getShgCreationTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "getShgDescription",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			}
		],
		"name": "getShgName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shgId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "funder",
				"type": "address"
			}
		],
		"name": "isFunder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "memberOfShg",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "membershipProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposalDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "proposer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "proposalName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "proposalDescription",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "votesInFavour",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "votesAgainst",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeOfProposal",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "proposalId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposalIdInShg",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "shgDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "admin",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "shgName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "shgDescription",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timeOfCreation",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numberOfFunders",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shgId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const getShg = async () => {
  try{
    const {ethereum} = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract( CONTRACT_ADDRESS, ABI, signer);


      resp = await connectedContract.getShgCount()
      console.log(resp.toNumber())
      // fetch1()
      // fetch2()
    }
  } catch(error){
    console.log(error)
  }
}

const joinShg = async () => {
  try{
    const {ethereum} = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract( CONTRACT_ADDRESS, ABI, signer);

      // let completedAssigment = await connectedContract.getShgCount();

      await connectedContract.joinShg()
      
    }
  } catch(error){
    console.log(error)
  }
}

async function addOneShg(){
  try {
    const { ethereum } = window;

    if (ethereum) {
        // const provider = new ethers.providers.Web3Provider(ethereum);
        // const provider =  new ethers.providers.Web3Provider(ethereum)
        const provider = new ethers.providers.Web3Provider(ethereum)
        
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ABI,
            signer
        );

      //   let completedAssigment = await connectedContract.functionName(
      //     numbericalValue,

      //     `${string}`
      // );

      // await completedAssigment.wait();

      let completedAssigment = await connectedContract.addShg(
        "Ankit",

        "Web3 developer"
    );

    await completedAssigment.wait();
    
    }
  }catch(err){
    console.log(err)
  }
}

// useEffect(() => {
//   setTimeout(() => {
//     getShg()
//   }, 2000);
// }, [response, setResponse])

function FindShg() {
  
  

  return (
    <div className='bg-[#f5f5f5] mx-5 rounded-3xl px-10 space-y-10 py-10 flex flex-col mb-10'>
        {arr.map(elem => {
            return(
                <div className='flex items-center bg-[#232323] px-5 py-5 justify-around rounded-xl hover:scale-105 duration-300 ease-in-out'>
                    <h1 className='text-white text-[40px] uppercase'>{elem.name}</h1>
                    <p className='text-white text-[20px]'>{elem.desc}</p>
                    <p className='text-white text-[20px]'>Date - {elem.date}</p>
                    <p className='text-white text-[20px]'>Members - {elem.members}</p>
                    <Button cl='text-white' onClick={joinShg}>Join Now</Button>
                </div>
            )
        })}
        <button onClick={addOneShg}>Add SHG</button>
        <button onClick={getShg}>Get SHG</button>
    </div>
  )
}

export default FindShg






