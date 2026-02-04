import React, { useState } from 'react';
import { Box } from '@mui/material';
import HeaderShow from './components/HeaderShow';
import AvatarViewer from './components/Avatar';
import ScaleAvatar, { BodyPartName } from './components/scaleAvatar';

import PartesCuerpo, { Category, CATEGORIES } from './components/Partes_cuerpo';
import Productos from './components/Productos';

export default function Showroom() {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedPart, setSelectedPart] = useState<BodyPartName | null>(null);

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f7', overflow: 'hidden' }}>
            {/* Header */}
            <HeaderShow />

            {/* Main Content Area */}
            <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                {/* 1. Left Zone: Body Parts Selector + Mini Mannequin Widget */}
                <Box sx={{ display: 'flex', height: '100%', bgcolor: '#fff', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                    {/* List */}
                    <PartesCuerpo
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />

                    {/* Widget - Pure Selector */}
                    <Box sx={{ width: 90, p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(0,0,0,0.03)' }}>
                        <ScaleAvatar
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            categories={CATEGORIES}
                            onPartSelect={setSelectedPart} // Pass selection to state
                        />
                    </Box>
                </Box>

                {/* 2. Center Zone: Avatar (Camera Director) */}
                <Box sx={{ flex: 1, position: 'relative' }}>


                    {/* Avatar Viewer receives the focus target */}
                    <AvatarViewer focusedPart={selectedPart} />
                </Box>

                {/* 3. Right Zone: Products Grid */}
                <Productos selectedCategory={selectedCategory} />

            </Box>
        </Box>
    );
}
