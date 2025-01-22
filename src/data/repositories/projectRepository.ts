import { Project } from "../interfaces/project";

const apiInstance = kboardApi("/projects");

// export const createProject: (project: Project) => Promise<Project> = 
//   async (project: Project) => {
//   try {
//     const response = await apiInstance.post("/", project);

//     return JSON.parse(response.data) as Project;
//   } catch(error) {
//     throw new Error("Error creating project: " + error?.toString());
//   }
// }

// export const getProjects: () => Promise<Project[]> = 
//   async () => {
//   try {
//     const response = await apiInstance.get("/");

//     return JSON.parse(response.data) as Project[];
//   } catch(error) {
//     throw new Error("Error getting project: " + error?.toString());
//   }
// }