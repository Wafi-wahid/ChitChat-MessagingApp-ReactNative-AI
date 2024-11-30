//screens/SearchFilterScreen.js
import React, { useState, useRef } from "react";
import { View, TextInput, FlatList, Text } from "react-native";
import axios from "axios";
import debounce from "lodash.debounce";
import globalStyles from "../../styles/globalStyles";
import Loader from "../components/Loader";
import NoResults from "../components/NoResults";
import { handleError } from "../utils/errorHandler";

const SearchFilterScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const cache = useRef({});

  const fetchAISuggestions = async (text) => {
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    if (cache.current[text]) {
      setSuggestions(cache.current[text]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Provide search suggestions for: ${text}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            "Content-Type": "application/json",
          },
        }
      );

      const suggestions = response.data.choices[0].message.content.split("\n");
      cache.current[text] = suggestions;
      setSuggestions(suggestions);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchAISuggestions = debounce(fetchAISuggestions, 500);

  const handleSearchChange = (text) => {
    setSearchText(text);
    debouncedFetchAISuggestions(text);
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Search items..."
        value={searchText}
        onChangeText={handleSearchChange}
      />
      {loading && <Loader />}
      {!loading && suggestions.length === 0 && <NoResults />}
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={globalStyles.suggestion}>{item}</Text>
        )}
      />
    </View>
  );
};

export default SearchFilterScreen;
