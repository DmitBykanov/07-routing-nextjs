import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NotePageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id).catch(() => null);
  return <>{note ? <NotePreview note={note} /> : <div>Note not found</div>}</>;
}
