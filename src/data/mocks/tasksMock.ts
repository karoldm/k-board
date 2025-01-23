import { TaskStatus } from "../enums/taskStatus";
import { Task } from "../interfaces/task";
import { userMock } from "./userMock";


export const tasksMock: Task[] = [
  {
    color: "#FCF456",
    id: "1",
    createdAt: new Date(),
    description: "Task description",
    tags: ["urgent"],
    taskStatus: TaskStatus.COMPLETED,
    title: "Task Title",
    members: [userMock,userMock],
  },
  {
    color: "#F456",
    id: "2",
    createdAt: new Date(),
    description: "Task description",
    tags: ["urgent"],
    taskStatus: TaskStatus.PENDING,
    title: "Task Title",
    members: [userMock,userMock],
  },
  {
    color: "#AA156C",
    id: "3",
    createdAt: new Date(),
    description: "Task description",
    tags: ["urgent"],
    taskStatus: TaskStatus.PENDING,
    title: "Task Title",
    members: [userMock,userMock],

  },
  {
    color: "#545646",
    id: "4",
    createdAt: new Date(),
    description: "Task description",
    tags: ["urgent"],
    taskStatus: TaskStatus.DOING,
    title: "Task Title",
    members: [userMock,userMock],

  },
];