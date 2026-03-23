// api/incidencias.ts

import { Router } from 'express';
import { Turso } from 'turso-client'; // make sure to install this dependency

const router = Router();
const turso = new Turso('your-turso-database-url');

router.post('/incidencias', async (req, res) => {
    // Create a new incidencia
    const { title, description } = req.body;
    try {
        const newIncidencia = await turso.insert('incidencias', { title, description });
        res.status(201).json(newIncidencia);
    } catch (error) {
        res.status(500).json({ error: 'Error creating incidencia' });
    }
});

router.get('/incidencias', async (req, res) => {
    // Read all incidencias
    try {
        const incidencias = await turso.select('incidencias');
        res.status(200).json(incidencias);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching incidencias' });
    }
});

router.put('/incidencias/:id', async (req, res) => {
    // Update an existing incidencia
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedIncidencia = await turso.update('incidencias', id, { title, description });
        res.status(200).json(updatedIncidencia);
    } catch (error) {
        res.status(500).json({ error: 'Error updating incidencia' });
    }
});

export default router;
