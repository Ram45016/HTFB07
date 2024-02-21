async function main() {
    const NewLeaseContract = await ethers.getContractFactory("NewLeaseContract");
    const newLeaseContract = await NewLeaseContract.deploy();
    await newLeaseContract.deployed();
    console.log("NewLeaseContract deployed to:", newLeaseContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  