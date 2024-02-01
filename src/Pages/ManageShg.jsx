import React, { useContext, useEffect, useState } from "react";
import Button from "../Components/Button";
import { NavLink } from "react-router-dom";
import { Signer, ethers } from "ethers";
import { MemberId } from "../Context/MemberId";

const members = [{ name: "x" }, { name: "y" }, { name: "z" }];
const CONTRACT_ADDRESS = "0xa2de5dDABa3b6C7cce0A25D01E736785023bf0f7";
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
	}
];

const getMembers = async () => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );

      // let completedAssigment = await connectedContract.getShgCount();

      let resp = await connectedContract.getMemberofShg();
      console.log(resp);
    }
  } catch (error) {
    console.log(error);
  }
};

function ManageShg({ activity }) {

  const shgId = useContext(MemberId)
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  
  const [shgBalance, setShgBalance] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);

  async function getMyShgDetails() {
    try {
      let { ethereum } = window;
      if (ethereum) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        let signer = provider.getSigner();
        let connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );

        //     let resp = (await connectedContract.getShgCount()).toNumber();
        // console.log(resp)
        console.log(shgId.memberId)

        let name = await connectedContract.getShgName(shgId.memberId);
        let description = await connectedContract.getShgDescription(shgId.memberId);
        let date = (await connectedContract.getShgCreationTime(shgId.memberId));
        let funds = await connectedContract.getShgBalance(shgId.memberId);
        let newDate = new Date(date*1000)
				// console.log(funds.toNumber())
				let formatted = newDate.toLocaleString("en-us", {
          day: "numeric",
					month: "short",
					year: "numeric"
				})
        // let memberCount = (await connectedContract.getMemberOfShg(i))
        setName(name)
        setDesc(description)
        setTimeStamp(formatted)
        setShgBalance(funds.toNumber())
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyShgDetails()
  }, [])

  return (
    <div className="bg-[#232323] mx-5 rounded-3xl">
      <h1 className="text-white text-center text-[25px]">{name}</h1>
      <h1 className="text-[#fff]/30 text-center text-[20px]">{desc}</h1>
      <div className="flex justify-evenly border-t border-[50%] mx-5 py-5 my-2">
        <div className="flex flex-col gap-y-5 space-y-5">
          <h1 className="text-white text-[20px]">Details</h1>
          <button
            className="text-white shadow-custom py-3 px-5 rounded-xl hover:bg-white hover:text-[#232323] duration-300 ease-in-out relative right-[10px]"
          
          >
            Request Amt
          </button>
          <div>
            <h1 className="text-[20px] text-white">SHG Balance</h1>
            <p className="text-[15px] text-[#f5f5f5]">{shgBalance} BERA</p>
          </div>
          <div>
            <h1 className="text-[20px] text-white">Date Created</h1>
            <p className="text-[15px] text-[#f5f5f5]">{timeStamp}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-[20px]">Activity</h1>

          {activity ? (
            <div>Show Activity</div>
          ) : (
            <p className="text-[#f5f5f5] text-[15px] relative top-32">
              No Recent Activity
            </p>
          )}
        </div>
        <div>
          <h1 className="text-white text-[20px] mb-4">Members</h1>
          <div className="flex flex-col gap-y-5">
            {members.map((elem, index) => {
              return (
                <div
                  key={index}
                  className="text-white text-[20px] text-center rounded-lg px-4 py-2 shadow-custom hover:scale-105 ease-in-out duration-300"
                >
                  {elem.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageShg;

const ShgFound = ({ name, desc, funds, shgBalance, date, activity }) => {
  return (
    <div className="bg-[#232323] mx-5 rounded-3xl">
      <h1 className="text-white text-center text-[25px]">{name} My SHG</h1>
      <h1 className="text-[#fff]/30 text-center text-[20px]">
        {desc} I love It
      </h1>
      <div className="flex justify-evenly border-t border-[50%] mx-5 py-5 my-2">
        <div className="flex flex-col gap-y-5 space-y-5">
          <h1 className="text-white text-[20px]">Functions</h1>
          <Button cl="text-white">Request Amt</Button>
          <div>
            <h1 className="text-[20px] text-white">My Funds</h1>
            <p className="text-[15px] text-[#f5f5f5]">1 BERA</p>
          </div>
          <div>
            <h1 className="text-[20px] text-white">SHG Balance</h1>
            <p className="text-[15px] text-[#f5f5f5]">5 BERA</p>
          </div>
          <div>
            <h1 className="text-[20px] text-white">Date Created</h1>
            <p className="text-[15px] text-[#f5f5f5]">24 January 2024</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-[20px]">Activity</h1>

          {activity ? (
            <div>Show Activity</div>
          ) : (
            <p className="text-[#f5f5f5] text-[15px] relative top-32">
              No Recent Activity
            </p>
          )}
        </div>
        <div>
          <h1 className="text-white text-[20px]">Members</h1>
          <div>
            {members.map((elem) => {
              return <div>{elem.address}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const NoShgFound = () => {
  return (
    <div>
      <span>No SHG Found</span>
      <NavLink to="find">
        <Button>Find One ?</Button>
      </NavLink>
    </div>
  );
};
