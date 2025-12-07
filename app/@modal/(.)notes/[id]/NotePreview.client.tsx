"use client";

import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <Modal onClose={handleBack}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString("uk-UA")}
          </p>

          {note.tag && <p className={css.tag}>{note.tag}</p>}
        </div>

        <button className={css.backBtn} onClick={handleBack}>
          ← Back
        </button>
      </div>
    </Modal>
  );
}
