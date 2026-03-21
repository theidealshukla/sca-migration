# 🚀 AI Agent Prompt: Build Phase 2 (Content Management System)

**To the AI Agent reading this:** 
Your task is to execute **Phase 2** of the SCA Tech Solar Admin website. You are to build a full Content Management System (CMS) extending the existing Supabase-backed Admin Panel. The client must be able to visually add, edit, and remove content without touching the codebase.

## 📌 Project Context & Exact Schema Mappings

I have thoroughly analyzed the exact React structure in `sections/ServicesOverview.jsx`, `sections/ProductsShowcase.jsx`, and `sections/ProjectsGallery.jsx`. **Your database tables MUST mirror these exact properties** to prevent breaking the frontend layout logic. 

**Critical Requirement for Images:** For both Products and Projects, the admin UI must allow the client to either (1) Upload an image file from their computer, or (2) Paste an external Image URL. The database column `img` should store the resulting URL.

---

## 🛠️ Step-by-Step Execution Plan

### 1. Database Creation (Supabase)
Create the following tables in Supabase. Apply RLS policies allowing public `SELECT` and admin `ALL`. Set up a public Storage Bucket named `cms-images`.

- **`services` table:**
  - `id` (uuid)
  - `display_order` (integer) -> Automatically sorted for frontend display '01', '02'
  - `title` (text)
  - `desc` (text) -> Full description body

- **`products` table:**
  - `id` (uuid)
  - `category` (text) -> Used strictly for the filter tabs (e.g. 'Solar Panels', 'Inverters')
  - `name` (text)
  - `desc` (text)
  - `img` (text) -> Storage URL or pasted URL

- **`projects` table:**
  - `id` (uuid)
  - `title` (text)
  - `location` (text)
  - `type` (text) -> E.g., 'Residential', 'Commercial', 'Industrial'
  - `capacity` (text) -> E.g., '5 kW', '2.5 MW'
  - `span` (text) -> Default to `col-span-1 row-span-1`, but allow admin to override for giant grid tiles (e.g., `col-span-2 row-span-2`)
  - `img` (text) -> Storage URL or pasted URL

### 2. Admin Dashboard Extension (UI)
- Add three new tabs to the Admin Sidebar: `Manage Services`, `Manage Products`, and `Manage Projects`.
- Build a Data Table for each tab fetching the respective table data.
- Create highly aesthetic "Add New" and "Edit" modals using Tailwind CSS.
- Ensure the image upload form allows both direct file upload to the Supabase bucket AND direct URL pasting.

### 3. Frontend Refactoring
- Navigate to `sections/ServicesOverview.jsx`, `sections/ProductsShowcase.jsx`, and `sections/ProjectsGallery.jsx`.
- Comment out the hardcoded `services`, `products`, and `projects` array variables.
- Write robust async data-fetching hooks (or `use` / Server Components if appropriate) to fetch the arrays dynamically from the Supabase database.
- Ensure loading states, fallbacks, and error handling are implemented gracefully.

---
*Admin Note:* Begin by validating that Phase 1 (Lead CRM) is functioning. Then read this prompt carefully and execute the 3 steps above sequentially to complete Phase 2.
