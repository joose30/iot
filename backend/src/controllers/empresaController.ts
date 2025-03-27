import { Request, Response } from 'express';
import { Empresa, Pregunta, Mision, Vision, Valor, Politica } from '../models/empresaModel';

// Actualizar datos de la empresa
export const updateEmpresaData = async (req: Request, res: Response) => {
    try {
        const { ubicacion, telefono } = req.body;
        const empresa = await Empresa.findOneAndUpdate(
            {},
            { ubicacion, telefono },
            { new: true, upsert: true }
        );
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar los datos de la empresa' });
    }
};

// Agregar una nueva pregunta
export const addPregunta = async (req: Request, res: Response) => {
    try {
        const { pregunta, respuesta } = req.body;
        const nuevaPregunta = new Pregunta({ pregunta, respuesta });
        await nuevaPregunta.save();
        res.status(201).json(nuevaPregunta);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la pregunta' });
    }
};

// Obtener datos de la empresa
export const getEmpresa = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.findOne({});
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de la empresa' });
    }
};

// Obtener preguntas frecuentes
export const getPreguntas = async (req: Request, res: Response) => {
    try {
        const preguntas = await Pregunta.find({});
        res.status(200).json(preguntas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las preguntas' });
    }
};

// Agregar misión
export const addMision = async (req: Request, res: Response) => {
    try {
        const { contenido } = req.body;
        const nuevaMision = new Mision({ contenido });
        await nuevaMision.save();
        res.status(201).json(nuevaMision);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la misión' });
    }
};

// Obtener misiones
export const getMisions = async (req: Request, res: Response) => {
    try {
        const misiones = await Mision.find({});
        res.status(200).json(misiones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las misiones' });
    }
};

// Agregar visión
export const addVision = async (req: Request, res: Response) => {
    try {
        const { contenido } = req.body;
        const nuevaVision = new Vision({ contenido });
        await nuevaVision.save();
        res.status(201).json(nuevaVision);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la visión' });
    }
};

// Obtener visiones
export const getVisions = async (req: Request, res: Response) => {
    try {
        const visiones = await Vision.find({});
        res.status(200).json(visiones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las visiones' });
    }
};

// Agregar valor
export const addValor = async (req: Request, res: Response) => {
    try {
        const { contenido } = req.body;
        const nuevoValor = new Valor({ contenido });
        await nuevoValor.save();
        res.status(201).json(nuevoValor);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el valor' });
    }
};

// Obtener valores
export const getValors = async (req: Request, res: Response) => {
    try {
        const valores = await Valor.find({});
        res.status(200).json(valores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los valores' });
    }
};

// Agregar política
export const addPolitica = async (req: Request, res: Response) => {
    try {
        const { descripcion } = req.body;
        const nuevaPolitica = new Politica({ descripcion });
        await nuevaPolitica.save();
        res.status(201).json(nuevaPolitica);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la política' });
    }
};

// Obtener políticas
export const getPoliticas = async (req: Request, res: Response) => {
    try {
        const politicas = await Politica.find({});
        res.status(200).json(politicas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las políticas' });
    }
};