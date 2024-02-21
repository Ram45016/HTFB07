async function main() {
    const LeaseContract = await ethers.getContractFactory("LeaseContract");
    const leaseContract = await LeaseContract.deploy();
    await leaseContract.deployed();
    console.log("DataLeasing deployed to:", leaseContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  