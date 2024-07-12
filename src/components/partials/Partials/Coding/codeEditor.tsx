import React, { useRef } from 'react'
import { useEffect } from 'react';
import * as monaco from 'monaco-editor';
import Editor from "@monaco-editor/react";
const CodeEditor = ({ CurrentQuestion, Allquestion }) => {
  const value = useRef("//Write a code here \n\n");
  const handleEditorChange = (data) => {
    value.current = data
  }
  useEffect(() => {
    const Participant_Question_coding_Contest = sessionStorage.getItem('Participant_Question_coding_Contest');
    if (Participant_Question_coding_Contest !== null && Participant_Question_coding_Contest !== undefined) {
      const Participant_Question_coding_Contest_Data = JSON.parse(Participant_Question_coding_Contest);
      Participant_Question_coding_Contest_Data.data.questionData[CurrentQuestion - 1].code = value.current
      Participant_Question_coding_Contest_Data.data.questionData[CurrentQuestion - 1].Attempt = true
      Participant_Question_coding_Contest_Data.data.questionData[CurrentQuestion - 1].MarkforReview = false
      sessionStorage.setItem('Participant_Question_coding_Contest', JSON.stringify(Participant_Question_coding_Contest_Data))
    }
    document?.addEventListener('paste', (event) => {
      event.preventDefault();
    })
    document.addEventListener('copy', (event) => {
      event.preventDefault();
    })
    monaco.languages.register({
      id: 'cpp',
      extensions: ['.cpp'],
    });

    monaco.languages.setLanguageConfiguration('cpp', {
      brackets: [['{', '}'], ['[', ']'], ['(', ')']],
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/'],
      },
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string', 'comment'] },
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });
  }, [value.current]);
  return (
    <>
      <div className='w-[100%] h-[100%] pt-[1px]  flex justify-center items-center'>
        <div className={`w-[100%] h-[100%]`}>
          <Editor
            width="100%"
            height="100%"
            theme="vs-dark"
            value={Object(Allquestion[CurrentQuestion - 1]).code}
            language="cpp"
            options={{
              selectOnLineNumbers: true,
              fontSize: 14,
              automaticLayout: true,
              quickSuggestions: {
                other: true,
                comments: true,
                strings: true,
              },
              wordWrap: "on",
              scrollBeyondLastLine: false,
            }}
            onChange={handleEditorChange}
          />
        </div>
      </div>

    </>
  );
};

export default CodeEditor;
