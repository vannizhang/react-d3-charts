import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

(async () => {
    const root = createRoot(document.getElementById('root'));

    root.render(<h1>hello world</h1>);
})();
