import { apiClient } from "./ApiClient";

export const registerApi =
    (registerFormDTO) => apiClient.post('/register', registerFormDTO)

export const retrieveFromMint =
    (webisteMint) => apiClient.get(`/data/${webisteMint}`)