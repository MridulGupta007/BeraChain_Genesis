import React from "react";
import Button from "../Components/Button";
import { NavLink } from "react-router-dom";

const members = [{ name: "x" }, { name: "y" }, { name: "z" }];


const getMembers = async () => {
  try{
    const {ethereum} = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract( CONTRACT_ADDRESS, ABI, signer);

      // let completedAssigment = await connectedContract.getShgCount();

      let resp = await connectedContract.getMemberofShg()
      console.log(resp)
    }
  } catch(error){
    console.log(error)
  }
}

function ManageShg({ name, desc, funds, shgBalance, date, activity }) {
  return (
    <div className="bg-[#232323] mx-5 rounded-3xl">
      <h1 className="text-white text-center text-[25px]">{name} My SHG</h1>
      <h1 className="text-[#fff]/30 text-center text-[20px]">{desc} I love It</h1>
      <div className="flex justify-evenly border-t border-[50%] mx-5 py-5 my-2">
        <div className="flex flex-col gap-y-5 space-y-5">
          <h1 className="text-white text-[20px]">Functions</h1>
          <Button cl='text-white'>Request Amt</Button>
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
          
          {activity ? <div >Show Activity</div> : <p className="text-[#f5f5f5] text-[15px] relative top-32">No Recent Activity</p>}
          
        </div>
        <div>
          <h1 className="text-white text-[20px] mb-4">Members</h1>
          <div className="flex flex-col gap-y-5">
            {members.map((elem , index) => {
              return <div key={index} className="text-white text-[20px] text-center rounded-lg px-4 py-2 shadow-custom hover:scale-105 ease-in-out duration-300">{elem.name}</div>;
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
      <h1 className="text-[#fff]/30 text-center text-[20px]">{desc} I love It</h1>
      <div className="flex justify-evenly border-t border-[50%] mx-5 py-5 my-2">
        <div className="flex flex-col gap-y-5 space-y-5">
          <h1 className="text-white text-[20px]">Functions</h1>
          <Button cl='text-white'>Request Amt</Button>
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
          
          {activity ? <div >Show Activity</div> : <p className="text-[#f5f5f5] text-[15px] relative top-32">No Recent Activity</p>}
          
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

}

const NoShgFound = () => {
  return(
    <div>
      <span>No SHG Found</span>
      <NavLink to='find'>
      <Button>
        Find One ?
      </Button>
      </NavLink>
    </div>
  )
}
