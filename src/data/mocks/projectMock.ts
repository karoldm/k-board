import { Project } from "../interfaces/project";
import { tasksMock } from "./tasksMock";
import { userMock } from "./userMock";

export const projectMock: Project = {
  createdAt: new Date(),
  id: "123",
  tasks: tasksMock,
  title: "K-board api",
  owner: userMock,
  members: [userMock],
  progress: 0.5,
}