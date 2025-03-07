// api/snippets.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export interface SnippetInput {
  title: string;
  description: string;
  code: string;
  language: string;
  number: string;
  author?: string;
}

export interface Snippet extends SnippetInput {
  id: string;
  createdAt: string;
}

// Get a snippet by its number
export const getSnippetByNumber = async (number: string): Promise<Snippet> => {
  try {
    const response = await axios.get(`${API_URL}/snippets/number/${number}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching snippet by number:", error);
    throw error;
  }
};
// uploadSnippet function (missing from the file)
export const uploadSnippet = async (snippetData: SnippetInput): Promise<Snippet> => {
  try {
    const response = await axios.post(`${API_URL}/snippets/upload`, snippetData);
    return response.data;
  } catch (error) {
    console.error('Error uploading snippet:', error);
    throw error;
  }
};

// addSnippet function (missing from the file)
export const addSnippet = async (snippetData: SnippetInput): Promise<Snippet> => {
  try {
    const response = await axios.post(`${API_URL}/snippets/add`, snippetData);
    return response.data;
  } catch (error) {
    console.error('Error adding snippet:', error);
    throw error;
  }
};

// getRecentSnippets function (missing from the file)
export const getRecentSnippets = async (limit: number = 10): Promise<Snippet[]> => {
  try {
    const response = await axios.get(`${API_URL}/snippets/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent snippets:', error);
    throw error;
  }
};
// Get all snippets
export const getAllSnippets = async (): Promise<Snippet[]> => {
  try {
    const response = await axios.get(`${API_URL}/snippets`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all snippets:", error);
    throw error;
  }
};

// Create a new snippet
export const createSnippet = async (
  snippetData: SnippetInput
): Promise<Snippet> => {
  try {
    const response = await axios.post(`${API_URL}/snippets`, snippetData);
    return response.data;
  } catch (error) {
    console.error("Error creating snippet:", error);
    throw error;
  }
};

// Update an existing snippet
export const updateSnippet = async (
  id: string,
  snippetData: Partial<SnippetInput>
): Promise<Snippet> => {
  try {
    const response = await axios.put(`${API_URL}/snippets/${id}`, snippetData);
    return response.data;
  } catch (error) {
    console.error("Error updating snippet:", error);
    throw error;
  }
};

// Delete a snippet
export const deleteSnippet = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/snippets/${id}`);
  } catch (error) {
    console.error("Error deleting snippet:", error);
    throw error;
  }
};

// Search snippets by title or description
export const searchSnippets = async (query: string): Promise<Snippet[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/snippets/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching snippets:", error);
    throw error;
  }
};
