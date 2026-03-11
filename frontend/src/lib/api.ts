import axios from 'axios';
import { Project, AcademicPaper, BusinessTemplate, InquiryRequest, PaymentRequest, PaymentResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach HTTP Basic Auth credentials for Admin routes
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Only attach for admin endpoints to avoid Spring Security validating credentials on public routes
    if (config.url && config.url.includes('/admin')) {
      const credentials = localStorage.getItem('admin_token');
      if (credentials && config.headers) {
        config.headers.Authorization = `Basic ${credentials}`;
      }
    }
  }
  return config;
});

// --- Public Endpoints ---
export const fetchProjects = async (): Promise<Project[]> => (await apiClient.get('/projects')).data;
export const fetchAcademicPapers = async (): Promise<AcademicPaper[]> => (await apiClient.get('/academic')).data;
export const fetchTemplates = async (): Promise<BusinessTemplate[]> => (await apiClient.get('/templates')).data;
export const submitInquiry = async (inquiry: InquiryRequest): Promise<void> => apiClient.post('/inquiries', inquiry);

// --- Payment Endpoints ---
export const initializePayment = async (data: PaymentRequest): Promise<PaymentResponse> =>
  (await apiClient.post('/payments/initialize', data)).data;
export const verifyPayment = async (reference: string): Promise<PaymentResponse> =>
  (await apiClient.get(`/payments/verify/${reference}`)).data;

// --- Admin Endpoints ---

// Login via HTTP Basic Auth — backend uses Spring Security's httpBasic()
// We encode credentials as Base64, test against a protected endpoint, and store if valid.
export const adminLogin = async (credentials: { username: string; password: string }) => {
  const encoded = btoa(`${credentials.username}:${credentials.password}`);
  // Test credentials against a real protected endpoint
  await axios.get(`${API_BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Basic ${encoded}` },
  });
  // If the above didn't throw, credentials are valid — store them
  return encoded;
};

// Generic File Upload (Requires a corresponding backend endpoint that accepts MultipartFile and returns the URL)
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.post('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.url; // Assuming backend returns { "url": "https://s3.amazonaws.com/..." }
};

// Academic Admin
export const createPaper = async (paper: any) => (await apiClient.post('/academic', paper)).data;
export const updatePaper = async (id: number, paper: any) => (await apiClient.put(`/academic/${id}`, paper)).data;
export const deletePaper = async (id: number) => apiClient.delete(`/academic/${id}`);

// --- Projects Admin ---
export const createProject = async (project: any) => (await apiClient.post('/projects', project)).data;
export const updateProject = async (id: number, project: any) => (await apiClient.put(`/projects/${id}`, project)).data;
export const deleteProject = async (id: number) => apiClient.delete(`/projects/${id}`);

// --- Templates Admin ---
export const createTemplate = async (template: any) => (await apiClient.post('/templates', template)).data;
export const updateTemplate = async (id: number, template: any) => (await apiClient.put(`/templates/${id}`, template)).data;
export const deleteTemplate = async (id: number) => apiClient.delete(`/templates/${id}`);