import { MouseEvent } from 'react';
import { INote } from '../../types';
import './NoteListItem.css';

interface NoteListItemProps {
  note: INote;
  index: number;
  currentNoteIndex: number | null;
  setCurrentNoteIndex: React.Dispatch<React.SetStateAction<number | null>>
  deleteNote: (id: string) => void
}

const NoteListItem: React.FC<NoteListItemProps> = ({ note, index, currentNoteIndex, setCurrentNoteIndex, deleteNote }) => {
  
  function deleteNoteClick(e: MouseEvent<HTMLButtonElement>) {
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
