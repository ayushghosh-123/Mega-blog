# 🚀 MegaBlog - Premium Blogging Platform

MegaBlog is a modern, high-performance blogging application built with **React**, **Redux Toolkit**, **Appwrite**, and **Tailwind CSS 4**. It features a stunning glassmorphic design system and a robust backend integration.

## ✨ Features

- **Auth System**: Secure login and signup using Appwrite Authentication.
- **Dynamic CMS**: Create, read, update, and delete posts with ease.
- **Rich Text Editor**: Integrated TinyMCE for a professional writing experience.
- **Image Management**: Seamless file uploads and previews using Appwrite Storage.
- **Premium UI**: Dark-themed, glassmorphic design system using Tailwind CSS 4.
- **Responsive**: Optimized for all devices from mobile to desktop.

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- Appwrite Cloud Account

### 2. Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
VITE_APPWRITE_URL = "https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID = "YOUR_PROJECT_ID"
VITE_APPWRITE_DATABASE_ID = "YOUR_DATABASE_ID"
VITE_APPWRITE_COLLECTION_ID = "YOUR_COLLECTION_ID"
VITE_APPWRITE_BUCKET_ID = "YOUR_BUCKET_ID"
```

### 3. Appwrite Schema Setup
Ensure your collection in Appwrite has the following attributes:
- `title` (String)
- `slug` (String) [Use as Document ID]
- `content` (String/Text)
- `featuredImage` (String)
- `status` (String/Enum: active, inactive)
- `userId` (String)

### 4. Installation
```bash
npm install
npm run dev
```

## 🎨 Design Philosophy
MegaBlog utilizes a **premium dark aesthetic** with:
- **Glassmorphism**: Backdrop blur effects and translucent borders.
- **Vibrant Gradients**: Indigo-to-Cyan accents for focus elements.
- **Modern Typography**: Clear hierarchy with Inter and Outfit typefaces.

---
Built with ❤️ by Antigravity
