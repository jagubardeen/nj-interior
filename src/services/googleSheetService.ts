// Service for submitting static site inquiry forms directly to Google Forms / Google Sheets

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  category: string;
  projectName?: string;
  location?: string;
  message: string;
  submittedAt: string;
}

const STORAGE_KEY = 'nj_interior_pudukkottai_leads';
const GOOGLE_FORM_ACTION_KEY = 'nj_interior_google_form_url';

// 1. FIXED: Changed /viewform?usp=header to /formResponse for POST requests
const DEFAULT_GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSevHsY_G9v1VGErJDMW_h3IBuvcFzq-G3hOp62EAhZBhvOT4A/formResponse';

export function getSavedGoogleFormUrl(): string {
  return localStorage.getItem(GOOGLE_FORM_ACTION_KEY) || '';
}

export function saveGoogleFormUrl(url: string): void {
  localStorage.setItem(GOOGLE_FORM_ACTION_KEY, url);
}

export function getStoredLeads(): LeadSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse leads from local storage', e);
    return [];
  }
}

export async function submitInquiryToGoogleSheet(leadData: Omit<LeadSubmission, 'id' | 'submittedAt'>): Promise<{ success: boolean; lead: LeadSubmission }> {
  const newLead: LeadSubmission = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  // 1. Save locally in localStorage for guaranteed lead recovery & CSV export
  const existingLeads = getStoredLeads();
  const updatedLeads = [newLead, ...existingLeads];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeads));

  // 2. Post to Google Form / Apps Script
  const customUrl = getSavedGoogleFormUrl();
  const targetUrl = customUrl || DEFAULT_GOOGLE_FORM_URL;

  try {
    // ⚠️ IMPORTANT: Replace the entry.XXXXXXX IDs below with the actual field IDs from your form!
    const formData = new URLSearchParams();
    formData.append('entry.1000001', newLead.name);        // REPLACE 1000001 WITH YOUR NAME FIELD ID
    formData.append('entry.1000002', newLead.phone);       // REPLACE 1000002 WITH YOUR PHONE FIELD ID
    formData.append('entry.1000003', newLead.email || ''); // REPLACE 1000003 WITH YOUR EMAIL FIELD ID
    formData.append('entry.1000004', newLead.category);    // REPLACE 1000004 WITH YOUR CATEGORY FIELD ID
    formData.append('entry.1000005', newLead.projectName || 'General Inquiry'); // REPLACE 1000005 WITH PROJECT FIELD ID
    formData.append('entry.1000006', newLead.message);     // REPLACE 1000006 WITH YOUR MESSAGE FIELD ID
    formData.append('entry.1000007', newLead.submittedAt); // REPLACE 1000007 WITH YOUR DATE FIELD ID

    // Send POST using no-cors mode to bypass CORS restrictions
    fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    }).catch(err => {
      console.log('Google Form submit network attempt sent (no-cors mode):', err);
    });
  } catch (err) {
    console.warn('Google Form submit error (lead saved locally):', err);
  }

  return { success: true, lead: newLead };
}

export function exportLeadsToCSV(): void {
  const leads = getStoredLeads();
  if (leads.length === 0) {
    alert('No inquiries saved yet.');
    return;
  }

  const headers = ['ID', 'Date & Time', 'Name', 'Phone', 'Email', 'Category', 'Project', 'Message'];
  const rows = leads.map(l => [
    l.id,
    `"${l.submittedAt}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.phone.replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${l.category.replace(/"/g, '""')}"`,
    `"${(l.projectName || 'General').replace(/"/g, '""')}"`,
    `"${l.message.replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `NJ_Interior_Pudukkottai_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}