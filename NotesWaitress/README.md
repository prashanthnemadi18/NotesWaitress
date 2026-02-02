# 📚 NotesWaitress - College Notes Platform

A modern, animated web application for organizing and accessing engineering college notes across all major branches and semesters.

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful gradient designs with smooth animations
- 🔐 **Authentication** - Secure login system with user profiles
- 📂 **Organized Structure** - Notes organized by Department → Semester → Subject
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 📱 **Responsive Design** - Works perfectly on all devices
- 🚀 **Fast Performance** - Built with React + Vite

## 🎓 Supported Engineering Branches

- **CSE** - Computer Science Engineering
- **ECE** - Electronics & Communication Engineering
- **Mechanical** - Mechanical Engineering
- **Civil** - Civil Engineering
- **EEE** - Electrical & Electronics Engineering
- **IT** - Information Technology
- **AI-ML** - Artificial Intelligence & Machine Learning
- **Chemical** - Chemical Engineering

Each branch includes all 8 semesters with relevant subjects (320+ subject folders).

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Adding Notes

1. **Navigate to the subject folder:**
   ```
   NotesWaitress/public/notes/[Department]/[Semester]/[Subject]/
   ```

2. **Add your PDF/document files** to the appropriate folder

3. **Update the structure file** (optional - for manual tracking):
   Edit `public/notes-structure.json` and add filenames:
   ```json
   {
     "CSE": {
       "1st-Semester": {
         "Programming in C": ["lecture1.pdf", "notes.pdf"]
       }
     }
   }
   ```

### Example: Adding CSE Notes

```bash
# Add notes to CSE 1st Semester Programming in C
# Place files in: NotesWaitress/public/notes/CSE/1st-Semester/Programming in C/
```

## 🛠️ Tech Stack

- **React** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📁 Project Structure

```
NotesWaitress/
├── public/
│   └── notes/              # All notes organized by branch/semester/subject
│       ├── CSE/
│       ├── ECE/
│       ├── Mechanical/
│       └── ...
├── src/
│   ├── components/         # React components
│   ├── context/           # Auth context
│   └── App.jsx            # Main app
└── package.json
```

## 🎨 UI Features

- Gradient color schemes for each folder
- Hover animations and transitions
- Glassmorphism effects
- Smooth page transitions
- Loading states with spinners
- Breadcrumb navigation

## 📝 License

MIT License - Feel free to use for your college!
