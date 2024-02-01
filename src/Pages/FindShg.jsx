import React, { useContext, useEffect, useState } from "react";
import Button from "../Components/Button";
import { Signer, ethers } from "ethers";
import ReactModal from "react-modal";
import { MemberId } from "../Context/MemberId";


const CONTRACT_ADDRESS = "0x726709e109688A2b5368D0cB49D9334E642CAD7e";
const ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "addFunds",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_shgName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_shgDescription",
        type: "string",
      },
    ],
    name: "addShg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "claimFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "joinShg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_proposalName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_proposalDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "proposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tempId",
        type: "uint256",
      },
    ],
    name: "votingAgainst",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tempId",
        type: "uint256",
      },
    ],
    name: "votingInFavour",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "funder",
        type: "address",
      },
    ],
    name: "getFunderDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_memberAddress",
        type: "address",
      },
    ],
    name: "getMemberOfShg",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMemberOfShg",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "getMembers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "getNumberOfFunders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProposalCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "getProposalIdsInShg",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "getShgAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "getShgBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getShgCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "getShgCreationTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "getShgDescription",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
    ],
    name: "getShgName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shgId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "funder",
        type: "address",
      },
    ],
    name: "isFunder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "memberOfShg",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "membershipProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalDetails",
    outputs: [
      {
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        internalType: "string",
        name: "proposalName",
        type: "string",
      },
      {
        internalType: "string",
        name: "proposalDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votesInFavour",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votesAgainst",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timeOfProposal",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalIdInShg",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "shgDetails",
    outputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "string",
        name: "shgName",
        type: "string",
      },
      {
        internalType: "string",
        name: "shgDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timeOfCreation",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfFunders",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "shgId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

function FindShg() {
  const [modal, setModal] = useState(false);
  const [shgName, setShgName] = useState("");
  const [shgDesc, setShgDesc] = useState("");
  const [shgDetails, setShgDetails] = useState([])

  const memberOfShg = useContext(MemberId)

  const joinShg = async (id) => {
    try {
      let { ethereum } = window;
      if (ethereum) {
        let provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );
        // console.log(id)
        await connectedContract.joinShg(id);
		let idOfShg = await connectedContract.getMemberOfShg();
        // console.log(idOfShg)
		memberOfShg.setMemberId(idOfShg)
		
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function addOneShg(name, desc) {
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

        let completedAssigment = await connectedContract.addShg(name, desc);

        await completedAssigment.wait();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getShg = async () => {
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

        let resp = (await connectedContract.getShgCount());
		// console.log(resp)
	    
        if(resp.toNumber() >= 1){
			for(let i =1; i<=resp.toNumber(); i++){
				let name = (await connectedContract.getShgName(i))
				let description = (await connectedContract.getShgDescription(i))
				let timeStamp = (await connectedContract.getShgCreationTime(i)).toNumber()
				let memberCount = (await connectedContract.getMembers(i))
				let date = new Date(parseInt(timeStamp))
				console.log(date)
				let formatted = date.toLocaleString("en-us", {
					month: "short",
					year: "numeric"
				})
                console.log(formatted)
				setShgDetails(prev => [...prev, {name: name, desc: description, date: formatted, members: memberCount, shgId: i}])
			}
		}
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getShg();
  }, []);

  return (
    <div className="bg-[#f5f5f5] mx-5 rounded-3xl px-10 space-y-10 py-10 flex flex-col mb-10">
      {shgDetails.map((elem, index) => {
        return (
          <div
            className="flex items-center bg-[#232323] px-5 py-5 justify-around rounded-xl hover:scale-105 duration-300 ease-in-out"
            key={index}
          >
            <h1 className="text-white text-[40px] uppercase">{elem.name}</h1>
            <p className="text-white text-[20px]">{elem.desc}</p>
            <p className="text-white text-[20px]">Date - {elem.date}</p>
            <p className="text-white text-[20px]">Members - {elem.members.slice(0, 5)}</p>
            <button className="text-white" onClick={() => joinShg(elem.shgId)}>
              Join Now
            </button>
          </div>
        );
      })}
      <button
        onClick={() => setModal(true)}
        className="bg-[#232323] text-white self-center px-20 py-3 rounded-lg hover:bg-[white] hover:text-black duration-300 ease-in-out"
      >
        Add SHG
      </button>
      {/* <button
        onClick={getShg}
        className="bg-[#232323] text-white self-center px-20 py-3 rounded-lg hover:bg-[white] hover:text-black duration-300 ease-in-out"
      >
        Get SHG
      </button> */}

      <ReactModal
        isOpen={modal}
        contentLabel="Add SHG"
        onRequestClose={() => setModal(false)}
        className="bg-[#232323] py-20 mx-10 rounded-3xl relative top-[10%]"
      >
        <div className="flex flex-col text-white space-y-6 gap-y-4">
          <h1 className="text-center text-[35px]">Add your SHG</h1>
          <input
            type="text"
            className="rounded-lg px-5 py-3 w-[50%] self-center bg-[#232323] shadow-custom active:outline-none focus:outline-none"
            placeholder="SHG Name"
            onChange={(event) => setShgName(event.target.value)}
          />
          <input
            type="text"
            className="rounded-lg px-5 py-3 w-[50%] self-center bg-[#232323] shadow-custom active:outline-none focus:outline-none"
            placeholder="SHG Description"
            onChange={(event) => setShgDesc(event.target.value)}
          />
          <button
            className="bg-[#232323] shadow-custom self-center px-20 py-3 rounded-lg hover:bg-[white] hover:text-black duration-300 ease-in-out"
            onClick={() => addOneShg(shgName, shgDesc)}
          >
            Add
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default FindShg;
