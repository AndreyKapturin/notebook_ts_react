import './NoteListItem.css';

const NoteListItem = ({ note, index, currentNoteIndex, setCurrentNoteIndex, deleteNote }) => {
  
  function deleteNoteClick(e) {
    e.stopPropagation();
    if (index === currentNoteIndex) {
      setCurrentNoteIndex(null);
    }
    deleteNote(note.id);
  }

  return (
    <li
      className={currentNoteIndex === index ? 'notelist__item selected' : 'notelist__item'}
      key={note.id}
      onClick={() => setCurrentNoteIndex(index)}
    >
      <div className='item-block'>
        <span className='item-text'>{note.body.slice(0, 25) + '...'}</span>
        <button
          className='item-button'
          onClick={deleteNoteClick}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default NoteListItem;
