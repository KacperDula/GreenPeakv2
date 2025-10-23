import { Router } from 'express';
import multer from 'multer';
import { sendEmail, formatInquiryEmail, isEmailConfigured } from '../utils/mailer.js';
import { InquirySchema, validateSchema } from '../middleware/validate.js';
import { formRateLimit } from '../middleware/rateLimit.js';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/temp/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
    }
  },
});

// POST /api/inquiry - Submit inquiry form
router.post(
  '/',
  formRateLimit,
  upload.single('file'),
  validateSchema(InquirySchema),
  async (req, res) => {
    try {
      const formData = req.body;
      const file = req.file;

      const { text, html } = formatInquiryEmail(formData);

      const emailOptions: any = {
        to: process.env.ADMIN_EMAIL || 'info@greenpeak.example',
        subject: `[Website Inquiry] ${formData.projectType} — ${formData.name}`,
        text,
        html,
      };

      // Add attachment if file was uploaded
      if (file) {
        emailOptions.attachments = [
          {
            filename: file.originalname,
            path: file.path,
          },
        ];
      }

      const emailConfigured = isEmailConfigured();
      let emailResult = { success: false, error: 'SMTP not configured' };

      if (emailConfigured) {
        emailResult = await sendEmail(emailOptions);
      }

      // Always return success to the client (UX decision)
      // but include email delivery status
      res.json({
        success: true,
        message: 'Thank you for your inquiry! We will be in touch within one business day.',
        emailInfo: {
          delivered: emailResult.success,
          reason: emailResult.error || null,
        },
      });

      // Log inquiry for debugging
      console.log('📧 Inquiry received:', {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        emailDelivered: emailResult.success,
      });
    } catch (error) {
      console.error('Error processing inquiry:', error);
      res.status(500).json({
        error: 'Failed to process inquiry',
        message: 'Please try again or contact us directly at info@greenpeak.example',
      });
    }
  }
);

export default router;
