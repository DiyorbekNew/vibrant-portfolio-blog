
import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 pl-10 rounded-lg border border-input bg-background"
      />
      <Search 
        size={18} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
      />
    </form>
  );
};

export default SearchBar;
