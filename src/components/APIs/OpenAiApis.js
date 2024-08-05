// we are using Gemini AI but keeping openai code for later use if needed

import axios from "axios";
import { OPEN_AI_API_KEY, OPEN_AI_BASE_URL } from "../../constants";

const openAiService = axios.create({
    baseURL: OPEN_AI_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      },
})

export const getMovieSuggestions = async (query) => {
    try {
      const response = await openAiService.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that suggests movies.',
          },
          {
            role: 'user',
            content: query,
          },
        ],
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching movie suggestions:', error);
      throw error;
    }
};