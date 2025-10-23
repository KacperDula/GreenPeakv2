import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const PostSchema = z.object({
  title: z.string().min(2).max(120),
  author: z.string().min(1).max(60),
  date: z.string().datetime(),
  categories: z.array(z.string().max(24)).max(5).default([]),
  excerpt: z.string().max(220).optional(),
  content: z.string().min(20).max(20000),
  featured_image: z.string().optional(),
  published: z.boolean().default(false),
});

export const InquirySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(100),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  website: z.string().url().max(200).optional().or(z.literal('')),
  projectType: z.enum(['Website Design', 'SEO', 'Content/Blogging', 'Other']),
  budget: z.enum(['<€1k', '€1–3k', '€3–7k', '€7k+']),
  timeline: z.enum(['ASAP', '1–2 months', '3–6 months', 'Not sure']),
  message: z.string().min(20).max(2000),
  consent: z.literal(true),
});

export function validateSchema(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        res.status(400).json({ errors });
      } else {
        res.status(400).json({ error: 'Validation failed' });
      }
    }
  };
}
