import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("TodoList", function () {
  it("should return the todo type", async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    const [user1, user2] = await ethers.getSigners();
    const todoList = await TodoList.deploy();
    await todoList.target;

    expect(await todoList.taskCount()).to.equal(1);

    expect((await todoList.tasks(1)).content).to.equal(
      "complete this DTodo app"
    );
  });
});
