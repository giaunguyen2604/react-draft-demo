import type { NextPage } from 'next'
import { EditorState, convertToRaw } from 'draft-js';
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
import vercel from '../public/vercel.svg'
import draftToHtml from 'draftjs-to-html';
const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

const Home: NextPage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
  };

  const showData = () => {
    const current = convertToRaw(editorState.getCurrentContent())
    const markup = draftToHtml(current)
    alert(markup)
  }

  return (
    <div className={styles.container}>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbarClassName="toolbar-class"
        onEditorStateChange={onEditorStateChange}
        toolbar={
          {
            options: ['inline', 'list', 'blockType', 'textAlign', 'link'],
            inline: {
              options: ['bold', 'italic'],
            },
            list: {
              options: ['unordered', 'ordered']
            },
            blockType: {
              className: "quote",
              icon: vercel,
              inDropdown: false,
              options: ["Blockquote"],
              Blockquote: { className: "quote-1" },
            },
            textAlign: {
              options: ['left', 'center', 'right']
            }
          }
        }
      />
      <button onClick={showData}>Submit</button>
    </div>
  )
}

export default Home
