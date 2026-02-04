import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Slider,
    Grid,
    Fade,
} from '@mui/material';
import {
    OptionCard,
    eyeColors,
    skinTones,
    hairStyles,
    hairColors,
    highlightColors,
    shoulderTypes,
    faceShapes,
    noseTypes,
    subtones
} from './opciones';

export type AvatarSection = 'CUERPO' | 'ROSTRO' | 'PIEL' | 'PELO';

interface CategoriasProps {
    section: AvatarSection;
}

const SectionContainer = ({ children }: { children: React.ReactNode }) => (
    <Box
        sx={{
            bgcolor: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            p: 4,
            border: '1px solid rgba(0,0,0,0.03)',
            height: '100%',
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(0,0,0,0.1)', borderRadius: '10px' }
        }}
    >
        {children}
    </Box>
);

const ControlLabel = ({ children, value, unit }: { children: string, value?: number, unit?: string }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em' }}>
            {children}
        </Typography>
        {value !== undefined && (
            <Typography variant="caption" sx={{ color: 'black', fontWeight: 800, fontSize: '0.7rem', bgcolor: 'rgba(0,0,0,0.05)', px: 1.2, py: 0.3, borderRadius: '6px' }}>
                {value}{unit || '%'}
            </Typography>
        )}
    </Box>
);

const CustomSlider = ({ label, min = 0, max = 100, unit = '%', defaultValue = 50 }: { label: string, min?: number, max?: number, unit?: string, defaultValue?: number }) => {
    const [val, setVal] = useState(defaultValue);
    return (
        <Box sx={{ mb: 3.5 }}>
            <ControlLabel value={val} unit={unit}>{label}</ControlLabel>
            <Slider
                size="small"
                value={val}
                min={min}
                max={max}
                onChange={(_, newValue) => setVal(newValue as number)}
                sx={{
                    color: 'black',
                    height: 3,
                    '& .MuiSlider-thumb': {
                        width: 14,
                        height: 14,
                        bgcolor: 'black',
                        '&:hover': { boxShadow: '0 0 0 8px rgba(0,0,0,0.04)' },
                    },
                    '& .MuiSlider-rail': { bgcolor: 'rgba(0,0,0,0.08)', opacity: 1 },
                }}
            />
        </Box>
    );
};

const GroupTitle = ({ children }: { children: string }) => (
    <Typography variant="h6" sx={{ color: 'black', fontWeight: 300, mb: 3, fontSize: '0.9rem', borderLeft: '3px solid black', pl: 2, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {children}
    </Typography>
);

const Categorias: React.FC<CategoriasProps> = ({ section }) => {
    const [selections, setSelections] = useState<Record<string, string>>({});

    const handleSelect = (key: string, val: string) => {
        setSelections(prev => ({ ...prev, [key]: val }));
    };

    const renderBody = () => (
        <Stack spacing={4}>
            <Box>
                <GroupTitle>Proporciones Base</GroupTitle>
                <CustomSlider label="Altura General" min={100} max={200} unit="cm" defaultValue={170} />
                <CustomSlider label="Tamaño del Cuello" min={20} max={50} unit="cm" defaultValue={35} />
                <CustomSlider label="Proporción General" />
            </Box>

            <Box>
                <GroupTitle>Estructura Superior</GroupTitle>
                <ControlLabel>Tipo de Hombros</ControlLabel>
                <Grid container spacing={1.5} mb={3}>
                    {shoulderTypes.map(t => (
                        <Grid item xs={3} key={t.label}>
                            <OptionCard
                                label={t.label}
                                selected={selections['shoulder_type'] === t.label}
                                onClick={() => handleSelect('shoulder_type', t.label)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <CustomSlider label="Ancho de Hombros" />
                <CustomSlider label="Volumen Muscular" />
            </Box>

            <Box>
                <GroupTitle>Torso y Core</GroupTitle>
                <CustomSlider label="Ancho de Pecho" />
                <CustomSlider label="Profundidad de Pecho" />
                <CustomSlider label="Cintura" />
                <CustomSlider label="Caderas" />
            </Box>

            <Box>
                <GroupTitle>Extremidades Inferiores</GroupTitle>
                <CustomSlider label="Grosor del Muslo" />
                <CustomSlider label="Proporción General Piernas" />
            </Box>
        </Stack>
    );

    const renderFace = () => (
        <Stack spacing={4}>
            <Box>
                <GroupTitle>Anatomía Facial</GroupTitle>
                <ControlLabel>Estructura Ósea</ControlLabel>
                <Grid container spacing={1.5}>
                    {faceShapes.map(f => (
                        <Grid item xs={4} key={f.label}>
                            <OptionCard
                                label={f.label}
                                selected={selections['face_shape'] === f.label}
                                onClick={() => handleSelect('face_shape', f.label)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box>
                <GroupTitle>Detalle Ocular</GroupTitle>
                <ControlLabel>Iris Color</ControlLabel>
                <Grid container spacing={1} mb={3}>
                    {eyeColors.map(c => (
                        <Grid item xs={3} key={c.label}>
                            <OptionCard
                                label={c.label}
                                color={c.color}
                                selected={selections['eye_color'] === c.label}
                                onClick={() => handleSelect('eye_color', c.label)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <CustomSlider label="Forma de Ojos" />
                <CustomSlider label="Tamaño" />
            </Box>

            <Box>
                <GroupTitle>Arcada Superciliar</GroupTitle>
                <CustomSlider label="Forma de Cejas" />
                <CustomSlider label="Grosor" />
                <CustomSlider label="Altura" />
            </Box>

            <Box>
                <GroupTitle>Rasgos Centrales</GroupTitle>
                <ControlLabel>Tipo de Nariz</ControlLabel>
                <Grid container spacing={1.5} mb={3}>
                    {noseTypes.map(n => (
                        <Grid item xs={4} key={n.label}>
                            <OptionCard
                                label={n.label}
                                selected={selections['nose_type'] === n.label}
                                onClick={() => handleSelect('nose_type', n.label)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <CustomSlider label="Volumen de Labios" />
                <CustomSlider label="Forma de Labios" />
            </Box>
        </Stack>
    );

    const renderSkin = () => (
        <Stack spacing={5}>
            <Box>
                <GroupTitle>Melanina y Tono</GroupTitle>
                <Grid container spacing={1}>
                    {skinTones.map(s => (
                        <Grid item xs={3} key={s.label}>
                            <OptionCard
                                label={s.label}
                                color={s.color}
                                selected={selections['skin_tone'] === s.label}
                                onClick={() => handleSelect('skin_tone', s.label)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box>
                <GroupTitle>Cromatismo (Subtono)</GroupTitle>
                <Grid container spacing={1.5}>
                    {subtones.map(t => (
                        <Grid item xs={4} key={t.label}>
                            <OptionCard
                                label={t.label}
                                color={t.color}
                                selected={selections['skin_subtone'] === t.label}
                                onClick={() => handleSelect('skin_subtone', t.label)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box>
                <GroupTitle>Microtextura</GroupTitle>
                <CustomSlider label="Porosidad" />
                <CustomSlider label="Relieve Cutáneo" />
            </Box>
        </Stack>
    );

    const renderHair = () => (
        <Stack spacing={4}>
            <Box>
                <GroupTitle>Corte y Estilo</GroupTitle>
                <Grid container spacing={1.5}>
                    {hairStyles.map(h => (
                        <Grid item xs={4} key={h.label}>
                            <OptionCard
                                label={h.label}
                                selected={selections['hair_style'] === h.label}
                                onClick={() => handleSelect('hair_style', h.label)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box>
                <GroupTitle>Pigmentación Base</GroupTitle>
                <Grid container spacing={1}>
                    {hairColors.map(c => (
                        <Grid item xs={3} key={c.label}>
                            <OptionCard
                                label={c.label}
                                color={c.color}
                                selected={selections['hair_color'] === c.label}
                                onClick={() => handleSelect('hair_color', c.label)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box>
                <GroupTitle>Efectos y Mechas (Highlights)</GroupTitle>
                <ControlLabel>Color de Mechas</ControlLabel>
                <Grid container spacing={1} mb={3}>
                    {highlightColors.map(hc => (
                        <Grid item xs={3} key={hc.label}>
                            <OptionCard
                                label={hc.label}
                                color={hc.color}
                                selected={selections['hair_highlights'] === hc.label}
                                onClick={() => handleSelect('hair_highlights', hc.label)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <CustomSlider label="Intensidad de Reflejos" />
                <CustomSlider label="Distribución de Color" />
            </Box>

            <Box>
                <GroupTitle>Física Capilar</GroupTitle>
                <CustomSlider label="Largo" />
                <CustomSlider label="Volumen" />
                <ControlLabel>Textura Natural</ControlLabel>
                <Grid container spacing={1.5}>
                    {['Liso', 'Ondulado', 'Rizado', 'Kinky'].map(t => (
                        <Grid item xs={3} key={t}>
                            <OptionCard
                                label={t}
                                selected={selections['hair_texture'] === t}
                                onClick={() => handleSelect('hair_texture', t)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Stack>
    );

    return (
        <Fade in timeout={600}>
            <Box sx={{ height: '100%' }}>
                <SectionContainer>
                    {section === 'CUERPO' && renderBody()}
                    {section === 'ROSTRO' && renderFace()}
                    {section === 'PIEL' && renderSkin()}
                    {section === 'PELO' && renderHair()}
                </SectionContainer>
            </Box>
        </Fade>
    );
};

export default Categorias;
