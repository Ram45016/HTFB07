async function main() {
  const DataLeasing = await ethers.getContractFactory("DataLeasing");
  const dataLeasing = await DataLeasing.deploy();
  await dataLeasing.deployed();
  console.log("DataLeasing deployed to:", dataLeasing.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
