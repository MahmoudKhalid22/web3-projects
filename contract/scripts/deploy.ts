import hre, { ethers } from "hardhat";

async function main() {
  const TodoList = await ethers.getContractFactory("TodoList");

  const todoList = await TodoList.deploy();
  await todoList.target;
  console.log(
    "the smart contract has been deployed to ",
    await todoList.getAddress()
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
