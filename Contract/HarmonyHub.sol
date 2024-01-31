// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SelfHelp {
    struct ShgDetails {
        address admin;
        string shgName;
        string shgDescription;
        uint256 timeOfCreation;
        uint256 balance;
        mapping(address => uint256) funderDetails;
        uint256 numberOfFunders;
        mapping(address => bool) funders;
        address[] members;
    }

    struct ProposalDetails {
        address proposer;
        string proposalName;
        string proposalDescription;
        uint256 amount;
        uint256 votesInFavour;
        uint256 votesAgainst;
        uint256 timeOfProposal;
        mapping(address => bool) votersInFavour;
        mapping(address => bool) votersAgainst;
    }

    mapping(address => uint256) public memberOfShg;
    mapping(uint256 => ShgDetails) public shgDetails;
    
    mapping(uint256 => uint256[]) public proposalIdInShg;
    mapping(uint256 => ProposalDetails) public proposalDetails;
    uint256 public shgId;
    uint256 public proposalId;
    uint256 public membershipProposal;

    function addShg(string memory _shgName, string memory _shgDescription) external {
        shgId++;
        
        shgDetails[shgId].admin = msg.sender;
        shgDetails[shgId].shgName=_shgName;
        shgDetails[shgId].shgDescription = _shgDescription;
        shgDetails[shgId].timeOfCreation=block.timestamp;
        shgDetails[shgId].balance = 0;
        shgDetails[shgId].numberOfFunders = 0;
        
    }

    function addFunds(uint256 _shgId) external payable {

        if (shgDetails[_shgId].funders[msg.sender]) {
            shgDetails[_shgId].funderDetails[msg.sender] += msg.value;
        } else {
            shgDetails[_shgId].funderDetails[msg.sender] = msg.value;
            shgDetails[_shgId].numberOfFunders++;
            shgDetails[_shgId].funders[msg.sender] = true;
            
        }
        
        shgDetails[_shgId].balance += msg.value;
    }

    function joinShg(uint256 _shgId) external{

      require(memberOfShg[msg.sender]==0);

        memberOfShg[msg.sender] = _shgId;
        shgDetails[_shgId].members.push(msg.sender);
    }

   

    function proposal(uint256 _shgId, string memory _proposalName, string memory _proposalDescription, uint256 _amount) external {
        require(shgDetails[_shgId].funders[msg.sender], "You are not a funder of this SHG");
        require(_amount <= shgDetails[_shgId].balance, "The requested funds exceed the current balance of the SHG");
        
        proposalId++;
        proposalIdInShg[_shgId].push(proposalId);
        proposalDetails[proposalId].proposer = msg.sender;
        proposalDetails[proposalId].proposalName = _proposalName;
        proposalDetails[proposalId].proposalDescription = _proposalDescription;
        proposalDetails[proposalId].amount = _amount;
        proposalDetails[proposalId].votesInFavour = 0;
        proposalDetails[proposalId].votesAgainst = 0;
        proposalDetails[proposalId].timeOfProposal = block.timestamp;

    }

    function votingInFavour(uint256 _tempId) external {
        require(msg.sender != proposalDetails[_tempId].proposer, "The proposer can't vote");
        require(!proposalDetails[_tempId].votersInFavour[msg.sender], "Each member can give only one vote");
        
        proposalDetails[_tempId].votersInFavour[msg.sender] = true;
        proposalDetails[_tempId].votesInFavour++;
    }

    function votingAgainst(uint256 _tempId) external {
        require(msg.sender != proposalDetails[_tempId].proposer, "The proposer can't vote");
        require(!proposalDetails[_tempId].votersAgainst[msg.sender], "Each member can give only one vote");
        
        proposalDetails[_tempId].votersAgainst[msg.sender] = true;
        proposalDetails[_tempId].votesAgainst++;
    }

    function claimFund(uint256 _shgId, uint256 _proposalId) external {
        require(msg.sender == proposalDetails[_proposalId].proposer, "Only the proposer can claim the amount");
        require(proposalDetails[_proposalId].amount <= shgDetails[_shgId].balance, "The asked funds are less than the current balance of the SHG");
        
        payable(msg.sender).transfer(proposalDetails[_proposalId].amount);
        shgDetails[_shgId].balance -= proposalDetails[_proposalId].amount;
        proposalDetails[_proposalId].amount = 0;
    }


    function getMemberOfShg() public view returns(uint256){
      return memberOfShg[msg.sender];
    }

    function getShgCount() external view returns (uint256) {
        return shgId;
    }

    function getMemberOfShg(address _memberAddress) external view returns (uint256) {
        return memberOfShg[_memberAddress];
    }

    function getProposalIdsInShg(uint256 _shgId) external view returns (uint256[] memory) {
        return proposalIdInShg[_shgId];
    }

    function getProposalCount() external view returns (uint256) {
        return proposalId;
    }

    function getShgAdmin(uint256 _shgId) external view returns (address) {
        return shgDetails[_shgId].admin;
    }

    // View function to get the name of a specific SHG
    function getShgName(uint256 _shgId) external view returns (string memory) {
        return shgDetails[_shgId].shgName;
    }

    // View function to get the description of a specific SHG
    function getShgDescription(uint256 _shgId) external view returns (string memory) {
        return shgDetails[_shgId].shgDescription;
    }

    // View function to get the creation time of a specific SHG
    function getShgCreationTime(uint256 _shgId) external view returns (uint256) {
        return shgDetails[_shgId].timeOfCreation;
    }

    // View function to get the balance of a specific SHG
    function getShgBalance(uint256 _shgId) external view returns (uint256) {
        return shgDetails[_shgId].balance;
    }

    // View function to get the number of funders for a specific SHG
    function getNumberOfFunders(uint256 _shgId) external view returns (uint256) {
        return shgDetails[_shgId].numberOfFunders;
    }

    // View function to check if an address is a funder for a specific SHG
    function isFunder(uint256 _shgId, address funder) external view returns (bool) {
        return shgDetails[_shgId].funders[funder];
    }
    
    // View function to get the funding details for a specific funder of a SHG
    function getFunderDetails(uint256 _shgId, address funder) external view returns (uint256) {
        return shgDetails[_shgId].funderDetails[funder];
    }

    function getMembers(uint256 _shgId) external view returns (address[] memory) {
        return shgDetails[_shgId].members;
    }
}