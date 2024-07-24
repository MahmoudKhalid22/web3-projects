import { ethers } from "ethers";
import todoList from "./todoList.json";
import { useEffect, useState } from "react";

const todoListABI = todoList.abi;
const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const ethereum = typeof window.ethereum !== "undefined" && window?.ethereum;

const getTodoListContract = async () => {
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, todoListABI, signer);
};

const useTodo = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    const connect = async () => {
      try {
        if (!ethereum) {
          alert("Please install MetaMask");
          return;
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          alert("No Authorized Accounts");
          return;
        }
        const account = accounts[0];
        setCurrentAccount(account);
      } catch (err) {
        console.log(err);
      }
    };

    connect();

    // Listen for account changes
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        alert("No Authorized Accounts");
      } else {
        setCurrentAccount(accounts[0]);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    // Clean up the listener on component unmount
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return { currentAccount };
};

export default useTodo;
