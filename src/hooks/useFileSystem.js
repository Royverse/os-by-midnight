'use client';

import { useState, useCallback } from 'react';

const INITIAL_FS = {
  root: {
    id: 'root',
    name: 'Macintosh HD',
    type: 'folder',
    children: ['users', 'applications', 'system'],
  },
  users: {
    id: 'users',
    name: 'Users',
    type: 'folder',
    parentId: 'root',
    children: ['user'],
  },
  user: {
    id: 'user',
    name: 'User',
    type: 'folder',
    parentId: 'users',
    children: ['desktop', 'documents', 'downloads', 'pictures'],
  },
  desktop: {
    id: 'desktop',
    name: 'Desktop',
    type: 'folder',
    parentId: 'user',
    children: ['welcome_txt'],
  },
  documents: {
    id: 'documents',
    name: 'Documents',
    type: 'folder',
    parentId: 'user',
    children: ['project_plan_md', 'notes_txt'],
  },
  downloads: {
    id: 'downloads',
    name: 'Downloads',
    type: 'folder',
    parentId: 'user',
    children: [],
  },
  pictures: {
    id: 'pictures',
    name: 'Pictures',
    type: 'folder',
    parentId: 'user',
    children: ['wallpaper_jpg'],
  },
  applications: {
    id: 'applications',
    name: 'Applications',
    type: 'folder',
    parentId: 'root',
    children: [],
  },
  system: {
    id: 'system',
    name: 'System',
    type: 'folder',
    parentId: 'root',
    children: [],
  },
  // Files
  welcome_txt: {
    id: 'welcome_txt',
    name: 'Welcome.txt',
    type: 'file',
    content: 'Welcome to OS by Midnight! \n\nEnjoy the vibes.',
    parentId: 'desktop',
  },
  project_plan_md: {
    id: 'project_plan_md',
    name: 'Project_Plan.md',
    type: 'file',
    content: '# OS Plan\n1. Build Core\n2. Add Apps\n3. Polish',
    parentId: 'documents',
  },
  notes_txt: {
    id: 'notes_txt',
    name: 'notes.txt',
    type: 'file',
    content: 'Don\'t forget to drink water.',
    parentId: 'documents',
  },
  wallpaper_jpg: {
    id: 'wallpaper_jpg',
    name: 'wallpaper.jpg',
    type: 'image',
    src: '/placeholder.jpg', // We assume this exists or handle missing
    parentId: 'pictures',
  },
};

export function useFileSystem() {
  const [fs, setFs] = useState(INITIAL_FS);
  const [currentPath, setCurrentPath] = useState(['root', 'users', 'user']); // Start in Home

  const getCurrentFolder = useCallback(() => {
    const folderId = currentPath[currentPath.length - 1];
    const folder = fs[folderId];
    
    // Resolve children
    const children = folder.children.map(childId => fs[childId]);
    return { ...folder, children };
  }, [fs, currentPath]);

  const navigateTo = useCallback((folderId) => {
    if (!fs[folderId] || fs[folderId].type !== 'folder') return;
    
    // Check if moving up or down
    // Simple heuristic: if folderId is parent of current, pop. Else push.
    // Ideally we track full path.
    
    setFs(prev => { 
        // We need 'prev' to ensure consistency but here we just read so it is fine 
        // Actually, navigation logic depends on currentPath, not FS state mostly
        return prev;
    });

    setCurrentPath(prev => {
        const currentId = prev[prev.length - 1];
        if (fs[currentId].parentId === folderId) {
            // Moving up
            return prev.slice(0, -1);
        } else {
             // Moving down (or jumping, but we assume navigation by click)
             // If we support breadcrumbs we need smarter logic.
             // For now, let's just append if it's a child, or reset if it's a jump?
             // Let's implement robust "cd" logic later.
             // For simple Explorer:
             return [...prev, folderId];
        }
    });

  }, [fs]);
  
  const navigateUp = useCallback(() => {
      setCurrentPath(prev => {
          if (prev.length <= 1) return prev; // At root
          return prev.slice(0, -1);
      });
  }, []);

  const openFolder = useCallback((folderId) => {
      setCurrentPath(prev => [...prev, folderId]);
  }, []);

  return {
    currentPath,
    getCurrentFolder,
    navigateUp,
    openFolder,
    fileSystem: fs // Expose raw FS if needed
  };
}
