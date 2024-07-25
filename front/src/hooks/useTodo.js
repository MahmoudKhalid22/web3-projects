import { ethers } from "ethers";
import todoList from "./todoList.json";
import { useEffect, useState } from "react";

const todoListABI = todoList.abi;
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ethereum = typeof window.ethereum !== "undefined" && window?.ethereum;

const getTodoListContract = async () => {
  if (!ethereum) {
    throw new Error("MetaMask is not installed");
  }
  await ethereum.request({ method: "eth_requestAccounts" });

  // const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const provider = new ethers.BrowserProvider(ethereum);

  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, todoListABI, signer);
};

const useTodo = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [tasks, setTasks] = useState([]);

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

  const getTaskList = async () => {
    try {
      const contract = await getTodoListContract();
      const taskCount = await contract.taskCount();
      // console.log(Number(taskCount));
      const tasksData = [];
      for (let i = taskCount; i > 0; i--) {
        const task = await contract.tasks(i);
        // console.log(task);
        tasksData.push(task);
      }

      setTasks(tasksData);
    } catch (err) {
      console.log("Error Fetching Data ", err);
    }
  };

  const addTask = async (content) => {
    try {
      const contract = await getTodoListContract();
      const tx = await contract.createTask(content);
      await tx.wait();
      console.log("Task added successfully");

      await getTaskList();
    } catch (err) {
      console.log("Error adding task:", err);
    }
  };

  const setCompletedTask = async (id) => {
    try {
      const contract = await getTodoListContract();
      await contract.setCompleted(id);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTasks = async (id) => {
    try {
      const contract = await getTodoListContract();
      await contract.deleteTask(id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return { currentAccount, tasks, addTask, setCompletedTask, deleteTasks };
};

export default useTodo;
