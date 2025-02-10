
//const apiInstance = kboardApi("/users");

// export const registerUser: (user: User) => Promise<User> = 
//   async (user: User) => {
//   try {
//     const response = await apiInstance.post("/", user);

//     return JSON.parse(response.data) as User;
//   } catch(error) {
//     throw new Error("Error registering user: " + error?.toString());
//   }
// }

// export const getUserData: () => Promise<User> = 
//   async () => {
//   try {
//     const response = await apiInstance.get("/");

//     return JSON.parse(response.data) as User;
//   } catch(error) {
//     throw new Error("Error getting user data: " + error?.toString());
//   }
// }