import './SearchNote.css';

interface SearchNoteProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchNote: React.FC<SearchNoteProps> = ({ query, setQuery }) => {
  return (
    <input
      className='notebook__search-input'
      value={query}
      placeholder='Поиск'
      onChange={e => setQuery(e.target.value.toLowerCase())}
    />
  );
}

export default SearchNote;
