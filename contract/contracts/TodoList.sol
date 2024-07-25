// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract TodoList {
    uint public taskCount = 0;
    struct Task {
        uint id;
        string content;
        bool completed;
    }
    mapping(uint => Task) public tasks;

    constructor() {
        createTask("complete this DTodo app");
    }

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }

    function setCompleted(uint _id) public {
        require(tasks[_id].id == _id, "Task is not found");
        tasks[_id].completed = true;
    }

    function deleteTask(uint _id) public {
        require(tasks[_id].id == _id, "task is not found");
        taskCount--;
        delete tasks[_id];
    }


}