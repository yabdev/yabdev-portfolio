// Matches com.yabdev.project.dto.ProjectResponse
export interface Project {
  id: number;
  title: string;
  problemStatement: string;
  solution: string;
  impact: string;
  businessResults: string;
  imageUrl: string;
  projectUrl: string;
  createdAt: string;
}

// Matches com.yabdev.academic.dto.AcademicPaperResponse
export interface AcademicPaper {
  id: number;
  title: string;
  abstractText: string;
  pdfUrl: string;
  thumbnailUrl: string;
  tags: string[];
  createdAt: string;
}

// ... (keep existing Project and AcademicPaper interfaces)

// Matches com.yabdev.template.dto.BusinessTemplateResponse
export interface BusinessTemplate {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  category: string;
  features: string[];
  inquiryCount: number;
  createdAt: string;
}

// Matches com.yabdev.admin.dto.StudentInquiryRequest (or general inquiry)
export interface InquiryRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Payment types
export interface PaymentRequest {
  email: string;
  customerName: string;
  serviceName: string;
  amount: number; // in Naira
}

export interface PaymentResponse {
  id: number;
  reference: string;
  email: string;
  customerName: string;
  serviceName: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  authorizationUrl?: string;
  createdAt: string;
}