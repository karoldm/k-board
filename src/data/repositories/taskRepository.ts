
//const apiInstance = kboardApi("/tasks");

// export const createTask: (task: Task, projectId: string) => Promise<Task> = 
//   async (task: Task) => {
//   try {
//     const response = await apiInstance.post("/", task);

//     return JSON.parse(response.data) as Task;
//   } catch(error) {
//     throw new Error("Error creating task: " + error?.toString());
//   }
// }

// export const getTasksByProject: (projectId: string) => Promise<Task[]> = 
//   async () => {
//   try {
//     const response = await apiInstance.get("/");

//     return JSON.parse(response.data) as Task[];
//   } catch(error) {
//     throw new Error("Error getting tasks: " + error?.toString());
//   }
// }