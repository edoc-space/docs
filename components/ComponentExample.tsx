import React, { useContext, useState } from 'react';
import { MdxLayoutContext } from '@edoc/mdx';
import './component-example.css';

/** Public documentation example; each mounted instance owns its state. */
export function ComponentExample({ label = 'Count' }: { label?: string }) {
  const [count, setCount] = useState(0);
  const { locale } = useContext(MdxLayoutContext);

  return (
    <div className="component-example">
      <span>{locale?.code}</span>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        {label}: {count}
      </button>
    </div>
  );
}
